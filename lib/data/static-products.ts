// Static product data — mirrors src/product-data.js but using /public paths.
// This is the fallback when Supabase is not configured (no .env.local).
// Once Supabase is connected, the DB takes precedence via lib/db/products.ts.

export type ProductCategory = "product" | "accessory";

export type TemplateType =
  | "TemplateGrilyato"
  | "TemplateArmstrong"
  | "TemplateSlat"
  | "TemplateAccessory"
  | "TemplateHexagon";

export interface ProductImage {
  src: string;
  alt_uz: string;
  alt_ru: string;
  alt_en: string;
}

export interface StaticProduct {
  id: string;
  slug: string;
  category: ProductCategory;
  template_type: TemplateType;
  hero_image_url: string;
  images: ProductImage[];
  application_cases: ProductImage[];
  video_id: string;
  related_products: string[];
  sort_order: number;
}

export const STATIC_PRODUCTS: StaticProduct[] = [
  {
    id: "grilyato",
    slug: "grilyato",
    category: "product",
    template_type: "TemplateGrilyato",
    hero_image_url: "/images/products/grilyato/grilyato1.jpg",
    images: [
      { src: "/images/products/grilyato/grilyato1.jpg", alt_uz: "Grilyato osma shift 100x100 mm oq rangda — Vero Ceilings Toshkent", alt_ru: "Потолок Грильято 100x100 мм белый — Vero Ceilings Ташкент", alt_en: "Grilyato open-cell ceiling 100x100 mm white — Vero Ceilings" },
      { src: "/images/products/grilyato/grilyato2.jpg", alt_uz: "Grilyato katakchali shift yacheykasi yaqindan ko'rinishi", alt_ru: "Крупный план ячейки потолка Грильято", alt_en: "Close-up of Grilyato cell structure" },
      { src: "/images/products/grilyato/grilyato75x75.png", alt_uz: "Grilyato 75x75 mm katakchali shift — Vero Ceilings", alt_ru: "Грильято 75x75 мм ячеистый потолок — Vero Ceilings", alt_en: "Grilyato 75x75 mm cell ceiling — Vero Ceilings" },
    ],
    application_cases: [
      { src: "/images/products/grilyato/grilyatoapplication1.jpg", alt_uz: "Savdo markazida grilyato shift montaji — Toshkent", alt_ru: "Монтаж потолка Грильято в торговом центре — Ташкент", alt_en: "Grilyato ceiling in shopping mall — Tashkent" },
      { src: "/images/products/grilyato/grilyatoapplication2.jpg", alt_uz: "Ofisda grilyato osma shift — Vero Ceilings loyihasi", alt_ru: "Грильято в офисе — проект Vero Ceilings", alt_en: "Grilyato ceiling in office — Vero Ceilings project" },
      { src: "/images/products/grilyato/grilyatoapplication3.jpg", alt_uz: "Restoranda grilyato shift dizayni", alt_ru: "Дизайн потолка Грильято в ресторане", alt_en: "Grilyato ceiling design in restaurant" },
      { src: "/images/products/grilyato/grilyatoapplication4.jpg", alt_uz: "Aeroportda grilyato osma shift tizimi", alt_ru: "Система потолка Грильято в аэропорту", alt_en: "Grilyato ceiling system in airport" },
      { src: "/images/products/grilyato/grilyatoapplication5.jpg", alt_uz: "Bank va moliya muassasasida grilyato", alt_ru: "Грильято в банке и финансовом учреждении", alt_en: "Grilyato in bank and financial facility" },
      { src: "/images/products/grilyato/grilyatoapplication6.jpg", alt_uz: "Mehmonxona lobby zalida grilyato shift", alt_ru: "Грильято в лобби отеля", alt_en: "Grilyato ceiling in hotel lobby" },
    ],
    video_id: "k6Kujh_hHwI",
    related_products: ["stringer", "suspension"],
    sort_order: 1,
  },
  {
    id: "metalarmstrong",
    slug: "metalarmstrong",
    category: "product",
    template_type: "TemplateArmstrong",
    hero_image_url: "/images/products/armstrong/metalarmstrong/metalarmstrong1.png",
    images: [
      { src: "/images/products/armstrong/metalarmstrong/metalarmstrong1.png", alt_uz: "Metall kassetali Armstrong shift 600x600 mm — Vero Ceilings Toshkent", alt_ru: "Металлический кассетный потолок Армстронг 600x600 мм — Vero Ceilings Ташкент", alt_en: "Metal cassette Armstrong ceiling 600x600mm — Vero Ceilings Tashkent" },
      { src: "/images/products/armstrong/metalarmstrong/metalarmstrong2.png", alt_uz: "Metall Armstrong shift paneli yaqindan", alt_ru: "Панель металлического Армстронга крупным планом", alt_en: "Metal Armstrong panel close-up" },
      { src: "/images/products/armstrong/metalarmstrong/metalarmstrong3.png", alt_uz: "Metall kassetali Armstrong shiftning orqa tomoni", alt_ru: "Тыльная сторона кассеты металлического Армстронга", alt_en: "Metal Armstrong cassette reverse side" },
      { src: "/images/products/armstrong/metalarmstrong/metalarmstrong4.png", alt_uz: "Metall Armstrong karkasga o'rnatilgan holati", alt_ru: "Металлический Армстронг в каркасе", alt_en: "Metal Armstrong installed in grid" },
    ],
    application_cases: [
      { src: "/images/products/armstrong/metalarmstrong/appcase/ac1.jpg", alt_uz: "Savdo markazida metall Armstrong shift", alt_ru: "Металлический Армстронг в торговом зале", alt_en: "Metal Armstrong in retail space" },
      { src: "/images/products/armstrong/metalarmstrong/appcase/ac2.jpg", alt_uz: "Bankda metall kassetali shift", alt_ru: "Металлические кассеты в банке", alt_en: "Metal cassettes in bank" },
      { src: "/images/products/armstrong/metalarmstrong/appcase/ac3.jpg", alt_uz: "Tibbiy muassasada metall Armstrong", alt_ru: "Металлический Армстронг в медицинском учреждении", alt_en: "Metal Armstrong in medical facility" },
      { src: "/images/products/armstrong/metalarmstrong/appcase/ac4.jpg", alt_uz: "Ofis binoda metall Armstrong shiftlari", alt_ru: "Металлические потолки Армстронг в офисном здании", alt_en: "Metal Armstrong ceilings in office building" },
      { src: "/images/products/armstrong/metalarmstrong/appcase/ac5.jpg", alt_uz: "Zamonaviy interyer uchun metall Armstrong", alt_ru: "Металлический Армстронг для современного интерьера", alt_en: "Metal Armstrong for modern interior" },
      { src: "/images/products/armstrong/metalarmstrong/appcase/ac6.jpg", alt_uz: "Metall Armstrong va grilyato kombinatsiyasi", alt_ru: "Комбинация металлического Армстронга и Грильято", alt_en: "Metal Armstrong and Grilyato combination" },
    ],
    video_id: "E_M4s_R_3_E",
    related_products: ["t-profil", "l-profil", "suspension"],
    sort_order: 2,
  },
  {
    id: "gypsumarmstrong",
    slug: "gypsumarmstrong",
    category: "product",
    template_type: "TemplateArmstrong",
    hero_image_url: "/images/products/armstrong/gypsumarmstrong/gypsumarmstrongmain.jpg",
    images: [
      { src: "/images/products/armstrong/gypsumarmstrong/gypsumarmstrongmain.jpg", alt_uz: "Gipsli Armstrong shift paneli 595x595 mm — Vero Ceilings", alt_ru: "Гипсовая плита Армстронг 595x595 мм — Vero Ceilings", alt_en: "Gypsum Armstrong panel 595x595mm — Vero Ceilings" },
      { src: "/images/products/armstrong/gypsumarmstrong/gypsumarmstrong1.png", alt_uz: "Gipsli Armstrong yong'inga chidamli shift paneli", alt_ru: "Огнестойкая гипсовая панель Армстронг", alt_en: "Fireproof gypsum Armstrong panel" },
    ],
    application_cases: [
      { src: "/images/products/armstrong/gypsumarmstrong/gypsumapplication/ac1.jpg", alt_uz: "Maktabda gipsli Armstrong shift — akustik panel", alt_ru: "Гипсовый Армстронг в школе — акустическая панель", alt_en: "Gypsum Armstrong in school — acoustic panel" },
      { src: "/images/products/armstrong/gypsumarmstrong/gypsumapplication/ac2.jpg", alt_uz: "Shifoxonada gipsli Armstrong akustik shift", alt_ru: "Гипсовый Армстронг в больнице", alt_en: "Gypsum Armstrong ceiling in hospital" },
      { src: "/images/products/armstrong/gypsumarmstrong/gypsumapplication/ac3.jpg", alt_uz: "Ofisda gipsli Armstrong va ko'p qatlami tizim", alt_ru: "Гипсовый Армстронг в офисе и многоуровневая система", alt_en: "Gypsum Armstrong in office multilevel system" },
      { src: "/images/products/armstrong/gypsumarmstrong/gypsumapplication/ac4.jpg", alt_uz: "Mehmonxona xonasida gipsli Armstrong shift", alt_ru: "Гипсовый Армстронг в гостиничном номере", alt_en: "Gypsum Armstrong in hotel room" },
      { src: "/images/products/armstrong/gypsumarmstrong/gypsumapplication/ac5.jpg", alt_uz: "Restoranda gipsli Armstrong va yoritish", alt_ru: "Гипсовый Армстронг в ресторане с освещением", alt_en: "Gypsum Armstrong with lighting in restaurant" },
    ],
    video_id: "E_M4s_R_3_E",
    related_products: ["t-profil", "l-profil", "suspension"],
    sort_order: 3,
  },
  {
    id: "washingarmstrong",
    slug: "washingarmstrong",
    category: "product",
    template_type: "TemplateArmstrong",
    hero_image_url: "/images/products/armstrong/washingarmstrong/wa1.jpg",
    images: [
      { src: "/images/products/armstrong/washingarmstrong/wa1.jpg", alt_uz: "Yuviladigan Armstrong shift paneli 100% suv o'tkazmaydi", alt_ru: "Моющийся Армстронг 100% влагостойкий", alt_en: "Washable Armstrong panel 100% moisture-proof" },
      { src: "/images/products/armstrong/washingarmstrong/wa2.jpg", alt_uz: "Yuviladigan Armstrong plitasining plyonkali yuzasi", alt_ru: "Виниловая поверхность моющегося Армстронга", alt_en: "Vinyl face of washable Armstrong panel" },
      { src: "/images/products/armstrong/washingarmstrong/wa3.jpg", alt_uz: "Yuviladigan Armstrong va alyuminiy folga orqa tomoni", alt_ru: "Моющийся Армстронг с алюминиевой фольгой на тыльной стороне", alt_en: "Washable Armstrong with aluminium foil backing" },
      { src: "/images/products/armstrong/washingarmstrong/wa4.jpg", alt_uz: "Oshxonada yuviladigan namlikka chidamli Armstrong", alt_ru: "Моющийся влагостойкий Армстронг на кухне", alt_en: "Washable moisture-resistant Armstrong in kitchen" },
      { src: "/images/products/armstrong/washingarmstrong/wa5.jpg", alt_uz: "Yuviladigan Armstrong Ecofol — Vero Ceilings", alt_ru: "Моющийся Армстронг Ecofol — Vero Ceilings", alt_en: "Washable Armstrong Ecofol — Vero Ceilings" },
    ],
    application_cases: [
      { src: "/images/products/armstrong/washingarmstrong/waapplicationcase/ac1.jpg", alt_uz: "Oshxonada yuviladigan namlikka chidamli Armstrong shift", alt_ru: "Влагостойкий Армстронг на кухне", alt_en: "Moisture-resistant Armstrong in kitchen" },
      { src: "/images/products/armstrong/washingarmstrong/waapplicationcase/ac2.jpg", alt_uz: "Shifoxona palatasi uchun yuviladigan Armstrong", alt_ru: "Моющийся Армстронг для больничной палаты", alt_en: "Washable Armstrong for hospital ward" },
      { src: "/images/products/armstrong/washingarmstrong/waapplicationcase/ac3.jpg", alt_uz: "Hammom va namlik zonasida Armstrong Ecofol", alt_ru: "Armstrong Ecofol в санузле и влажной зоне", alt_en: "Armstrong Ecofol in wet zone" },
      { src: "/images/products/armstrong/washingarmstrong/waapplicationcase/ac4.jpg", alt_uz: "Yuviladigan Armstrong — oziq-ovqat sanoati uchun", alt_ru: "Моющийся Армстронг для пищевого производства", alt_en: "Washable Armstrong for food production" },
      { src: "/images/products/armstrong/washingarmstrong/waapplicationcase/ac5.jpg", alt_uz: "Laboratoriyada yuviladigan Armstrong shift", alt_ru: "Моющийся Армстронг в лаборатории", alt_en: "Washable Armstrong in laboratory" },
      { src: "/images/products/armstrong/washingarmstrong/waapplicationcase/ac6.jpg", alt_uz: "Dorixona va aptekada Ecofol Armstrong", alt_ru: "Ecofol Armstrong в аптеке", alt_en: "Ecofol Armstrong in pharmacy" },
    ],
    video_id: "E_M4s_R_3_E",
    related_products: ["t-profil", "l-profil", "suspension"],
    sort_order: 4,
  },
  {
    id: "slatceiling",
    slug: "slatceiling",
    category: "product",
    template_type: "TemplateSlat",
    hero_image_url: "/images/products/reyechniy/slat1.jpg",
    images: [
      { src: "/images/products/reyechniy/slat1.jpg", alt_uz: "Reykali osma shift alyuminiy — Vero Ceilings Toshkent", alt_ru: "Реечный подвесной потолок алюминиевый — Vero Ceilings Ташкент", alt_en: "Aluminium linear slat ceiling — Vero Ceilings Tashkent" },
      { src: "/images/products/reyechniy/slat2.jpg", alt_uz: "Reykali shift kubsimon 100mm yog'och rang", alt_ru: "Реечный потолок кубообразный 100мм под дерево", alt_en: "Box baffle slat ceiling 100mm wood finish" },
      { src: "/images/products/reyechniy/slat3.jpg", alt_uz: "Metall reykali shift chiziqli dizayn", alt_ru: "Металлический реечный потолок линейный дизайн", alt_en: "Metal slat ceiling linear design" },
      { src: "/images/products/reyechniy/slat4.jpg", alt_uz: "Reykali shift stringer bilan o'rnatish", alt_ru: "Монтаж реечного потолка на стрингер", alt_en: "Slat ceiling installation with stringer" },
      { src: "/images/products/reyechniy/slat5.jpg", alt_uz: "Reykali shift yo'lak va kirish zonasi", alt_ru: "Реечный потолок для коридора и входной группы", alt_en: "Slat ceiling for corridor and entrance area" },
      { src: "/images/products/reyechniy/slat6.jpg", alt_uz: "Reykali shift ranglar gammasi — RAL", alt_ru: "Цвета реечного потолка — палитра RAL", alt_en: "Slat ceiling colour options — RAL palette" },
    ],
    application_cases: [
      { src: "/images/products/reyechniy/application-case/slatapplication1.jpg", alt_uz: "Xalqaro aeroportda reykali shift — Toshkent", alt_ru: "Реечный потолок в международном аэропорту — Ташкент", alt_en: "Linear slat ceiling in international airport — Tashkent" },
      { src: "/images/products/reyechniy/application-case/slatapplication2.jpg", alt_uz: "Savdo markazida reykali alyuminiy shift", alt_ru: "Алюминиевый реечный потолок в торговом центре", alt_en: "Aluminium slat ceiling in shopping centre" },
      { src: "/images/products/reyechniy/application-case/slatapplication3.jpg", alt_uz: "Mehmonxona liftida reykali shift", alt_ru: "Реечный потолок в лифте отеля", alt_en: "Slat ceiling in hotel elevator" },
      { src: "/images/products/reyechniy/application-case/slatapplication4.jpg", alt_uz: "Restoran va kafeda kubsimon reykali shift", alt_ru: "Кубообразный реечный потолок в ресторане и кафе", alt_en: "Box slat ceiling in restaurant and cafe" },
      { src: "/images/products/reyechniy/application-case/slatapplication5.jpg", alt_uz: "Biznes markaz kirishida reykali shift", alt_ru: "Реечный потолок у входа в бизнес-центр", alt_en: "Slat ceiling at business centre entrance" },
      { src: "/images/products/reyechniy/application-case/slatapplication6.jpg", alt_uz: "Tashqi bino uchun reykali shift (softit)", alt_ru: "Реечный потолок для наружных работ (софит)", alt_en: "Slat ceiling for exterior use (soffit)" },
      { src: "/images/products/reyechniy/application-case/slatapplication7.jpg", alt_uz: "Ofis yo'lagida reykali shift tizimi", alt_ru: "Система реечного потолка в коридоре офиса", alt_en: "Slat ceiling system in office corridor" },
      { src: "/images/products/reyechniy/application-case/slatapplication8.jpg", alt_uz: "Tijorat markazda reykali va grilyato kombinatsiyasi", alt_ru: "Комбинация реечного и Грильято в торговом центре", alt_en: "Slat and Grilyato combination in commercial building" },
      { src: "/images/products/reyechniy/application-case/slatapplication9.jpg", alt_uz: "Zamonaviy uy interyer reykali shift", alt_ru: "Реечный потолок в современном жилом интерьере", alt_en: "Slat ceiling in modern residential interior" },
    ],
    video_id: "zK4iA4O70P4",
    related_products: ["stringer", "suspension"],
    sort_order: 5,
  },
  {
    id: "hexagon-wall-decor",
    slug: "hexagon-wall-decor",
    category: "product",
    template_type: "TemplateHexagon",
    hero_image_url: "/images/products/honeycomb/hexagon1.jpg",
    images: [
      { src: "/images/products/honeycomb/hexagon1.jpg", alt_uz: "Olti burchakli devor bezagi Hexagon — IT ofis va kovorkinglar uchun", alt_ru: "Шестигранный настенный декор Hexagon — для IT офисов и коворкингов", alt_en: "Hexagon wall decor — for IT offices and coworking spaces" },
      { src: "/images/products/honeycomb/hexagon2.jpg", alt_uz: "Hexagon akustik devorli panel qora rang", alt_ru: "Шестигранные акустические панели Hexagon чёрного цвета", alt_en: "Hexagon acoustic wall panels black colour" },
      { src: "/images/products/honeycomb/hexagon3.jpg", alt_uz: "Hexagon devor bezagi yig'ish tizimi", alt_ru: "Система монтажа шестигранного настенного декора", alt_en: "Hexagon wall decor installation system" },
      { src: "/images/products/honeycomb/hexagon4.jpg", alt_uz: "Hexagon panel raqamli va ijodiy ofislar uchun", alt_ru: "Панели Hexagon для диджитал и креативных офисов", alt_en: "Hexagon panels for digital and creative offices" },
    ],
    application_cases: [
      { src: "/images/products/honeycomb/applicationcase/ac1.jpg", alt_uz: "IT parkda hexagon devor bezagi", alt_ru: "Шестигранный декор в IT парке", alt_en: "Hexagon wall decor in IT park" },
      { src: "/images/products/honeycomb/applicationcase/ac2.jpg", alt_uz: "Kovorkingda hexagon akustik panel", alt_ru: "Акустические панели Hexagon в коворкинге", alt_en: "Hexagon acoustic panels in coworking" },
      { src: "/images/products/honeycomb/applicationcase/ac3.jpg", alt_uz: "Maktab va universitetda hexagon panel", alt_ru: "Панели Hexagon в школе и университете", alt_en: "Hexagon panels in school and university" },
      { src: "/images/products/honeycomb/applicationcase/ac4.jpg", alt_uz: "Ijodiy studiyada hexagon dekor", alt_ru: "Декор Hexagon в творческой студии", alt_en: "Hexagon decor in creative studio" },
      { src: "/images/products/honeycomb/applicationcase/ac5.jpg", alt_uz: "Start-up ofis interyer hexagon panellari", alt_ru: "Интерьер стартап офиса с панелями Hexagon", alt_en: "Startup office interior with Hexagon panels" },
    ],
    video_id: "",
    related_products: [],
    sort_order: 6,
  },
  {
    id: "t-profil",
    slug: "t-profil",
    category: "accessory",
    template_type: "TemplateAccessory",
    hero_image_url: "/images/products/profils/t-profil/t-profil1.jpg",
    images: [
      { src: "/images/products/profils/t-profil/t-profil1.jpg", alt_uz: "T-profil Armstrong shift karkasi T24 — Vero Ceilings", alt_ru: "Т-профиль Армстронг T24 для каркаса — Vero Ceilings", alt_en: "T-profile Armstrong grid T24 — Vero Ceilings" },
      { src: "/images/products/profils/t-profil/t-profil2.jpg", alt_uz: "T-profil asosiy va oraliq 3.6m — Vero Ceilings", alt_ru: "Т-профиль основной и поперечный 3.6м — Vero Ceilings", alt_en: "T-profile main and cross 3.6m — Vero Ceilings" },
    ],
    application_cases: [
      { src: "/images/products/profils/t-profil/ac1.jpg", alt_uz: "T-profil Armstrong karkasiga o'rnatish", alt_ru: "Монтаж Т-профиля Армстронг", alt_en: "T-profile Armstrong installation" },
      { src: "/images/products/profils/t-profil/ac2.jpg", alt_uz: "T-profil va Armstrong paneli ulash", alt_ru: "Соединение Т-профиля с панелью Армстронга", alt_en: "T-profile and Armstrong panel connection" },
      { src: "/images/products/profils/t-profil/ac3.jpg", alt_uz: "Asosiy T-profil 3.6m montaj", alt_ru: "Монтаж основного Т-профиля 3.6м", alt_en: "Main T-profile 3.6m installation" },
      { src: "/images/products/profils/t-profil/ac4.jpg", alt_uz: "T-profil to'liq Armstrong karkasi", alt_ru: "Полный каркас Армстронга из Т-профилей", alt_en: "Complete Armstrong grid from T-profiles" },
      { src: "/images/products/profils/t-profil/ac5.jpg", alt_uz: "T-profil Armstrong va grilyato birgalikda", alt_ru: "Т-профиль Armstrong и Grilyato совместно", alt_en: "T-profile for Armstrong and Grilyato together" },
      { src: "/images/products/profils/t-profil/ac6.jpg", alt_uz: "T-profil yig'ilgan Armstrong karkasi yuqoridan", alt_ru: "Собранный каркас Армстронг из Т-профилей сверху", alt_en: "Assembled Armstrong grid from T-profiles top view" },
    ],
    video_id: "",
    related_products: ["l-profil", "suspension"],
    sort_order: 7,
  },
  {
    id: "l-profil",
    slug: "l-profil",
    category: "accessory",
    template_type: "TemplateAccessory",
    hero_image_url: "/images/products/profils/l-profil/l-profil1.jpg",
    images: [
      { src: "/images/products/profils/l-profil/l-profil1.jpg", alt_uz: "L-profil devorbop burchaklik Armstrong uchun — Vero Ceilings", alt_ru: "L-профиль пристенный для Армстронга — Vero Ceilings", alt_en: "L-profile wall angle for Armstrong — Vero Ceilings" },
      { src: "/images/products/profils/l-profil/l-profil2.jpg", alt_uz: "L-profil devorbop ugolok 3m", alt_ru: "L-профиль пристенный уголок 3м", alt_en: "L-profile wall angle 3m" },
      { src: "/images/products/profils/l-profil/l-profil3.jpg", alt_uz: "L-profil va T-profil ulash", alt_ru: "Соединение L-профиля и Т-профиля", alt_en: "L-profile and T-profile connection" },
      { src: "/images/products/profils/l-profil/l-profil4.jpg", alt_uz: "L-profil devorda montaj qilingan holat", alt_ru: "L-профиль смонтированный на стене", alt_en: "L-profile mounted on wall" },
    ],
    application_cases: [
      { src: "/images/products/profils/l-profil/applicationcase/ac1.jpg", alt_uz: "L-profil xona perimetri bo'ylab montaj", alt_ru: "Монтаж L-профиля по периметру комнаты", alt_en: "L-profile installation along room perimeter" },
      { src: "/images/products/profils/l-profil/applicationcase/ac2.jpg", alt_uz: "L-profil Armstrong shift chekkasida", alt_ru: "L-профиль на краю потолка Армстронга", alt_en: "L-profile at Armstrong ceiling edge" },
      { src: "/images/products/profils/l-profil/applicationcase/ac3.jpg", alt_uz: "L-profil qalinligi 0.4 mm — zavod sifati", alt_ru: "L-профиль толщиной 0.4 мм — заводское качество", alt_en: "L-profile 0.4mm thickness — factory quality" },
      { src: "/images/products/profils/l-profil/applicationcase/ac4.jpg", alt_uz: "L-profil toza geometrik perimete", alt_ru: "Чистый геометрический периметр из L-профиля", alt_en: "Clean geometric perimeter with L-profile" },
      { src: "/images/products/profils/l-profil/applicationcase/ac5.jpg", alt_uz: "L-profil grilyato shift perimetri uchun", alt_ru: "L-профиль для периметра потолка Грильято", alt_en: "L-profile for Grilyato ceiling perimeter" },
      { src: "/images/products/profils/l-profil/applicationcase/ac6.jpg", alt_uz: "L-profil va Armstrong karkasi birgalikda", alt_ru: "L-профиль и каркас Армстронга совместно", alt_en: "L-profile and Armstrong grid together" },
    ],
    video_id: "",
    related_products: ["t-profil", "suspension"],
    sort_order: 8,
  },
  {
    id: "stringer",
    slug: "stringer",
    category: "accessory",
    template_type: "TemplateAccessory",
    hero_image_url: "/images/products/profils/stringer/stringer1.jpg",
    images: [
      { src: "/images/products/profils/stringer/stringer1.jpg", alt_uz: "Stringer traversa reykali shift uchun — Vero Ceilings", alt_ru: "Стрингер (траверса) для реечного потолка — Vero Ceilings", alt_en: "Stringer (carrier) for slat ceiling — Vero Ceilings" },
      { src: "/images/products/profils/stringer/stringer2.png", alt_uz: "Stringer grebenka reykali shiftni ushlab turadi", alt_ru: "Стрингер-гребёнка держит рейки потолка", alt_en: "Stringer comb holds slat ceiling panels" },
    ],
    application_cases: [
      { src: "/images/products/stringer/appcase/ac1.jpg", alt_uz: "Stringer reykali shiftga o'rnatilgan", alt_ru: "Стрингер установлен под реечный потолок", alt_en: "Stringer installed for slat ceiling" },
      { src: "/images/products/stringer/appcase/ac2.jpg", alt_uz: "Stringer va reykali shift yig'ish", alt_ru: "Сборка стрингера и реечного потолка", alt_en: "Stringer and slat ceiling assembly" },
      { src: "/images/products/stringer/appcase/ac3.jpg", alt_uz: "Stringer 1m oraliqda o'rnatish", alt_ru: "Стрингер с шагом 1м", alt_en: "Stringer at 1m spacing" },
      { src: "/images/products/stringer/appcase/ac4.jpg", alt_uz: "Stringer podves bilan birgalikda", alt_ru: "Стрингер совместно с подвесом", alt_en: "Stringer with suspension hanger" },
      { src: "/images/products/stringer/appcase/ac5.jpg", alt_uz: "Stringer ruxlangan po'latdan tayyorlangan", alt_ru: "Стрингер из оцинкованной стали", alt_en: "Galvanized steel stringer" },
      { src: "/images/products/stringer/appcase/ac6.jpg", alt_uz: "Stringer va kubsimon reykali shift", alt_ru: "Стрингер и кубообразная рейка", alt_en: "Stringer and box baffle slat" },
    ],
    video_id: "",
    related_products: ["slatceiling", "suspension"],
    sort_order: 9,
  },
  {
    id: "suspension",
    slug: "suspension",
    category: "accessory",
    template_type: "TemplateAccessory",
    hero_image_url: "/images/products/profils/podveska/podveska1.png",
    images: [
      { src: "/images/products/profils/podveska/podveska1.png", alt_uz: "Osma tizim prujinali podves — Vero Ceilings Toshkent", alt_ru: "Регулируемый подвес пружинный для потолка — Vero Ceilings", alt_en: "Adjustable spring hanger for suspended ceiling — Vero Ceilings" },
      { src: "/images/products/profils/podveska/podveska2.jpg", alt_uz: "Podves sim bilan sozlanuvchi osma tizim", alt_ru: "Подвес с тягой регулируемая система", alt_en: "Wire hanger adjustable suspension system" },
      { src: "/images/products/profils/podveska/podveska3.jpg", alt_uz: "Kapalak podves Armstrong uchun", alt_ru: "Подвес-бабочка для Армстронга", alt_en: "Butterfly hanger for Armstrong" },
      { src: "/images/products/profils/podveska/podveska4.jpg", alt_uz: "Osma tizim to'liq komplekt", alt_ru: "Полный комплект подвесной системы", alt_en: "Complete suspension system set" },
    ],
    application_cases: [
      { src: "/images/products/profils/podveska/appcase/ac1.jpg", alt_uz: "Podves T-profil bilan osib qo'yilgan", alt_ru: "Подвес с Т-профилем смонтированный", alt_en: "Hanger with T-profile mounted" },
      { src: "/images/products/profils/podveska/appcase/ac2.jpg", alt_uz: "Podves grilyato karkasi uchun", alt_ru: "Подвес для каркаса Грильято", alt_en: "Hanger for Grilyato frame" },
      { src: "/images/products/profils/podveska/appcase/ac3.jpg", alt_uz: "Podves balandligini sozlash", alt_ru: "Регулировка высоты подвеса", alt_en: "Adjusting hanger height" },
      { src: "/images/products/profils/podveska/appcase/ac4.jpg", alt_uz: "Podves va stringer birgalikda", alt_ru: "Подвес и стрингер совместно", alt_en: "Hanger and stringer together" },
      { src: "/images/products/profils/podveska/appcase/ac5.jpg", alt_uz: "Podves 250-1000mm sozlanuvchi uzunlik", alt_ru: "Подвес 250-1000мм регулируемая длина", alt_en: "Hanger 250-1000mm adjustable length" },
    ],
    video_id: "",
    related_products: ["t-profil", "l-profil", "grilyato", "slatceiling"],
    sort_order: 10,
  },
];

export function getStaticProductBySlug(slug: string): StaticProduct | undefined {
  return STATIC_PRODUCTS.find((p) => p.slug === slug);
}

export function getStaticProductsByCategory(category: ProductCategory): StaticProduct[] {
  return STATIC_PRODUCTS.filter((p) => p.category === category).sort(
    (a, b) => a.sort_order - b.sort_order
  );
}
