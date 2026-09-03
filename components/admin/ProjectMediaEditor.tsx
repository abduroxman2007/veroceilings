"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { uploadMediaAction } from "@/lib/actions/media";
import { compressImage } from "@/lib/image-compress";
import { Loader2, Upload, Trash2, ArrowUp, ArrowDown, Video as VideoIcon } from "lucide-react";

export interface ProjectMediaItem {
  url: string;
  type: "image" | "video";
  alt?: string;
  sort_order: number;
}

interface Props {
  name: string;
  initialItems: ProjectMediaItem[];
  label: string;
}

export default function ProjectMediaEditor({ name, initialItems, label }: Props) {
  const [items, setItems] = useState<ProjectMediaItem[]>(
    [...initialItems].sort((a, b) => a.sort_order - b.sort_order)
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uid = useId();

  function withOrder(list: ProjectMediaItem[]) {
    return list.map((it, i) => ({ ...it, sort_order: i }));
  }

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
    const type: "image" | "video" = file.type.startsWith("video/") ? "video" : "image";
    setItems((prev) => withOrder([...prev, { url: result.url, type, alt: "", sort_order: 0 }]));
  }

  function updateAlt(index: number, value: string) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, alt: value } : it)));
  }

  function remove(index: number) {
    setItems((prev) => withOrder(prev.filter((_, i) => i !== index)));
  }

  function move(index: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return withOrder(next);
    });
  }

  return (
    <div>
      <label className="admin-field-label">{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(items)} />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "0.75rem" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center", padding: "0.6rem", border: "1px solid var(--color-border)", borderRadius: "8px" }}>
            <div style={{ position: "relative", width: "64px", height: "64px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: "#111" }}>
              {item.type === "video" ? (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                  <VideoIcon size={22} />
                </div>
              ) : (
                <Image src={item.url} alt="" fill sizes="64px" style={{ objectFit: "cover" }} />
              )}
            </div>
            <input
              className="admin-input"
              style={{ flex: 1 }}
              placeholder="Tavsif (ixtiyoriy)"
              value={item.alt ?? ""}
              onChange={(e) => updateAlt(i, e.target.value)}
            />
            <div style={{ display: "flex", gap: "0.25rem", flexShrink: 0 }}>
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="admin-icon-btn"><ArrowUp size={14} /></button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="admin-icon-btn"><ArrowDown size={14} /></button>
              <button type="button" onClick={() => remove(i)} style={{ background: "transparent", border: "1px solid #fee2e2", padding: "0.4rem", borderRadius: "4px", cursor: "pointer", color: "#ef4444" }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <label htmlFor={uid} className="btn-secondary" style={{ cursor: "pointer", fontSize: "0.85rem", padding: "0.5rem 0.9rem", display: "inline-flex" }}>
        {pending ? <Loader2 size={16} className="admin-spin" /> : <Upload size={16} />}
        {pending ? "Yuklanmoqda..." : "Rasm yoki video qo'shish"}
      </label>
      <input
        id={uid}
        type="file"
        accept="image/*,video/*"
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
        .admin-icon-btn { background: transparent; border: 1px solid var(--color-border); padding: 0.4rem; border-radius: 4px; cursor: pointer; color: var(--color-primary); }
        .admin-icon-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .admin-spin { animation: admin-spin 0.9s linear infinite; }
        @keyframes admin-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
