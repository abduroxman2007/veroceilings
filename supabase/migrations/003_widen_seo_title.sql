-- ============================================================
-- Vero Ceilings — Migration 003
-- seo_title_* was VARCHAR(80); real titles ("Buy X — Direct Manufacturer &
-- Exporter | Vero Ceilings") already run up to ~91 chars. Widen with headroom.
-- ============================================================
ALTER TABLE products ALTER COLUMN seo_title_uz TYPE VARCHAR(160);
ALTER TABLE products ALTER COLUMN seo_title_ru TYPE VARCHAR(160);
ALTER TABLE products ALTER COLUMN seo_title_en TYPE VARCHAR(160);
