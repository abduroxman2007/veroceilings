-- ============================================================
-- Vero Ceilings — Migration 005
-- Close unauthenticated public write access to the lead tables.
--
-- 001_initial_schema.sql granted `FOR INSERT WITH CHECK (true)` on inquiries
-- and newsletter_subscribers so browser-side code could submit forms directly.
-- That is not how the app works: every write to these two tables goes through
-- a Server Action using the service-role client (createAdminClient in
-- lib/actions/index.ts — submitContactAction, submitCalculatorLeadAction,
-- subscribeNewsletterAction, updateInquiryStatusAction), which bypasses RLS
-- entirely. The policies were therefore doing nothing for the app while
-- leaving an open door: NEXT_PUBLIC_SUPABASE_ANON_KEY is necessarily public,
-- so anyone could POST straight to /rest/v1/inquiries or
-- /rest/v1/newsletter_subscribers and skip the Zod validation, the honeypot,
-- and the Telegram alert — at unlimited volume, with arbitrary column values.
-- ============================================================

DROP POLICY IF EXISTS "public_insert_inquiries" ON inquiries;
DROP POLICY IF EXISTS "public_insert_newsletter" ON newsletter_subscribers;
