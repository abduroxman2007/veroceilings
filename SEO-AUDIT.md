# Vero Ceilings — SEO Audit & Competitive Strategy

**Date:** 11 August 2026
**Site:** veroceilings.uz
**Primary competitor analysed:** ecolit.uz
**Language priority:** 1) Uzbek 2) Russian 3) English

---

## 0. Executive summary

You are not losing to ecolit.uz on content quality. **You are losing because your site is effectively invisible to search engines.**

The single most important finding:

```
$ curl https://veroceilings.uz/
<title></title>
<meta name="description" content="">
You need to enable JavaScript to run this app.
```

Your homepage serves an **empty title tag, an empty description, and zero body content**. Everything is injected client-side by React after the JavaScript bundle loads. Meanwhile ecolit.uz serves a complete, keyword-optimised HTML document on the first byte.

Second most important finding: **you have no Uzbek URL and no Russian URL.** All three languages share the same URLs (`/`, `/products`, `/products/grilyato`), and the language is chosen at runtime from `localStorage`, falling back to **English**. Google therefore has exactly one version of each page to index, and by default it is the English one — the language you ranked as *lowest* priority.

Until these two things are fixed, no amount of keyword work will move you.

The good news: ecolit.uz only began publishing Uzbek-language content in **July 2026** — roughly ten posts, some of them duplicates. The Uzbek market is wide open. That is your fastest path to page one.

---

## 1. Technical SEO audit — veroceilings.uz

### 1.1 Blocking issues (P0)

| # | Issue | Evidence | Impact |
|---|---|---|---|
| 1 | **Client-side rendering only** | `public/index.html` ships `<div id="root">` and nothing else. Live fetch returns "You need to enable JavaScript to run this app." | Yandex — which handles a large share of Russian-language search in Uzbekistan — renders JavaScript poorly and inconsistently. You are close to invisible there. Google *can* render, but it queues JS rendering separately and de-prioritises sites that return empty shells. |
| 2 | **Empty `<title>` and `<meta description>` in served HTML** | `public/index.html` lines 8–9 and `<title></title>` | The title tag is the strongest single on-page ranking signal. Yours is blank at crawl time. `App.js` sets it in a `useEffect`, which only runs after hydration. |
| 3 | **One URL for three languages** | `App.js` routes have no locale segment; `i18n.js` reads `localStorage` then `navigator.language`, defaulting to `'en'` | You cannot rank for Uzbek *and* Russian queries at the same time. Google indexes one canonical version per URL. |
| 4 | **No `sitemap.xml`** | `https://veroceilings.uz/sitemap.xml` returns the React app shell with HTTP 200 | Crawlers have no discovery map. |
| 5 | **Soft-404 across the entire domain** | Any nonexistent path returns 200 + app shell instead of 404 | Google sees an infinite set of near-duplicate "pages". This actively suppresses crawl budget and can trigger quality demotions. |
| 6 | **No `hreflang` annotations** | — | Even after adding locale URLs, Google needs hreflang to map uz ↔ ru ↔ en. |
| 7 | **No canonical tags** | — | Duplicate-content risk from query strings, trailing slashes, `www` vs apex. |
| 8 | **No structured data** | No JSON-LD anywhere in `src/` | Ecolit is eligible for FAQ, breadcrumb, and organisation rich results. You are not. |

### 1.2 High-priority issues (P1)

