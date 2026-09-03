import { createClient } from "@/lib/supabase/server";

export interface ProjectMedia {
  url: string;
  type: "image" | "video";
  alt?: string;
  sort_order: number;
}

export interface Project {
  id: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  ceiling_type_used: string;
  location_uz: string;
  location_ru: string;
  location_en: string;
  media_url: string; // Used for thumbnail or image
  media?: ProjectMedia[];
  media_type?: string; // 'image' | 'video'
  video_url?: string;
  is_video: boolean;
  year: number | null;
  area_sqm: number | null;
  sort_order: number;
  is_active: boolean;
}

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Static gallery fallback — all 50 gallery photos
const GALLERY_PHOTO_SLUGS = Array.from({ length: 50 }, (_, i) => i + 1);

export const STATIC_PROJECTS: Project[] = [
  {
    id: "airport-1",
    title_uz: "Toshkent xalqaro aeroporti",
    title_ru: "Международный аэропорт Ташкента",
    title_en: "Tashkent International Airport",
    ceiling_type_used: "grilyato",
    location_uz: "Toshkent",
    location_ru: "Ташкент",
    location_en: "Tashkent",
    media_url: "/images/project-gallery/airportproject.jpg",
    is_video: false,
    year: 2023,
    area_sqm: 2400,
    sort_order: 1,
    is_active: true,
  },
  {
    id: "office-grilyato-1",
    title_uz: "Zamonaviy ofis markazi — grilyato shift",
    title_ru: "Современный офисный центр — потолок Грильято",
    title_en: "Modern office centre — Grilyato ceiling",
    ceiling_type_used: "grilyato",
    location_uz: "Toshkent",
    location_ru: "Ташкент",
    location_en: "Tashkent",
    media_url: "/images/project-gallery/office-grilyato.jpg",
    is_video: false,
    year: 2024,
    area_sqm: 850,
    sort_order: 2,
    is_active: true,
  },
  {
    id: "shopping-center-1",
    title_uz: "Yirik savdo markazi — grilyato osma shift tizimi",
    title_ru: "Крупный ТРЦ — система потолка Грильято",
    title_en: "Large shopping centre — Grilyato ceiling system",
    ceiling_type_used: "grilyato",
    location_uz: "Toshkent",
    location_ru: "Ташкент",
    location_en: "Tashkent",
    media_url: "/images/project-gallery/shoping-center.jpg",
    is_video: false,
    year: 2023,
    area_sqm: 5000,
    sort_order: 3,
    is_active: true,
  },
  {
    id: "hotel-1",
    title_uz: "Mehmonxona loyihasi — Armstrong shiftlari",
    title_ru: "Проект отеля — потолки Армстронг",
    title_en: "Hotel project — Armstrong ceilings",
    ceiling_type_used: "armstrong",
    location_uz: "Toshkent",
    location_ru: "Ташкент",
    location_en: "Tashkent",
    media_url: "/images/project-gallery/hotel.jpg",
    is_video: false,
    year: 2024,
    area_sqm: 1200,
    sort_order: 4,
    is_active: true,
  },
  {
    id: "restaurant-1",
    title_uz: "Premium restoran — reykali shift dizayni",
    title_ru: "Премиум ресторан — дизайн реечного потолка",
    title_en: "Premium restaurant — linear slat ceiling design",
    ceiling_type_used: "slatceiling",
    location_uz: "Toshkent",
    location_ru: "Ташкент",
    location_en: "Tashkent",
    media_url: "/images/project-gallery/restaurantproject.jpg",
    is_video: false,
    year: 2024,
    area_sqm: 300,
    sort_order: 5,
    is_active: true,
  },
  {
    id: "education-1",
    title_uz: "Ta'lim muassasasi — Armstrong akustik shift",
    title_ru: "Образовательное учреждение — акустический потолок Армстронг",
    title_en: "Educational facility — Armstrong acoustic ceiling",
    ceiling_type_used: "armstrong",
    location_uz: "Toshkent",
    location_ru: "Ташкент",
    location_en: "Tashkent",
    media_url: "/images/project-gallery/educationalproject.png",
    is_video: false,
    year: 2023,
    area_sqm: 1800,
    sort_order: 6,
    is_active: true,
  },
  {
    id: "office-armstrong-1",
    title_uz: "Ofis binosi — metall Armstrong shift",
    title_ru: "Офисное здание — металлический Армстронг",
    title_en: "Office building — metal Armstrong ceiling",
    ceiling_type_used: "metalarmstrong",
    location_uz: "Toshkent",
    location_ru: "Ташкент",
    location_en: "Tashkent",
    media_url: "/images/project-gallery/office-armstrong.jpg",
    is_video: false,
    year: 2024,
    area_sqm: 650,
    sort_order: 7,
    is_active: true,
  },
  {
    id: "office-slatceiling-1",
    title_uz: "Ofis lobbisi — reykali shift tizimi",
    title_ru: "Лобби офиса — реечный потолок",
    title_en: "Office lobby — slat ceiling system",
    ceiling_type_used: "slatceiling",
    location_uz: "Toshkent",
    location_ru: "Ташкент",
    location_en: "Tashkent",
    media_url: "/images/project-gallery/office-slatceiling.jpg",
    is_video: false,
    year: 2024,
    area_sqm: 450,
    sort_order: 8,
    is_active: true,
  },
  ...GALLERY_PHOTO_SLUGS.map((n, i) => ({
    id: `gallery-${n}`,
    title_uz: `Vero Ceilings loyihasi ${n}`,
    title_ru: `Проект Vero Ceilings ${n}`,
    title_en: `Vero Ceilings project ${n}`,
    ceiling_type_used: "grilyato",
    location_uz: "Toshkent",
    location_ru: "Ташкент",
    location_en: "Tashkent",
    media_url: `/images/project-gallery/gallery/photo_${n}_2024-02-01_12-57-42.jpg`,
    is_video: false,
    year: 2024,
    area_sqm: null,
    sort_order: 100 + i,
    is_active: true,
  })),
];

export async function getProjectById(id: string): Promise<Project | null> {
  if (!isSupabaseConfigured) return STATIC_PROJECTS.find((p) => p.id === id) ?? null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
    if (error || !data) return null;
    return data as Project;
  } catch {
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return STATIC_PROJECTS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");

    if (error || !data || data.length === 0) return STATIC_PROJECTS;
    return data as Project[];
  } catch {
    return STATIC_PROJECTS;
  }
}
