"use client";

import { INK } from "./palette";
import type { NameCount } from "@/lib/db/analytics";

interface Props {
  data: NameCount[];
  /** One colour per row, or a single colour for the whole set. */
  colors: string[] | string;
  emptyLabel: string;
  /** Optional lookup for pretty-printing row labels. */
  labels?: Record<string, string>;
}

/**
 * Horizontal ranked bars, hand-built rather than pulled from a chart library:
 * at this size the bar IS the layout, and a plain grid gives exact control over
 * the label/value columns.
 *
 * Every row carries its value as text. That's the relief the palette validation
 * requires (two categorical slots sit below 3:1 on white), and it also means
 * these read correctly in grayscale or for a colourblind viewer — the bar
 * length and the printed number carry the magnitude, colour only carries
 * identity.
 */
export default function RankedBars({ data, colors, emptyLabel, labels }: Props) {
  if (data.length === 0) {
    return (
      <p style={{ color: INK.muted, fontSize: "0.85rem", margin: "0.5rem 0 0" }}>{emptyLabel}</p>
    );
  }

  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", marginTop: "0.25rem" }}>
      {data.map((row, i) => {
        const color = typeof colors === "string" ? colors : colors[i % colors.length];
        const pct = Math.max((row.value / max) * 100, 2);
        return (
          <div key={row.name} style={{ display: "grid", gridTemplateColumns: "minmax(90px, 34%) 1fr auto", alignItems: "center", gap: "0.75rem" }}>
            <span
              title={row.name}
              style={{ fontSize: "0.8rem", color: INK.secondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
              {labels?.[row.name] ?? row.name}
            </span>
            <span style={{ display: "block", height: 10, background: "#f1f1ef", borderRadius: 999 }}>
              <span
                style={{
                  display: "block",
                  width: `${pct}%`,
                  height: "100%",
                  background: color,
                  borderRadius: 999,
                }}
              />
            </span>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: INK.primary, fontVariantNumeric: "tabular-nums", minWidth: 28, textAlign: "right" }}>
              {row.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