| # | Issue | Detail |
|---|---|---|
| 9 | **No Open Graph / Twitter Card tags** | Every Telegram, Facebook and WhatsApp share of your link renders as a bare grey box. In Uzbekistan, Telegram is a primary B2B channel — this is real lost traffic. |
| 10 | **`robots.txt` has no `Sitemap:` directive** | Current file is just `User-agent: * / Disallow:` |
| 11 | **`manifest.json` is the CRA default** | `"short_name": "React App"`, `"name": "Create React App Sample"`, and it references `logo192.png` / `logo512.png` which do not exist in `public/` |
| 12 | **Catastrophic image weight** | 65 MB of images in `src/assets/images`, **zero WebP/AVIF**. `slider/slid3.jpg` alone is **9.6 MB**. Other offenders: `slid8.jpg` 4.0 MB, `slid1.jpg` 3.1 MB, `educationalproject.png` 3.0 MB. |
| 13 | **No lazy loading** | Exactly one `loading="lazy"` in the entire codebase (`Contact.js`). 219 image files, most eagerly loaded. |
| 14 | **Core Web Vitals will fail** | Consequence of 12 + 13 + CRA bundle. LCP and INP are confirmed ranking signals. |
| 15 | **Thin product content** | `ru.json → products.grilyato.description` is a single 150-character sentence. Ecolit's Grильято page runs well over 2,000 words with spec tables, four product variants, and an FAQ block. |
| 16 | **Missing / malformed headings** | `Home.js`, `Projects.js`, `Contact.js` contain no heading tags of their own. `Products.js` has `<h2>` but no `<h1>`. Only `ProductDetails.js` and `HeroSection.js` have an `<h1>`. |
| 17 | **Generic alt text** | `ProductDetails.js` line 55: ``alt={`${title} ${index + 1}`}`` → "Потолки Грильято 1". Ecolit uses `alt="Пожаробезопасный ячеистый потолок Грильято"`. Image search is a meaningful traffic source in this category. |
| 18 | **No blog / content engine** | Ecolit publishes project case studies and buying guides in both RU and UZ, most recently 3 August 2026. You publish nothing. |
| 19 | **Non-localised URL slugs** | `/products/grilyato` is acceptable; `/products/slatceiling` and `/products/hexagon-wall-decor` match no query anyone types in Uzbek or Russian. |
| 20 | **`thumbs.db` files committed** | Windows artefacts scattered through `src/assets/images/` — harmless for SEO but they bloat the repo and the build. |

---

## 2. Competitor analysis — ecolit.uz

### 2.1 What they do well

**Stack advantage.** WordPress + Yoast SEO + Elementor. Every page is server-rendered with complete metadata before a single line of JavaScript runs. This is the whole ballgame.

**Metadata discipline.** Their Grильято page:

```
title:            Потолок Грильято в Узбекистане — Ячеистые потолки Ecolit
meta-description: Купить потолки Grilliato в Узбекистане. Эстетика, надежность
                  и доступные цены. Установка от профессионалов компании Ecolit.
canonical:        https://ecolit.uz/podvesnye-potolki-grilyato/
meta-robots:      index, follow, max-image-preview:large, max-snippet:-1
og:title / og:description / og:image / og:locale / twitter:card — all present
```

Note the title formula: **[keyword] + [geo] + [modifier] + [brand]**. And `max-snippet:-1` + `max-image-preview:large` explicitly opt them into larger, more clickable SERP listings.

**Keyword-rich URL slugs.**

```
/podvesnye-potolki-grilyato/
/podvesnye-potolki-armstrong/
/podvesnaya-sistema-armstrong/
/reechnye-potolki/
/svetilniki-dlya-podvesnogo-potolka/
/ventilyaczionnye-reshetki/
```

**Bilingual URL structure.** Uzbek content lives under `/uz/`:

```
/uz/bosh-sahifa/
/uz/tovarlar/
/uz/toshkentda-osma-shiftlar-office-va-tijorat-obektlari-uchun-ideal-yechimni-tanlash/
/uz/toshkentda-armstrong-osma-shiftlari-oʻlchamlari-m²-narxlari-va-komplektatsiyasi/
```

**Sitemap infrastructure.** Yoast-generated `sitemap_index.xml` → `post-sitemap.xml`, `page-sitemap.xml`, `category-sitemap.xml`, all with accurate `lastmod` and embedded `<image:image>` entries.

**Content depth.** The Grильято page carries four distinct product variants, each with a full specification table (steel composition, colour, metal thickness, cell size, profile height/width, assembled size, box quantity, weight, КМ-0 fire class), then long-form prose, then an FAQ block.

**Freshness signals.** Blog posts dated 27 July, 30 July, 3 August 2026. Page `lastmod` values updated within the last week.

**Verification and analytics.** Google Search Console verified, Google Site Kit, AdSense, Facebook domain verification, Twitter handle.

