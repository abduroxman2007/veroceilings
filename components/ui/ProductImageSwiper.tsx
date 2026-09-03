"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  images: { src: string; alt: string }[];
}

export default function ProductImageSwiper({ images }: Props) {
  if (images.length === 0) return null;

  return (
    <Swiper modules={[Pagination]} spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }} className="product-details-swiper">
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "contain", borderRadius: "8px" }}
              priority={i === 0}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
