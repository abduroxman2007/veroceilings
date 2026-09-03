import { createClient } from "@/lib/supabase/server";

export interface SiteVideo {
  id: string;
  youtube_id: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  section: string;
  product_slug: string | null;
  sort_order: number;
  is_active: boolean;
}

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getVideosBySection(section: string): Promise<SiteVideo[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_videos")
      .select("*")
      .eq("section", section)
      .eq("is_active", true)
      .order("sort_order");

    if (error || !data) return [];
    return data as SiteVideo[];
  } catch {
    return [];
  }
}

export async function getVideoForProduct(productSlug: string): Promise<SiteVideo | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_videos")
      .select("*")
      .eq("product_slug", productSlug)
      .eq("is_active", true)
      .order("sort_order")
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return data as SiteVideo;
  } catch {
    return null;
  }
}

export async function getVideoById(id: string): Promise<SiteVideo | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("site_videos").select("*").eq("id", id).single();
    if (error || !data) return null;
    return data as SiteVideo;
  } catch {
    return null;
  }
}

export async function getAllVideos(): Promise<SiteVideo[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("site_videos").select("*").order("sort_order");
    if (error || !data) return [];
    return data as SiteVideo[];
  } catch {
    return [];
  }
}
