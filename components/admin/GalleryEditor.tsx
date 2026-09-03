"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { uploadMediaAction } from "@/lib/actions/media";
import { compressImage } from "@/lib/image-compress";
import { Loader2, Upload, Trash2 } from "lucide-react";

export interface GalleryItem {
  src: string;
  alt_uz: string;
  alt_ru: string;
  alt_en: string;
}

interface Props {
  name: string;
  initialItems: GalleryItem[];
  label: string;
}

export default function GalleryEditor({ name, initialItems, label }: Props) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uid = useId();

  async function handleAdd(file: File) {
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
    setItems((prev) => [...prev, { src: result.url, alt_uz: "", alt_ru: "", alt_en: "" }]);
  }

  function updateAlt(index: number, field: keyof GalleryItem, value: string) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [field]: value } : it)));
  }

  function remove(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="admin-field-label">{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(items)} />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "0.75rem" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center", padding: "0.6rem", border: "1px solid var(--color-border)", borderRadius: "8px" }}>
            <div style={{ position: "relative", width: "56px", height: "56px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: "#f0f0f0" }}>
              <Image src={item.src} alt="" fill sizes="56px" style={{ objectFit: "cover" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", flex: 1 }}>
              <input className="admin-input" placeholder="Alt (UZ)" value={item.alt_uz} onChange={(e) => updateAlt(i, "alt_uz", e.target.value)} />
              <input className="admin-input" placeholder="Alt (RU)" value={item.alt_ru} onChange={(e) => updateAlt(i, "alt_ru", e.target.value)} />
              <input className="admin-input" placeholder="Alt (EN)" value={item.alt_en} onChange={(e) => updateAlt(i, "alt_en", e.target.value)} />
            </div>
            <button type="button" onClick={() => remove(i)} style={{ background: "transparent", border: "1px solid #fee2e2", padding: "0.4rem", borderRadius: "4px", cursor: "pointer", color: "#ef4444", flexShrink: 0 }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <label htmlFor={uid} className="btn-secondary" style={{ cursor: "pointer", fontSize: "0.85rem", padding: "0.5rem 0.9rem", display: "inline-flex" }}>
        {pending ? <Loader2 size={16} className="admin-spin" /> : <Upload size={16} />}
        {pending ? "Yuklanmoqda..." : "Rasm qo'shish"}
      </label>
      <input
        id={uid}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleAdd(file);
          e.target.value = "";
        }}
      />
      {error && <p style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "0.4rem" }}>{error}</p>}
      <style>{`
        .admin-input { padding: 0.45rem 0.6rem; border: 1px solid var(--color-border); border-radius: 6px; font-size: 0.82rem; }
        .admin-spin { animation: admin-spin 0.9s linear infinite; }
        @keyframes admin-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
