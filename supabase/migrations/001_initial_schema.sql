-- ============================================================
-- Vero Ceilings — Supabase Database Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ─── Extensions ──────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── ENUM types ──────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE product_category AS ENUM ('product', 'accessory');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE inquiry_status AS ENUM ('NEW', 'CONTACTED', 'QUOTED', 'CLOSED', 'SPAM');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE inquiry_source AS ENUM ('contact_form', 'calculator', 'newsletter', 'whatsapp', 'direct');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── products ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                 VARCHAR(120) UNIQUE NOT NULL,
  category             product_category NOT NULL,
  template_type        VARCHAR(60)  NOT NULL,
  sort_order           INTEGER      DEFAULT 0,
  is_active            BOOLEAN      DEFAULT TRUE,

  -- Titles (localized)
  title_uz             VARCHAR(255),
  title_ru             VARCHAR(255),
  title_en             VARCHAR(255),

  -- SEO (localized)
  seo_title_uz         VARCHAR(80),
  seo_title_ru         VARCHAR(80),
  seo_title_en         VARCHAR(80),
  seo_description_uz   VARCHAR(200),
  seo_description_ru   VARCHAR(200),
  seo_description_en   VARCHAR(200),

  -- Content (localized)
  description_uz       TEXT,
  description_ru       TEXT,
  description_en       TEXT,

  -- Media
  hero_image_url       TEXT,
  images               JSONB DEFAULT '[]',   -- [{src, alt_uz, alt_ru, alt_en}]
  application_cases    JSONB DEFAULT '[]',   -- [{src, alt_uz, alt_ru, alt_en}]
  video_id             VARCHAR(30) DEFAULT '',

  -- Specs & relations
  specifications       JSONB DEFAULT '{}',   -- flexible per product type
  related_products     TEXT[]  DEFAULT '{}',

  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ─── projects (gallery) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_uz             VARCHAR(255),
  title_ru             VARCHAR(255),
  title_en             VARCHAR(255),
  ceiling_type_used    VARCHAR(80),
  location_uz          VARCHAR(120) DEFAULT 'Toshkent',
  location_ru          VARCHAR(120) DEFAULT 'Ташкент',
  location_en          VARCHAR(120) DEFAULT 'Tashkent',
  media_url            TEXT NOT NULL,
  is_video             BOOLEAN DEFAULT FALSE,
  year                 SMALLINT,
  area_sqm             INTEGER,
  sort_order           INTEGER DEFAULT 0,
  is_active            BOOLEAN DEFAULT TRUE,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ─── site_videos (homepage video section) ─────────────────────
CREATE TABLE IF NOT EXISTS site_videos (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  youtube_id           VARCHAR(30) NOT NULL,
  title_uz             VARCHAR(255),
  title_ru             VARCHAR(255),
  title_en             VARCHAR(255),
  description_uz       TEXT,
  description_ru       TEXT,
  description_en       TEXT,
  section              VARCHAR(60) DEFAULT 'homepage',  -- 'homepage' | 'architects' | 'product'
  sort_order           INTEGER DEFAULT 0,
  is_active            BOOLEAN DEFAULT TRUE,
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ─── inquiries (leads/CRM) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name        VARCHAR(255),
  phone                VARCHAR(30),
  email                VARCHAR(255),
  message              TEXT,
  company              VARCHAR(255),
  calculation_data     JSONB,           -- from calculator
  source               inquiry_source  DEFAULT 'contact_form',
  status               inquiry_status  DEFAULT 'NEW',
  locale               VARCHAR(5)      DEFAULT 'uz',
  notes                TEXT,           -- admin internal notes
  created_at           TIMESTAMPTZ     DEFAULT NOW(),
  updated_at           TIMESTAMPTZ     DEFAULT NOW()
);

-- ─── newsletter_subscribers ───────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email                VARCHAR(255) UNIQUE NOT NULL,
  locale               VARCHAR(5) DEFAULT 'uz',
  is_active            BOOLEAN DEFAULT TRUE,
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ─── site_settings (admin-controlled key-value store) ─────────
CREATE TABLE IF NOT EXISTS site_settings (
  key                  VARCHAR(120) PRIMARY KEY,
  value                TEXT,
  value_json           JSONB,
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default site settings
INSERT INTO site_settings (key, value) VALUES
  ('phone_primary', '+998 78 333 73 77'),
  ('phone_secondary', '+998 90 049 11 10'),
  ('email', 'veroceiling@gmail.com'),
  ('address_uz', 'Toshkent sh., Chilonzor tumani, Chorbog'' ko''chasi, 27'),
  ('address_ru', 'г. Ташкент, Чиланзар, ул. Чорбог, 27'),
  ('telegram_username', 'VeroCeilings'),
  ('instagram_url', 'https://instagram.com/veroceilings'),
  ('youtube_url', 'https://youtube.com/@veroceilings'),
  ('google_maps_url', 'https://maps.google.com/?q=Vero+Ceilings+Tashkent')
ON CONFLICT (key) DO NOTHING;

-- ─── Updated_at triggers ──────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER inquiries_updated_at BEFORE UPDATE ON inquiries
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── Row Level Security ───────────────────────────────────────
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read for products, projects, site_videos, site_settings
CREATE POLICY "public_read_products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_projects" ON projects FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_videos"   ON site_videos FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_settings" ON site_settings FOR SELECT USING (true);

-- Public INSERT for inquiries and newsletter (from forms)
CREATE POLICY "public_insert_inquiries"    ON inquiries    FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_newsletter"   ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Service role has full access (used by admin panel via SUPABASE_SERVICE_ROLE_KEY)
CREATE POLICY "service_all_products"  ON products  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_all_projects"  ON projects  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_all_videos"    ON site_videos FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_all_inquiries" ON inquiries FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_all_newsletter" ON newsletter_subscribers FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_all_settings"  ON site_settings FOR ALL USING (auth.role() = 'service_role');

-- ─── Supabase Storage bucket ──────────────────────────────────
-- Run separately in Supabase dashboard Storage section:
-- Create bucket "vero-media" (public: true)
-- Or use the API:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('vero-media', 'vero-media', true);