**Descriptive alt text in Russian.** `"Пожаробезопасный ячеистый потолок Грильято"`, `"Реечный потолок цена за м2 в Ташкенте"`, `"Установка светодиодных панелей в потолок Армстронг"` — each one a keyword phrase.

**WebP images.** `galafol_obyekt1-1.webp`, `vivofol-1.webp`, etc.

### 2.2 Where ecolit.uz is weak — your openings

| Weakness | How you exploit it |
|---|---|
| **Uzbek content is brand new (July 2026) and shallow — ~10 posts** | This is your single biggest opening. Ship 25–30 genuinely useful Uzbek pages before they do. |
| **Duplicate Uzbek posts** — `/uz/qorasuv-massividagi-xususiy-maktabda-griliato-va-namlikka-chidamli-ecofol-shiftlari-loyihasi/` and `.../griliato-va-nam-likka-chidamli-...` are near-identical | They are cannibalising their own Uzbek rankings. |
| **No prices published anywhere on-page** | Publish real per-m² pricing and a calculator. `narxi` / `цена` / `сколько стоит` queries are the highest-intent terms in this category and they have conceded them entirely. |
| **Empty pages** — `/reechnye-potolki/` and `/sajding-potolki/` render with no body text | Easy pages to outrank. |
| **Elementor bloat** | Their Core Web Vitals are almost certainly poor. If you go static/SSG with optimised images you will beat them decisively — *provided you fix your own images first*. |
| **Sloppy copy** — "профилmя" (Latin `m` inside a Cyrillic word), "Речний" instead of "Реечный", "размероа" | Signals low editorial quality; you can win on trust and E-E-A-T. |
| **No visible hreflang pairing between ru and uz versions** | Implement hreflang properly and you get cleaner language targeting than they have. |
| **Their Grильято page mixes in unrelated "Сайдинг" and "Реечные" blocks** | Diluted topical focus. A tightly focused page beats a padded one. |

### 2.3 The wider SERP — who else you must beat

Searches for `купить грильято Ташкент` and `grilyato shift narxi Toshkent` are dominated not by manufacturers but by **marketplaces**:

- prom.uz (multiple listings, RU + UZ versions)
- glotr.uz / gl.uz (RU + UZ)
- flagma.uz
- stroyka.uz
- vibo.uz
- satu.kz (Kazakhstan, leaking into UZ results)
- **agraf.uz** — a direct manufacturer competitor, ranking on `Потолки Грильято цена в Ташкенте, Самарканде, Фергане, Бухаре`

Two lessons:

1. **agraf.uz's title targets four cities.** Regional geo-modifiers (Samarkand, Fergana, Bukhara, Namangan, Andijan) are cheap wins with almost no competition.
2. **You should be *on* these marketplaces, not just competing with them.** A Prom.uz and Glotr.uz listing linking back to veroceilings.uz gives you referral traffic and a backlink while your own domain gains authority.

---

## 3. Head-to-head scorecard

| Factor | veroceilings.uz | ecolit.uz |
|---|---|---|
| Server-rendered HTML | ❌ Empty shell | ✅ Full |
| `<title>` on first byte | ❌ Empty | ✅ Optimised |
| Meta description | ❌ Empty | ✅ Optimised |
| Open Graph / Twitter | ❌ None | ✅ Complete |
| Canonical | ❌ None | ✅ Present |
| sitemap.xml | ❌ Missing | ✅ Yoast index, 3 sitemaps |
| robots.txt sitemap directive | ❌ Missing | ✅ |
| Separate URL per language | ❌ No | ✅ `/uz/` |
| hreflang | ❌ None | ⚠️ Partial |
| Structured data | ❌ None | ⚠️ Likely FAQ/Article via Yoast |
| Keyword-rich slugs | ⚠️ Partial | ✅ |
| Content depth per product | ❌ ~150 chars | ✅ 2,000+ words |
| Descriptive alt text | ❌ Auto-generated | ✅ Keyword-rich |
| WebP / modern formats | ❌ Zero | ✅ |
| Largest image | ❌ 9.6 MB | ~200 KB |
| Blog / freshness | ❌ None | ✅ Weekly, bilingual |
| Search Console verified | ⚠️ `googlee4f800ba18ad58cf.html` present — Google only | ✅ Google + Facebook + Twitter |
| Uzbek-language content | ❌ Not indexable | ⚠️ ~10 posts, since July 2026 |
| Published pricing | ❌ | ❌ **← open field** |

