// One-time seed: pushes the current static content (lib/data/static-products.ts,
// lib/db/projects.ts's STATIC_PROJECTS, and the hardcoded architect videos) into
// Supabase so the live database starts populated instead of empty. Safe to
// re-run: products upsert on slug; projects/site_videos skip if already seeded.
import { createClient } from "@supabase/supabase-js";
import { STATIC_PRODUCTS } from "../lib/data/static-products";
import { STATIC_PROJECTS } from "../lib/db/projects";
import { STATIC_HERO_SLIDES } from "../lib/db/hero-slides";
import { STATIC_FAQS } from "../lib/db/faqs";
import enMessages from "../messages/en.json";
import ruMessages from "../messages/ru.json";
import uzMessages from "../messages/uz.json";

try {
  process.loadEnvFile(".env.local");
} catch {
  // already provided by the environment
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

interface ProductCopy {
  title?: string;
  seo_title?: string;
  seo_description?: string;
  description?: string;
  specs?: Record<string, string>;
}

function copyFor(messages: typeof enMessages, slug: string): ProductCopy {
  return (messages.products as Record<string, ProductCopy>)[slug] ?? {};
}

async function seedProducts() {
  for (const p of STATIC_PRODUCTS) {
    const uz = copyFor(uzMessages, p.id);
    const ru = copyFor(ruMessages, p.id);
    const en = copyFor(enMessages, p.id);

    const row = {
      slug: p.slug,
      category: p.category,
      template_type: p.template_type,
      sort_order: p.sort_order,
      is_active: true,
      title_uz: uz.title ?? p.id,
      title_ru: ru.title ?? p.id,
      title_en: en.title ?? p.id,
      seo_title_uz: uz.seo_title ?? uz.title ?? "",
      seo_title_ru: ru.seo_title ?? ru.title ?? "",
      seo_title_en: en.seo_title ?? en.title ?? "",
      seo_description_uz: uz.seo_description ?? "",
      seo_description_ru: ru.seo_description ?? "",
      seo_description_en: en.seo_description ?? "",
      description_uz: uz.description ?? "",
      description_ru: ru.description ?? "",
      description_en: en.description ?? "",
      hero_image_url: p.hero_image_url,
      images: p.images,
      application_cases: p.application_cases,
      video_id: p.video_id ?? "",
      specifications: en.specs ?? {},
      related_products: p.related_products,
    };

    const { error } = await supabase.from("products").upsert(row, { onConflict: "slug" });
    if (error) console.error(`  products.${p.slug} FAILED: ${error.message}`);
    else console.log(`  products.${p.slug} OK`);
  }
}

async function seedProjects() {
  const { count } = await supabase.from("projects").select("id", { count: "exact", head: true });
  if (count && count > 0) {
    console.log(`  skipped — projects already has ${count} row(s)`);
    return;
  }

  const rows = STATIC_PROJECTS.map((proj) => ({
    title_uz: proj.title_uz,
    title_ru: proj.title_ru,
    title_en: proj.title_en,
    ceiling_type_used: proj.ceiling_type_used,
    location_uz: proj.location_uz,
    location_ru: proj.location_ru,
    location_en: proj.location_en,
    media_url: proj.media_url,
    media: [{ url: proj.media_url, type: proj.is_video ? "video" : "image", sort_order: 0 }],
    is_video: proj.is_video,
    year: proj.year,
    area_sqm: proj.area_sqm,
    sort_order: proj.sort_order,
    is_active: true,
  }));

  const { error } = await supabase.from("projects").insert(rows);
  if (error) console.error(`  projects FAILED: ${error.message}`);
  else console.log(`  projects: inserted ${rows.length} row(s)`);
}

async function seedVideos() {
  const { count } = await supabase.from("site_videos").select("id", { count: "exact", head: true });
  if (count && count > 0) {
    console.log(`  skipped — site_videos already has ${count} row(s)`);
    return;
  }

  const videos = [
    { youtube_id: "k6Kujh_hHwI", product_slug: "grilyato", sortOrder: 1, key: "video1" as const },
    { youtube_id: "E_M4s_R_3_E", product_slug: "metalarmstrong", sortOrder: 2, key: "video2" as const },
    { youtube_id: "zK4iA4O70P4", product_slug: "slatceiling", sortOrder: 3, key: "video3" as const },
  ];

  const rows = videos.map((v) => ({
    youtube_id: v.youtube_id,
    section: "architects",
    product_slug: v.product_slug,
    sort_order: v.sortOrder,
    is_active: true,
    title_uz: uzMessages.architects[v.key].title,
    title_ru: ruMessages.architects[v.key].title,
    title_en: enMessages.architects[v.key].title,
    description_uz: uzMessages.architects[v.key].description,
    description_ru: ruMessages.architects[v.key].description,
    description_en: enMessages.architects[v.key].description,
  }));

  const { error } = await supabase.from("site_videos").insert(rows);
  if (error) console.error(`  site_videos FAILED: ${error.message}`);
  else console.log(`  site_videos: inserted ${rows.length} row(s)`);
}

async function seedHeroSlides() {
  const { count } = await supabase.from("hero_slides").select("id", { count: "exact", head: true });
  if (count && count > 0) {
    console.log(`  skipped — hero_slides already has ${count} row(s)`);
    return;
  }

  const rows = STATIC_HERO_SLIDES.map(({ id: _id, ...rest }) => rest);
  const { error } = await supabase.from("hero_slides").insert(rows);
  if (error) console.error(`  hero_slides FAILED: ${error.message}`);
  else console.log(`  hero_slides: inserted ${rows.length} row(s)`);
}

async function seedFaqs() {
  const { count } = await supabase.from("faqs").select("id", { count: "exact", head: true });
  if (count && count > 0) {
    console.log(`  skipped — faqs already has ${count} row(s)`);
    return;
  }

  const rows = STATIC_FAQS.map(({ id: _id, ...rest }) => rest);
  const { error } = await supabase.from("faqs").insert(rows);
  if (error) console.error(`  faqs FAILED: ${error.message}`);
  else console.log(`  faqs: inserted ${rows.length} row(s)`);
}

async function main() {
  console.log("Seeding products...");
  await seedProducts();
  console.log("Seeding projects...");
  await seedProjects();
  console.log("Seeding site videos...");
  await seedVideos();
  console.log("Seeding hero slides...");
  await seedHeroSlides();
  console.log("Seeding FAQs...");
  await seedFaqs();
  console.log("Done.");
}

main();
