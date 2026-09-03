import { createClient } from "@/lib/supabase/server";
import { STATIC_PRODUCTS, getStaticProductBySlug, getStaticProductsByCategory } from "@/lib/data/static-products";
import type { StaticProduct, ProductCategory } from "@/lib/data/static-products";

export type { StaticProduct, ProductCategory };

// Database row type (matches Supabase schema)
export interface DBProduct {
  id: string;
  slug: string;
  category: string;
  template_type: string;
  hero_image_url: string;
  images: Array<{ src: string; alt_uz: string; alt_ru: string; alt_en: string }>;
  application_cases: Array<{ src: string; alt_uz: string; alt_ru: string; alt_en: string }>;
  video_id: string;
  related_products: string[];
  sort_order: number;
  title_uz: string;
  title_ru: string;
  title_en: string;
  seo_title_uz: string;
  seo_title_ru: string;
  seo_title_en: string;
  seo_description_uz: string;
  seo_description_ru: string;
  seo_description_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  specifications: Record<string, string | string[]>;
  is_active: boolean;
}

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getAllProducts(): Promise<StaticProduct[]> {
  if (!isSupabaseConfigured) return STATIC_PRODUCTS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");

    if (error || !data || data.length === 0) return STATIC_PRODUCTS;
    return data as unknown as StaticProduct[];
  } catch {
    return STATIC_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<StaticProduct | null> {
  if (!isSupabaseConfigured) return getStaticProductBySlug(slug) ?? null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !data) return getStaticProductBySlug(slug) ?? null;
    return data as unknown as StaticProduct;
  } catch {
    return getStaticProductBySlug(slug) ?? null;
  }
}

export async function getProductsByCategory(
  category: ProductCategory
): Promise<StaticProduct[]> {
  if (!isSupabaseConfigured) return getStaticProductsByCategory(category);

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("sort_order");

    if (error || !data || data.length === 0) return getStaticProductsByCategory(category);
    return data as unknown as StaticProduct[];
  } catch {
    return getStaticProductsByCategory(category);
  }
}

export async function getRelatedProducts(slugs: string[]): Promise<StaticProduct[]> {
  if (!slugs.length) return [];
  if (!isSupabaseConfigured) {
    return STATIC_PRODUCTS.filter((p) => slugs.includes(p.slug));
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .in("slug", slugs)
      .eq("is_active", true);

    if (!data || data.length === 0) {
      return STATIC_PRODUCTS.filter((p) => slugs.includes(p.slug));
    }
    return data as unknown as StaticProduct[];
  } catch {
    return STATIC_PRODUCTS.filter((p) => slugs.includes(p.slug));
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured) return STATIC_PRODUCTS.map((p) => p.slug);

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("slug")
      .eq("is_active", true);

    if (error || !data || data.length === 0) return STATIC_PRODUCTS.map((p) => p.slug);
    return data.map((row) => row.slug as string);
  } catch {
    return STATIC_PRODUCTS.map((p) => p.slug);
  }
}

/** Sitemap needs a real per-product lastmod, not a fabricated one — includes updated_at. */
export async function getAllProductSlugsWithDates(): Promise<{ slug: string; updatedAt: string | null }[]> {
  if (!isSupabaseConfigured) {
    return STATIC_PRODUCTS.map((p) => ({ slug: p.slug, updatedAt: null }));
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("slug, updated_at")
      .eq("is_active", true);

    if (error || !data || data.length === 0) {
      return STATIC_PRODUCTS.map((p) => ({ slug: p.slug, updatedAt: null }));
    }
    return data.map((row) => ({ slug: row.slug as string, updatedAt: (row.updated_at as string | null) ?? null }));
  } catch {
    return STATIC_PRODUCTS.map((p) => ({ slug: p.slug, updatedAt: null }));
  }
}

/** Admin-only: fetch the full DB row (incl. title/seo/description columns) by its UUID. */
export async function getProductById(id: string): Promise<DBProduct | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error || !data) return null;
    return data as DBProduct;
  } catch {
    return null;
  }
}