---

## 4. Recommended fix — architecture

### Option A — Migrate to Next.js (recommended)

Your site is an 8-route brochure site with fully static product data in `src/product-data.js`. This is the ideal Next.js static-export candidate.

- `next build` with `output: 'export'` produces pre-rendered HTML per route per locale
- Built-in i18n routing gives you `/uz/`, `/ru/`, `/en/` for free
- `next/image` handles WebP/AVIF conversion, responsive `srcset`, and lazy loading automatically — this alone fixes issues 12, 13 and 14
- Metadata API generates per-page `<title>`, description, OG, canonical and hreflang at build time

**Effort:** 3–5 days. Your components are plain React; the work is routing, i18n, and swapping `<img>` for `next/image`.

### Option B — Prerender the existing CRA (fast path)

If you need results this week:

```bash
npm i --save-dev react-snap
npm i react-helmet-async
```

```jsonc
// package.json
"scripts": {
  "build": "react-scripts --openssl-legacy-provider build",
  "postbuild": "react-snap"
},
"reactSnap": {
  "include": [
    "/uz", "/uz/products", "/uz/products/grilyato", "/uz/products/metalarmstrong",
    "/uz/products/gypsumarmstrong", "/uz/products/washingarmstrong",
    "/uz/products/slatceiling", "/uz/products/hexagon-wall-decor",
    "/uz/products/t-profil", "/uz/products/l-profil", "/uz/products/stringer",
    "/uz/products/suspension",
    "/uz/projects", "/uz/architects", "/uz/about", "/uz/contact", "/uz/faq",
    "/ru", "/ru/products", "/ru/products/grilyato",
    "/en", "/en/products", "/en/products/grilyato"
  ]
}
```

Then swap `ReactDOM.createRoot` for `hydrateRoot` when `#root` already has children.

**Effort:** 1–2 days. **Caveat:** react-snap is lightly maintained and brittle with React 19. Treat it as a stopgap, not a destination.

**Recommendation:** Do Option A. You will otherwise pay for Option B twice.

---

## 5. URL and language architecture

Adopt explicit locale prefixes, Uzbek as the default:

```
https://veroceilings.uz/          → 301 → /uz/
https://veroceilings.uz/uz/       ← Uzbek (default, x-default)
https://veroceilings.uz/ru/       ← Russian
https://veroceilings.uz/en/       ← English
```

### Localised slugs

| Product | Uzbek | Russian | English |
|---|---|---|---|
| Grilyato | `/uz/shiftlar/grilyato-shift` | `/ru/potolki/potolok-grilyato` | `/en/ceilings/grilyato-ceiling` |
| Metal Armstrong | `/uz/shiftlar/metall-armstrong-shift` | `/ru/potolki/metallicheskiy-armstrong` | `/en/ceilings/metal-armstrong` |
| Gypsum Armstrong | `/uz/shiftlar/gipsli-armstrong-shift` | `/ru/potolki/gipsovyy-armstrong` | `/en/ceilings/gypsum-armstrong` |
| Washable Armstrong | `/uz/shiftlar/yuviladigan-armstrong-shift` | `/ru/potolki/moyushchiysya-armstrong` | `/en/ceilings/washable-armstrong` |
| Slat ceiling | `/uz/shiftlar/reykali-shift` | `/ru/potolki/reechnyy-potolok` | `/en/ceilings/slat-ceiling` |
| Hexagon decor | `/uz/shiftlar/olti-burchakli-devor-dekori` | `/ru/potolki/shestigrannyy-dekor` | `/en/ceilings/hexagon-wall-decor` |
| T-profile | `/uz/aksessuarlar/t-profil` | `/ru/aksessuary/t-profil` | `/en/accessories/t-profile` |
| L-profile | `/uz/aksessuarlar/l-profil` | `/ru/aksessuary/l-profil` | `/en/accessories/l-profile` |
| Stringer | `/uz/aksessuarlar/stringer` | `/ru/aksessuary/stringer` | `/en/accessories/stringer` |
| Suspension | `/uz/aksessuarlar/osma-tizim` | `/ru/aksessuary/podveska` | `/en/accessories/suspension` |

