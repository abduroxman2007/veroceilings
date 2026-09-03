-- ============================================================
-- Vero Ceilings — Migration 006
-- Lightweight first-party page-view tracking for the admin dashboard.
--
-- Deliberately privacy-minimal: no IP address, no user agent, no cookie, no
-- device fingerprint, no per-visitor id. That means no consent banner is
-- required, and it also means this cannot answer "unique visitors" — only
-- pageview volume, which is what the dashboard actually plots.
--
-- Referrer is stored as a HOST only (e.g. "google.com"), never the full URL,
-- so we can attribute traffic sources without capturing the query someone
-- typed on another site.
-- ============================================================

CREATE TABLE IF NOT EXISTS page_views (
  id             BIGSERIAL PRIMARY KEY,
  path           TEXT NOT NULL,
  locale         VARCHAR(5),
  referrer_host  TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS page_views_path_idx ON page_views (path);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- No public policy on purpose. Inserts go through the service-role client in
-- app/api/track/route.ts, mirroring how every other write in this app works —
-- see migration 005 for why an open public INSERT policy is a liability.
DO $$ BEGIN
  CREATE POLICY "service_all_page_views" ON page_views FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
