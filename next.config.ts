import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
  async redirects() {
    return [
      { source: "/", destination: "/uz", permanent: true },
      { source: "/products", destination: "/uz/products", permanent: true },
      { source: "/products/:path*", destination: "/uz/products/:path*", permanent: true },
      { source: "/projects", destination: "/uz/projects", permanent: true },
      { source: "/about", destination: "/uz/about", permanent: true },
      { source: "/contact", destination: "/uz/contact", permanent: true },
      { source: "/faq", destination: "/uz/faq", permanent: true },
      { source: "/calculator", destination: "/uz/calculator", permanent: true },
      { source: "/architects", destination: "/uz/architects", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
