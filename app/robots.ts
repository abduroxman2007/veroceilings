import { MetadataRoute } from "next";

// Crawlers we explicitly welcome. Each gets its own group so it still inherits
// the /admin + /api disallow — a bare "Allow: /" group would override the
// wildcard rule and let that bot walk straight into the admin panel.
const WELCOMED_BOTS = [
  // Search engines — Yandex matters as much as Google in UZ/CIS
  "Googlebot",
  "Yandex",
  "Bingbot",
  // AI search & retrieval engines (AIO / GEO visibility)
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Applebot",
  "Google-Extended",
];

const DISALLOW = ["/admin", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...WELCOMED_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: DISALLOW })),
    ],
    sitemap: "https://veroceilings.uz/sitemap.xml",
    host: "https://veroceilings.uz",
  };
}
