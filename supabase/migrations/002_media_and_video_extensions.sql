-- ============================================================
-- Vero Ceilings — Migration 002
-- Multi-media project galleries, per-product videos, media Storage bucket
-- ============================================================

-- Projects previously supported exactly one photo (media_url). Real completed
-- projects have many photos (and sometimes a walkthrough video); model that as
-- an ordered array instead of a schema migration per media item.
ALTER TABLE projects ADD COLUMN IF NOT EXISTS media JSONB DEFAULT '[]';
COMMENT ON COLUMN projects.media IS
  'Ordered gallery media for this project: [{url, type: "image"|"video", alt, sort_order}]';

-- Let a site_video be scoped to a single product, so product pages can embed
-- the right video instead of only linking out to YouTube.
ALTER TABLE site_videos ADD COLUMN IF NOT EXISTS product_slug VARCHAR(120);

-- Storage bucket the admin upload pipeline writes into (project photos, product
-- images, application-case photos). Public so next/image + <img> can read
-- objects directly via the public URL; all writes go through the service-role
-- client in Server Actions, which bypasses RLS entirely, so no storage.objects
-- policy is required for the admin write path.
INSERT INTO storage.buckets (id, name, public)
VALUES ('vero-media', 'vero-media', true)
ON CONFLICT (id) DO NOTHING;
