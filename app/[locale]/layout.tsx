import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/db/site-settings";
import JsonLd from "@/components/seo/JsonLd";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import { organizationSchema, webSiteSchema } from "@/lib/seo/schema";
import "./globals.css";

type Props = { params: Promise<{ locale: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {

  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  // No real Yandex Webmaster token exists yet — verify domain ownership at
  // https://webmaster.yandex.com first, then set this env var. Until then the
  // key is omitted entirely rather than rendering an empty/fake meta tag.
  const yandexVerification = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;

  return {
    metadataBase: new URL("https://veroceilings.uz"),
    title: {
      default: t("title"),
      template: `%s | Vero Ceilings`,
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Vero Ceilings", url: "https://veroceilings.uz" }],
    openGraph: {
      type: "website",
      locale: locale,
      url: `https://veroceilings.uz/${locale}`,
      siteName: "Vero Ceilings",
      title: t("title"),
      description: t("description"),
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vero Ceilings — Osma shift ishlab chiqaruvchisi" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: "googlee4f800ba18ad58cf",
      ...(yandexVerification ? { other: { "yandex-verification": yandexVerification } } : {}),
    },
    manifest: "/manifest.json",
    alternates: {
      canonical: `https://veroceilings.uz/${locale}`,
      languages: {
        uz: "https://veroceilings.uz/uz",
        ru: "https://veroceilings.uz/ru",
        en: "https://veroceilings.uz/en",
        "x-default": "https://veroceilings.uz/uz",
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "uz" | "ru" | "en")) {
    notFound();
  }

  const messages = await getMessages();
  const settings = await getSiteSettings();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <JsonLd schema={organizationSchema(settings, locale as "uz" | "ru" | "en")} />
        <JsonLd schema={webSiteSchema(locale as "uz" | "ru" | "en")} />
        <NextIntlClientProvider messages={messages}>
          <PageViewTracker locale={locale} />
          <Navbar phone={settings.phone_primary} />
          <main className="min-h-screen">{children}</main>
          <Footer locale={locale} settings={settings} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
