"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  images: { src: string; alt: string }[];
}

export default function ApplicationCasesSwiper({ images }: Props) {
  if (images.length === 0) return null;

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={30}
      slidesPerView={3}
      pagination={{ clickable: true }}
      className="application-cases-swiper"
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 10 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: "cover", borderRadius: "8px" }} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
