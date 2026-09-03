import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export interface SiteSettings {
  phone_primary: string;
  phone_secondary: string;
  email: string;
  address_uz: string;
  address_ru: string;
  address_en: string;
  telegram_username: string;
  instagram_url: string;
  youtube_url: string;
  google_maps_url: string;
  yandex_maps_url: string;
}

export const SETTINGS_KEYS = [
  "phone_primary",
  "phone_secondary",
  "email",
  "address_uz",
  "address_ru",
  "address_en",
  "telegram_username",
  "instagram_url",
  "youtube_url",
  "google_maps_url",
  "yandex_maps_url",
] as const satisfies readonly (keyof SiteSettings)[];

// Mirrors the values previously hardcoded across Navbar/Footer/ContactSection/etc.
// so a DB outage never changes what visitors see.
const DEFAULTS: SiteSettings = {
  phone_primary: "+998 78 333 73 77",
  phone_secondary: "+998 90 049 11 10",
  email: "veroceiling@gmail.com",
  address_uz: "Toshkent sh., Chilonzor tumani, Chorbog' ko'chasi, 27",
  address_ru: "г. Ташкент, Чиланзар, ул. Чорбог, 27",
  address_en: "Tashkent, Chilonzor district, Chorbog street, 27",
  telegram_username: "VeroCeilings",
  instagram_url: "https://instagram.com/veroceilings",
  youtube_url: "https://youtube.com/@veroceilings",
  google_maps_url: "https://maps.google.com/?q=Vero+Ceilings+Tashkent",
  yandex_maps_url: "https://yandex.com/maps/?text=Vero+Ceilings+Tashkent",
};

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Cached per-request so every component that needs a phone number/address doesn't re-query. */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!isSupabaseConfigured) return DEFAULTS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("site_settings").select("key, value");
    if (error || !data || data.length === 0) return DEFAULTS;

    const map = Object.fromEntries(data.map((row) => [row.key, row.value]));
    return { ...DEFAULTS, ...map };
  } catch {
    return DEFAULTS;
  }
});

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