Keep `/products/:id` alive as a **301 redirect** to the Uzbek equivalent so any existing links and index entries are preserved.

### hreflang block (every page)

```html
<link rel="alternate" hreflang="uz" href="https://veroceilings.uz/uz/shiftlar/grilyato-shift" />
<link rel="alternate" hreflang="ru" href="https://veroceilings.uz/ru/potolki/potolok-grilyato" />
<link rel="alternate" hreflang="en" href="https://veroceilings.uz/en/ceilings/grilyato-ceiling" />
<link rel="alternate" hreflang="x-default" href="https://veroceilings.uz/uz/shiftlar/grilyato-shift" />
<link rel="canonical" href="https://veroceilings.uz/uz/shiftlar/grilyato-shift" />
```

Also add a **visible** language switcher that links to real URLs (`<a href="/ru/...">`), not a `localStorage` toggle. Crawlers follow links; they do not click JavaScript switchers.

---

## 6. Keyword map

### 6.1 Uzbek — Priority 1

Almost no manufacturer competes here properly. This is where you win first.

**Head terms**

| Keyword | Target URL |
|---|---|
| grilyato shift | `/uz/shiftlar/grilyato-shift` |
| grilyato shift narxi | same |
| osma shift / osma shiftlar | `/uz/shiftlar/` |
| armstrong shift | `/uz/shiftlar/metall-armstrong-shift` |
| armstrong shift narxi | same |
| reykali shift | `/uz/shiftlar/reykali-shift` |
| metall shift | `/uz/shiftlar/` |
| akustik shift | `/uz/shiftlar/gipsli-armstrong-shift` |
| shift panellari | `/uz/shiftlar/` |
| Toshkentda osma shift | `/uz/` |

**Long-tail / commercial intent**

- `grilyato shift narxi m2` — pricing page
- `grilyato 100x100 narxi`, `grilyato 150x150`, `grilyato 200x200` — variant sections
- `osma shift o'rnatish narxi` — installation page
- `grilyato shiftni o'rnatish` — installation guide (you already have an `InstallationGuide` component — use it)
- `ofis uchun osma shift` — application page
- `savdo markazi uchun shift` — application page
- `armstrong shift o'lchamlari` — spec page
- `grilyato va armstrong farqi` — comparison article
- `namlikka chidamli shift` — washable Armstrong
- `yong'inga chidamli shift` — fire safety article
- `shift zavodi O'zbekiston` — about/manufacturing page

**Regional geo-modifiers** (near-zero competition):
`Samarqandda osma shift`, `Farg'onada grilyato`, `Buxoroda armstrong shift`, `Namanganda osma shift`, `Andijonda shift`, `Nukusda osma shift`

### 6.2 Russian — Priority 2

Higher search volume than Uzbek, but ecolit.uz and the marketplaces are entrenched. Expect a longer climb.

**Head terms**

| Keyword | Target URL |
|---|---|
| купить грильято | `/ru/potolki/potolok-grilyato` |
| потолок грильято Ташкент | same |
| грильято цена | pricing page |
| подвесные потолки Ташкент | `/ru/potolki/` |
| потолок армстронг цена | `/ru/potolki/metallicheskiy-armstrong` |
| реечный потолок Ташкент | `/ru/potolki/reechnyy-potolok` |
| потолки от производителя Узбекистан | `/ru/o-proizvodstve` |
| металлические потолки Ташкент | `/ru/potolki/` |
| акустические потолки | `/ru/potolki/gipsovyy-armstrong` |

**Long-tail / commercial intent**

