"use client";
import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import type { Slide } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Download from "yet-another-react-lightbox/plugins/download";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface Props {
  images: {
    url: string;
    alt: string;
    mediaType?: string;
    videoUrl?: string;
  }[];
}

export default function GalleryLightbox({ images }: Props) {
  const [index, setIndex] = useState(-1);

  // Convert our data structure to lightbox slides
  const slides: Slide[] = images.map((img): Slide => {
    if (img.mediaType === "video" && img.videoUrl) {
      return {
        type: "video",
        poster: img.url,
        sources: [
          {
            src: img.videoUrl,
            type: "video/mp4", // Or detect from extension
          },
        ],
      };
    }

    return {
      src: img.url,
      alt: img.alt,
    };
  });

  return (
    <>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1.5rem",
      }}>
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className="hover-card"
            style={{
              position: "relative",
              aspectRatio: "4/3",
              overflow: "hidden",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s"
            }}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
            {img.mediaType === "video" && (
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.2)"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white"
                }}>
                  ▶
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom, Fullscreen, Thumbnails, Video, Download]}
        carousel={{ padding: "50px" }}
      />
    </>
  );
}
