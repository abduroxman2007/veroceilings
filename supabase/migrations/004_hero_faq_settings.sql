-- ============================================================
-- Vero Ceilings — Migration 004
-- Admin-editable homepage hero slides, FAQ entries, and the missing
-- site_settings keys (address_en, yandex_maps_url) needed to fully retire
-- the hardcoded contact info scattered across the frontend.
-- ============================================================

CREATE TABLE IF NOT EXISTS hero_slides (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url    TEXT NOT NULL,
  title_uz     VARCHAR(255),
  title_ru     VARCHAR(255),
  title_en     VARCHAR(255),
  text_uz      TEXT,
  text_ru      TEXT,
  text_en      TEXT,
  button_uz    VARCHAR(120),
  button_ru    VARCHAR(120),
  button_en    VARCHAR(120),
  link_href    VARCHAR(255) DEFAULT '/products',
  sort_order   INTEGER DEFAULT 0,
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faqs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_uz   TEXT,
  question_ru   TEXT,
  question_en   TEXT,
  answer_uz     TEXT,
  answer_ru     TEXT,
  answer_en     TEXT,
  sort_order    INTEGER DEFAULT 0,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_hero_slides" ON hero_slides FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_faqs"        ON faqs        FOR SELECT USING (is_active = true);
CREATE POLICY "service_all_hero_slides" ON hero_slides FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_all_faqs"        ON faqs        FOR ALL USING (auth.role() = 'service_role');

DO $$ BEGIN
  CREATE TRIGGER hero_slides_updated_at BEFORE UPDATE ON hero_slides
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER faqs_updated_at BEFORE UPDATE ON faqs
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- New site_settings keys the frontend needs to fully stop hardcoding contact info
INSERT INTO site_settings (key, value) VALUES
  ('address_en', 'Tashkent, Chilonzor district, Chorbog street, 27'),
  ('yandex_maps_url', 'https://yandex.com/maps/?text=Vero+Ceilings+Tashkent')
ON CONFLICT (key) DO NOTHING;