- `грильято 100х100 купить`, `грильято 150х150`, `грильято 200х200`
- `грильято цена за м2 Ташкент`
- `сколько стоит потолок грильято`
- `грильято пирамидальный` *(agraf.uz ranks on this — worth a dedicated section)*
- `монтаж потолка грильято`
- `грильято или армстронг что лучше` — comparison article
- `подвесной потолок для офиса`
- `потолок для торгового центра`
- `влагостойкий потолок для кухни`
- `растровые светильники в грильято`
- `Т-профиль для подвесного потолка`
- `подвес для потолка армстронг цена`

**Regional:** `грильято Самарканд`, `подвесные потолки Фергана`, `армстронг Бухара`, `потолки Наманган`

**Direct competitive targets — pages where ecolit is weak or absent:**

- `реечный потолок Ташкент цена` — their `/reechnye-potolki/` page has no body content
- `сайдинг потолок` — same
- any query containing `цена` or `стоимость` — they publish no prices at all

### 6.3 English — Priority 3

Low local volume; useful for international/architect enquiries and brand searches.

`grilyato ceiling`, `suspended ceiling Uzbekistan`, `metal ceiling manufacturer Uzbekistan`, `armstrong ceiling supplier Tashkent`, `open cell ceiling`, `baffle ceiling Uzbekistan`

Keep English thin and functional. Do not spend content budget here.

---

## 7. On-page templates

### 7.1 Title / description formulas

Follow ecolit's proven pattern: **[keyword] + [geo] + [modifier] + [brand]**, 50–60 characters.

**Uzbek**

```
Grilyato shift Toshkentda — Narxi va o'lchamlari | Vero Ceilings
Toshkent va butun O'zbekiston bo'ylab grilyato osma shiftlar. Ishlab
chiqaruvchidan to'g'ridan-to'g'ri narxlar, 75x75 dan 200x200 mm gacha
o'lchamlar, 20 yil kafolat. Bepul hisob-kitob.
```

**Russian**

```
Потолок Грильято в Ташкенте — Цена за м² от производителя | Vero
Купить потолок Грильято в Ташкенте напрямую от производителя.
Ячейки 75х75, 100х100, 150х150, 200х200 мм. Гарантия 20 лет.
Доставка по всему Узбекистану. Бесплатный расчёт.
```

**English**

```
Grilyato Open Cell Ceiling — Manufacturer in Uzbekistan | Vero Ceilings
```

Also add, on every page:

```html
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
```

This is how ecolit gets larger SERP thumbnails and longer snippets. It costs you nothing.

### 7.2 Heading structure — one `<h1>` per page

For `/uz/shiftlar/grilyato-shift`:

```
h1  Grilyato osma shiftlar — Toshkentda ishlab chiqaruvchidan
  h2  Grilyato shift nima va u qanday ishlaydi?
  h2  Texnik xususiyatlar
    h3  Grilyato 75x75 mm
    h3  Grilyato 100x100 mm
    h3  Grilyato 150x150 mm
    h3  Grilyato 200x200 mm
  h2  Grilyato shift narxi (m² uchun)
  h2  Qo'llanilish sohalari
    h3  Savdo markazlari va avtosalonlar
    h3  Ofislar va biznes markazlar
    h3  Aeroportlar va vokzallar
    h3  Restoran va kafelar
  h2  O'rnatish bo'yicha qo'llanma
  h2  Grilyato va Armstrong: qaysi birini tanlash kerak?
  h2  Bizning loyihalarimiz
  h2  Ko'p so'raladigan savollar
```

Target **1,200–2,000 words per product page, per language.** Your current 150 characters cannot compete with 2,000+ words.

### 7.3 Content to add that ecolit does not have

1. **A published price table.** Per m², per cell size, per colour. Even a "from X so'm" range. This is the highest-intent query class in the category and both ecolit and agraf have conceded it.
2. **An interactive m² calculator.** Enter room dimensions → get panel count, T-profile metres, L-profile metres, suspension count, and an estimated price. Enormous dwell-time and link-magnet value.
3. **Downloadable spec sheets and DWG/CAD blocks** for architects. You already have `/architects` and `public/catalog.pdf` — build this out. Architects link to CAD resources, and those links are exactly the backlinks you need.
4. **Real project case studies with named objects.** You have 50+ gallery photos sitting unused in `src/assets/images/project gallery/`. Each becomes a page: object type, city, m², product used, photos, and a short write-up. Ecolit is doing precisely this and it is working.
5. **A fire-safety and certification page.** КМ-0 class, hygiene certificates, applicability to clinics/schools/kitchens. Ecolit leans on this heavily and it converts B2B buyers.

