"use client";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import type { HeroSlide } from "@/lib/db/hero-slides";

interface Props {
  locale: string;
  slides: HeroSlide[];
  phone: string;
}

export default function HeroSlider({ locale, slides, phone }: Props) {
  const localeKey = locale as "uz" | "ru" | "en";
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <section
      aria-label="Hero"
      style={{ position: "relative", marginTop: "0", height: "100vh", minHeight: "600px", maxHeight: "900px" }}
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        style={{ height: "100%", width: "100%" }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div style={{ position: "relative", height: "100%", width: "100%" }}>
              {/* Background image */}
              <Image
                src={slide.image_url}
                alt={slide[`title_${localeKey}`]}
                fill
                priority={i === 0}
                style={{ objectFit: "cover" }}
                sizes="100vw"
              />
              {/* Overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(13,13,26,0.85) 0%, rgba(13,13,26,0.45) 60%, rgba(13,13,26,0.2) 100%)",
              }} />
              {/* Content */}
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                padding: "0 1.5rem",
              }}>
                <div style={{ maxWidth: "var(--container-max)", width: "100%", margin: "0 auto" }}>
                  <div style={{ maxWidth: "680px", animation: "fadeInUp 0.8s ease both" }}>
                    <p style={{
                      color: "var(--color-accent)",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                    }}>
                      Vero Ceilings — {locale === "uz" ? "Toshkent, O'zbekiston" : locale === "ru" ? "Ташкент, Узбекистан" : "Tashkent, Uzbekistan"}
                    </p>
                    <h2 style={{
                      color: "white",
                      fontSize: "clamp(1.5rem, 3.9vw, 2.8rem)",
                      fontWeight: "900",
                      lineHeight: "1.15",
                      marginBottom: "1.25rem",
                      textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                    }}>
                      {slide[`title_${localeKey}`]}
                    </h2>
                    <p style={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "clamp(0.9rem, 1.7vw, 1.05rem)",
                      lineHeight: "1.6",
                      marginBottom: "2rem",
                      maxWidth: "560px",
                    }}>
                      {slide[`text_${localeKey}`]}
                    </p>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      <Link href={`/${locale}${slide.link_href}`} className="btn-primary">
                        {slide[`button_${localeKey}`]}
                      </Link>
                      <a
                        href={phoneHref}
                        className="btn-outline-white"
                      >
                        📞 {phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.25rem",
        color: "rgba(255,255,255,0.6)",
        fontSize: "0.7rem",
        letterSpacing: "0.1em",
      }}>
        <span style={{ animation: "pulse 2s infinite" }}>▼</span>
      </div>
    </section>
  );
}
