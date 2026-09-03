"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { uploadMediaAction } from "@/lib/actions/media";
import { compressImage } from "@/lib/image-compress";
import { Loader2, Upload } from "lucide-react";

interface Props {
  name: string;
  initialUrl?: string;
  label: string;
}

export default function SingleImageUploader({ name, initialUrl, label }: Props) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uid = useId();

  async function handleFile(file: File) {
    setPending(true);
    setError(null);
    const compressed = await compressImage(file);
    const fd = new FormData();
    fd.set("file", compressed);
    const result = await uploadMediaAction(fd);
    setPending(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    setUrl(result.url);
  }

  return (
    <div>
      <label htmlFor={uid} className="admin-field-label">{label}</label>
      <input type="hidden" name={name} value={url} />
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {url && (
          <div style={{ position: "relative", width: "80px", height: "80px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: "#f0f0f0" }}>
            <Image src={url} alt="" fill sizes="80px" style={{ objectFit: "cover" }} />
          </div>
        )}
        <label
          htmlFor={uid}
          className="btn-secondary"
          style={{ cursor: "pointer", fontSize: "0.85rem", padding: "0.5rem 0.9rem" }}
        >
          {pending ? <Loader2 size={16} className="admin-spin" /> : <Upload size={16} />}
          {pending ? "Yuklanmoqda..." : url ? "Almashtirish" : "Rasm tanlash"}
        </label>
        <input
          id={uid}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
      {error && <p style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "0.4rem" }}>{error}</p>}
      <style>{`.admin-spin { animation: admin-spin 0.9s linear infinite; } @keyframes admin-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
