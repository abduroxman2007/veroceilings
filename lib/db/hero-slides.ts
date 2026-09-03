import { createClient } from "@/lib/supabase/server";

export interface HeroSlide {
  id: string;
  image_url: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  text_uz: string;
  text_ru: string;
  text_en: string;
  button_uz: string;
  button_ru: string;
  button_en: string;
  link_href: string;
  sort_order: number;
  is_active: boolean;
}

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// The 3 hero slides as originally hardcoded in HeroSlider.tsx / messages/*.json's "hero" namespace.
export const STATIC_HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide1",
    image_url: "/images/slider/slid1.jpg",
    title_uz: "Toshkentda osma shiftlar sotib olish — ishlab chiqaruvchi Vero Ceilings dan",
    title_ru: "Купить подвесные потолки в Ташкенте — от производителя Vero Ceilings",
    title_en: "Suspended Ceiling Manufacturer in Central Asia — Vero Ceilings",
    text_uz: "Grilyato, Armstrong, reykali va kubsimon osma shiftlar to'g'ridan-to'g'ri zavoddan. Arzon narxlar, bepul hisob-kitob, professional montaj va butun O'zbekiston bo'ylab yetkazib berish.",
    text_ru: "Потолки Грильято, Армстронг, реечные и кубообразные системы напрямую с завода. Цены от производителя, бесплатный расчет сметы, профессиональный монтаж и доставка по всему Узбекистану.",
    text_en: "Open-cell Grilyato, Armstrong cassette tiles, and architectural linear slat ceiling systems. Industrial-scale manufacturing, custom dimensions, and worldwide export supply.",
    button_uz: "KATALOGNI KO'RISH",
    button_ru: "СМОТРЕТЬ КАТАЛОГ",
    button_en: "EXPLORE CATALOGUE",
    link_href: "/products",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "slide2",
    image_url: "/images/slider/slid2.jpg",
    title_uz: "Toshkentda grilyato shift sotib olish — 50x50, 75x75, 100x100, 150x150, 200x200 mm",
    title_ru: "Купить потолок Грильято в Ташкенте — ячейки 50х50, 75х75, 100х100, 150х150, 200х200 мм",
    title_en: "Grilyato Open-Cell Ceilings — 50x50, 75x75, 100x100, 150x150, 200x200 mm",
    text_uz: "Ofislar, savdo markazlari, aeroportlar va jamoat binolari uchun alyuminiy uyali grilyato shiftlar. Klassik, piramidal va jalyuzi turlari. Barcha RAL ranglari mavjud.",
    text_ru: "Алюминиевые ячеистые потолки Грильято для офисов, ТРЦ, аэропортов и государственных учреждений. Классический, пирамидальный и жалюзи. Все цвета по шкале RAL. В наличии и под заказ.",
    text_en: "Engineered aluminium cell ceilings for international airports, commercial mega-malls, corporate headquarters, and transit hubs. All RAL colours available.",
    button_uz: "GRILYATONI TANLASH",
    button_ru: "ВЫБРАТЬ ГРИЛЬЯТО",
    button_en: "SPECIFY GRILYATO",
    link_href: "/products/grilyato",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "slide3",
    image_url: "/images/slider/slid3.jpg",
    title_uz: "Amalga oshirilgan yirik loyihalar — aeroportlar, savdo markazlari, mehmonxonalar",
    title_ru: "Реализованные масштабные проекты — аэропорты, ТРЦ, отели и бизнес-центры",
    title_en: "Major Landmark Projects Across Central Asia and the CIS",
    text_uz: "10 yildan ortiq tajriba. Vero Ceilings mahsulotlari O'zbekistonning eng yirik obyektlari va davlat binolarida muvaffaqiyatli o'rnatilgan.",
    text_ru: "Более 10 лет безупречной репутации. Vero Ceilings доверили оснащение потолками крупнейшие девелоперы и государственные объекты по всему Узбекистану и странам СНГ.",
    text_en: "Over a decade of engineering excellence. Trusted by tier-1 general contractors, international architects, and government infrastructure developers.",
    button_uz: "LOYIHALARIMIZ",
    button_ru: "НАШИ ОБЪЕКТЫ",
    button_en: "VIEW CASE STUDIES",
    link_href: "/projects",
    sort_order: 3,
    is_active: true,
  },
];

export async function getActiveHeroSlides(): Promise<HeroSlide[]> {
  if (!isSupabaseConfigured) return STATIC_HERO_SLIDES;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");

    if (error || !data || data.length === 0) return STATIC_HERO_SLIDES;
    return data as HeroSlide[];
  } catch {
    return STATIC_HERO_SLIDES;
  }
}

export async function getAllHeroSlides(): Promise<HeroSlide[]> {
  if (!isSupabaseConfigured) return STATIC_HERO_SLIDES;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("hero_slides").select("*").order("sort_order");
    if (error || !data) return STATIC_HERO_SLIDES;
    return data as HeroSlide[];
  } catch {
    return STATIC_HERO_SLIDES;
  }
}

export async function getHeroSlideById(id: string): Promise<HeroSlide | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("hero_slides").select("*").eq("id", id).single();
    if (error || !data) return null;
    return data as HeroSlide;
  } catch {
    return null;
  }
}
