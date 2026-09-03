import { createClient } from "@/lib/supabase/server";

export interface Faq {
  id: string;
  question_uz: string;
  question_ru: string;
  question_en: string;
  answer_uz: string;
  answer_ru: string;
  answer_en: string;
  sort_order: number;
  is_active: boolean;
}

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// The 6 FAQ entries as originally hardcoded via messages/*.json's "faq" namespace (q1-q6).
export const STATIC_FAQS: Faq[] = [
  {
    id: "q1",
    question_uz: "Toshkentda grilyato shift sotib olish narxi qancha?",
    question_ru: "Сколько стоит купить потолок Грильято в Ташкенте?",
    question_en: "What is Vero Ceilings' production scale and manufacturing facility location?",
    answer_uz: "Grilyato shiftining narxi katakcha o'lchamiga (50x50, 75x75, 100x100, 150x150, 200x200 mm), balandligiga va rangiga bog'liq. To'g'ridan-to'g'ri ishlab chiqaruvchi bo'lganimiz uchun Toshkentda vositachilarsiz eng arzon narxlarni taklif qilamiz. Aniq smeta va bepul hisob-kitob uchun +99878 333 73 77 raqamiga qo'ng'iroq qiling.",
    answer_ru: "Цена потолка Грильято зависит от размера ячейки (50х75, 75х75, 100х100, 150х150, 200х200 мм), высоты профиля и цвета по RAL. Являясь прямым заводом-производителем, мы предлагаем самые выгодные цены в Ташкенте без наценок посредников. Позвоните по тел. +99878 333 73 77 для получения точного прайс-листа и бесплатного расчета.",
    answer_en: "Vero Ceilings operates a 15,000 m² factory complex in Tashkent, Uzbekistan, equipped with 200+ automated machinery lines and employing 1,700+ people across the Vero Group holding. Annual output exceeds millions of square metres of ceiling systems.",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "q2",
    question_uz: "Yetkazib berish muddatlari qanday va viloyatlarga yetkaziladimi?",
    question_ru: "Каковы сроки производства и доставки по Узбекистану?",
    question_en: "What export destinations and shipping terms do you support?",
    answer_uz: "Ommabop mahsulotlar (Grilyato 100x100, 75x75, Armstrong 600x600 oq, kulrang va qora ranglarda) Toshkentdagi omborimizda doim mavjud va buyurtma kuni jo'natiladi. O'zbekistonning barcha 14 viloyatiga yetkazib beramiz. 100 m²dan ortiq buyurtmalarda Toshkent bo'ylab yetkazib berish bepul.",
    answer_ru: "Популярные позиции (Грильято 100х100, 75х75, Армстронг 600х600 в белом, сером и черном цветах) всегда в наличии на складе в Ташкенте и готовы к отгрузке в день заказа. Доставка осуществляется по всем 14 регионам Узбекистана. При заказе от 100 м² доставка по Ташкенту — бесплатная.",
    answer_en: "We export throughout Central Asia (Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan), the CIS, and the Middle East by truckload (FTL) and ocean containers (FCL). We supply CT-1 certificates of origin, customs export documentation, and flexible Incoterms (FCA, CPT, DAP, FOB, CIF).",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "q3",
    question_uz: "Rasmiy kafolat va sifat sertifikatlari beriladimi?",
    question_ru: "Предоставляется ли официальная гарантия и сертификаты?",
    question_en: "What certifications and fire safety ratings do your ceilings carry?",
    answer_uz: "Ha, barcha Vero Ceilings mahsulotlariga zavoddan 15 yillik rasmiy kafolat beriladi. Shuningdek, GOST/ISO muvofiqlik, yong'in xavfsizligi (NG) va sanitariya sertifikatlari to'liq taqdim etiladi.",
    answer_ru: "Да, на всю продукцию Vero Ceilings распространяется официальная 15-летняя гарантия завода-изготовителя. Предоставляем полный пакет сертификатов: соответствие ГОСТ/ISO, санитарно-эпидемиологические заключения и сертификаты пожарной безопасности (НГ).",
    answer_en: "All Vero Ceilings systems are manufactured under ISO 9001 quality management and comply with international fire codes (Class A1 / non-combustible НГ ratings), acoustic performance standards, and sanitary safety certifications.",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "q4",
    question_uz: "Ulgurji xarid qilsa bo'ladimi va pul o'tkazish (perechislenie) yo'li bilan ishlaysizmi?",
    question_ru: "Как заказать оптом и работаете ли вы с юрлицами по перечислению?",
    question_en: "Can architects request physical sample kits and BIM/DWG documentation?",
    answer_uz: "Ha, biz QQS bilan yuridik shaxslar, qurilish kompaniyalari, develoeprlar va me'morlar bilan pul o'tkazish (shartnoma) asosida ishlaymiz. Katta hajmdagi xaridlar uchun maxsus ulgurji chegirmalar taqdim etiladi.",
    answer_ru: "Да, мы работаем с НДС по безналичному расчету (перечислением) с юридическими лицами, девелоперами, строительными подрядчиками и архитекторами. Заключаем официальные договоры с фиксированными сроками и предоставляем специальные оптовые скидки.",
    answer_en: "Yes! We provide full specifier packages including physical aluminium and metal sample boxes, high-resolution finish swatches, technical DWG details, and BIM/Revit families. Contact our export desk to request a kit.",
    sort_order: 4,
    is_active: true,
  },
  {
    id: "q5",
    question_uz: "Professional montaj xizmatlarini ham bajarasizmi?",
    question_ru: "Выполняете ли вы профессиональный монтаж потолков под ключ?",
    question_en: "What Grilyato open-cell dimensions and custom finishes are available?",
    answer_uz: "Ha, bizda malakali montaj brigadalari mavjud. Lazerli o'lchov olishdan boshlab to'liq topshirishgacha bo'lgan barcha ishlarni bajaramiz. Toshkent bo'ylab o'lchovchi chiqishi bepul.",
    answer_ru: "Да, у нас работают собственные аттестованные монтажные бригады. Мы выполняем весь комплекс работ: от лазерного замера помещения до финальной сдачи объекта. Выезд инженера-замерщика по Ташкенту — бесплатно.",
    answer_en: "Standard cell sizes include 50x50, 75x75, 100x100, 150x150, and 200x200 mm with blade heights from 30 to 50 mm. Available in standard white, black, metallic grey, and custom RAL powder coatings or wood-sublimated finishes.",
    sort_order: 5,
    is_active: true,
  },
  {
    id: "q6",
    question_uz: "Qozog'iston, Qirg'iziston, Tojikiston va boshqa MDH davlatlariga eksport qilasizmi?",
    question_ru: "Возможен ли экспорт потолков в Казахстан, Кыргызстан, Таджикистан и страны СНГ?",
    question_en: "What are the minimum order quantities (MOQ) and lead times for wholesale export?",
    answer_uz: "Ha! Vero Ceilings yirik partiyalarda (avtofuralar, konteynerlar) Markaziy Osiyo va MDH davlatlariga eksport bojxona hujjatlari va ST-1 kelib chiqish sertifikatlari bilan yetkazib beradi.",
    answer_ru: "Да! Vero Ceilings осуществляет регулярные экспортные поставки крупными партиями (контейнеры, автофуры) в страны Центральной Азии и СНГ со всеми экспортными таможенными документами и сертификатами происхождения CT-1.",
    answer_en: "High-runner profiles (Grilyato 100x100, 75x75, Armstrong 600x600 in white/black) are maintained in inventory for immediate dispatch. Custom production runs are typically fulfilled within 5 to 14 business days depending on volume.",
    sort_order: 6,
    is_active: true,
  },
];

export async function getActiveFaqs(): Promise<Faq[]> {
  if (!isSupabaseConfigured) return STATIC_FAQS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("faqs").select("*").eq("is_active", true).order("sort_order");
    if (error || !data || data.length === 0) return STATIC_FAQS;
    return data as Faq[];
  } catch {
    return STATIC_FAQS;
  }
}

export async function getAllFaqs(): Promise<Faq[]> {
  if (!isSupabaseConfigured) return STATIC_FAQS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("faqs").select("*").order("sort_order");
    if (error || !data) return STATIC_FAQS;
    return data as Faq[];
  } catch {
    return STATIC_FAQS;
  }
}

export async function getFaqById(id: string): Promise<Faq | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("faqs").select("*").eq("id", id).single();
    if (error || !data) return null;
    return data as Faq;
  } catch {
    return null;
  }
}