### 7.4 Alt text

Replace `ProductDetails.js` line 55:

```jsx
// before
alt={`${t(`products.${product.id}.title`)} ${index + 1}`}

// after — add per-image alt strings to the i18n files
alt={t(`products.${product.id}.image_alts.${index}`, {
  defaultValue: `${t(`products.${product.id}.title`)} — Vero Ceilings Toshkent`
})}
```

Example Uzbek alt strings for Grilyato:

```json
"image_alts": [
  "Grilyato osma shift 100x100 mm oq rangda — Vero Ceilings",
  "Qora grilyato shift savdo markazida — Toshkent"
]
```

---

## 8. Structured data (JSON-LD)

Add all of the following. None currently exist.

**Organization + LocalBusiness** — site-wide, in the layout:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vero Ceilings",
  "url": "https://veroceilings.uz",
  "logo": "https://veroceilings.uz/logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toshkent",
    "addressCountry": "UZ"
  },
  "areaServed": "UZ",
  "sameAs": ["<telegram>", "<instagram>", "<facebook>"]
}
```

**Product** — on every product page, with `offers.priceCurrency: "UZS"` if you publish prices.

**BreadcrumbList** — you already render breadcrumbs in `PageHeader`; add the matching JSON-LD.

**FAQPage** — you already have a `FAQ` component and `faq` keys in the i18n files. Wire up FAQPage schema on both `/faq` and each product page. This is the single cheapest rich-result win available to you.

**ImageObject** — via `<image:image>` entries in the sitemap.

---

## 9. Files to create

### `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://veroceilings.uz/sitemap.xml
```

### `public/sitemap.xml`

Generate at build time. Every URL × 3 locales, each with `<xhtml:link rel="alternate" hreflang="...">` entries and accurate `<lastmod>`.

### `public/manifest.json`

```json
{
  "short_name": "Vero Ceilings",
  "name": "Vero Ceilings — Osma shift tizimlari",
  "icons": [
    { "src": "/android-chrome-192x192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/favicon-32x32.png", "type": "image/png", "sizes": "32x32" }
  ],
  "start_url": "/uz/",
  "display": "standalone",
  "theme_color": "#ffffff",
  "background_color": "#ffffff"
}
```

(The current file references `logo192.png` and `logo512.png`, neither of which exists in `public/`.)

---

## 10. Image optimisation — do this regardless of stack

65 MB of assets with a 9.6 MB hero image will fail Core Web Vitals on any architecture.

```bash
# convert everything to WebP at quality 82
find src/assets/images -type f \( -name '*.jpg' -o -name '*.png' \) \
  -exec sh -c 'cwebp -q 82 "$1" -o "${1%.*}.webp"' _ {} \;

# cap hero/slider images at 1920px wide
mogrify -resize '1920x>' src/assets/images/slider/*

# delete Windows artefacts
find src/assets -name 'thumbs.db' -delete
```

Expected result: **65 MB → roughly 6–8 MB**. Add `loading="lazy"` to every image below the fold and `fetchpriority="high"` to the hero only. If you migrate to Next.js, `next/image` does all of this automatically.

---

## 11. Off-page and local SEO

1. **Google Business Profile** — create and verify. Categories: "Ceiling supplier", "Manufacturer". Post project photos weekly. This is how you appear in the local map pack, which sits above organic results.
2. **Yandex Webmaster + Yandex Business** — non-negotiable for the Russian-language segment in Uzbekistan. Ecolit has Google verification but no visible Yandex verification; you can get ahead here.
3. **Marketplace listings** — Prom.uz, Glotr.uz, Flagma.uz, Stroyka.uz, Vibo.uz. Each gives a backlink plus direct enquiries. Marketplaces already own these SERPs; join them rather than only fighting them.
4. **Uzbek business directories** — Golden Pages UZ, Uzbekistan Yellow Pages, olx.uz business account.
5. **Architect and construction portals** — the CAD/DWG downloads from §7.3 are your natural link bait.
6. **Telegram** — a primary B2B channel in Uzbekistan. Post project photos with links back. Requires working OG tags (issue 9) to render properly.

---

## 12. Prioritised roadmap

### Week 1 — Make the site indexable *(without this, nothing else matters)*

- [ ] Choose architecture: Next.js migration (recommended) or react-snap prerender
- [ ] Implement `/uz/`, `/ru/`, `/en/` routing; `/` → 301 → `/uz/`
- [ ] Per-page `<title>` and `<meta description>` in the served HTML, all three languages
- [ ] Canonical + hreflang on every page
- [ ] Open Graph + Twitter Card tags
- [ ] `robots.txt` with `Sitemap:` directive
- [ ] Generate `sitemap.xml` with hreflang alternates
- [ ] Fix `manifest.json`
- [ ] Return a real 404 for unknown paths
- [ ] Replace the `localStorage` language switcher with real `<a href>` links

### Week 2 — Performance and structure

- [ ] Convert all images to WebP, cap at 1920px, delete `thumbs.db`
- [ ] `loading="lazy"` everywhere below the fold
- [ ] One `<h1>` per page; fix `Home.js`, `Products.js`, `Projects.js`, `Contact.js`
- [ ] Keyword-rich alt text for all 219 images, per language
- [ ] Localised URL slugs with 301s from the old `/products/:id` paths
- [ ] JSON-LD: Organization, Product, BreadcrumbList, FAQPage
- [ ] Verify in Google Search Console **and Yandex Webmaster**; submit sitemaps

### Weeks 3–4 — Uzbek content offensive *(your competitive edge)*

- [ ] Expand all 10 product pages to 1,200–2,000 words in Uzbek
- [ ] Publish the price page + m² calculator
- [ ] 6–8 project case studies from the existing gallery photos
- [ ] Comparison article: `Grilyato va Armstrong farqi`
- [ ] Installation guide: `Grilyato shiftni o'rnatish bo'yicha qo'llanma`
- [ ] Fire safety / certification page
- [ ] Regional landing pages: Samarqand, Farg'ona, Buxoro, Namangan, Andijon

### Weeks 5–8 — Russian content and off-page

- [ ] Port and adapt all Uzbek content to Russian (adapt — do not machine-translate)
- [ ] Russian regional landing pages
- [ ] Target ecolit's weak pages: `реечный потолок цена`, `сайдинг потолок`
- [ ] Google Business Profile + Yandex Business
- [ ] Marketplace listings on all five platforms
- [ ] CAD/DWG library for architects
- [ ] Begin weekly bilingual project posts

### Ongoing

- [ ] 2–4 posts per month, Uzbek first, Russian second
- [ ] Monthly rank tracking on both Google and Yandex
- [ ] Quarterly Core Web Vitals review

---

## 13. Realistic expectations

| Milestone | Timeline |
|---|---|
| Pages begin appearing in the index at all | 1–3 weeks after the rendering fix |
| Ranking for brand + long-tail Uzbek terms | 4–8 weeks |
| Page 1 for low-competition Uzbek terms (`grilyato shift narxi`, regional variants) | 2–4 months |
| Page 1 for competitive Russian terms (`купить грильято`, `потолок грильято Ташкент`) | 6–12 months |
| Outranking ecolit.uz on their core Russian terms | 12+ months, and only with sustained content and link building |

**One honest note on priority.** You asked for Uzbek first, and that ordering is correct *tactically* — it is where the gap is and where you will see movement fastest. But be aware that Russian-language search volume for these B2B construction terms in Uzbekistan is substantially higher than Uzbek. Uzbek is the low-competition beachhead; Russian is where the revenue ultimately is. Build Uzbek first to establish momentum and domain authority, then port everything to Russian — but do not stop at Uzbek.

**And the one-line version:** your site currently serves an empty `<title>` and no body text to every crawler that visits. Fix that first. Everything else in this document is secondary.
