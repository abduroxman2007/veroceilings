import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { INK } from "./palette";

interface Props {
  label: string;
  value: number | string;
  /** Previous-period value; omit for counts where a trend is meaningless. */
  previous?: number;
  hint?: string;
  accent?: string;
}

/**
 * A hero number, not a chart — magnitude with no shape to it. The delta chip
 * pairs an arrow icon with a signed number so direction never rides on colour
 * alone.
 */
export default function StatTile({ label, value, previous, hint, accent }: Props) {
  let delta: number | null = null;
  if (typeof previous === "number" && typeof value === "number") {
    if (previous === 0) delta = value > 0 ? 100 : 0;
    else delta = Math.round(((value - previous) / previous) * 100);
  }

  const up = delta !== null && delta > 0;
  const down = delta !== null && delta < 0;
  const deltaColor = up ? "#0ca30c" : down ? "#d03b3b" : INK.muted;
  const DeltaIcon = up ? ArrowUpRight : down ? ArrowDownRight : Minus;

  return (
    <div className="admin-stat-tile">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: INK.muted }}>
          {label}
        </span>
        {accent && <span style={{ width: 8, height: 8, borderRadius: 999, background: accent, flexShrink: 0, marginTop: 4 }} />}
      </div>

      <div style={{ fontSize: "1.9rem", fontWeight: 800, color: INK.primary, lineHeight: 1.1, marginTop: "0.5rem", fontVariantNumeric: "tabular-nums" }}>
        {typeof value === "number" ? value.toLocaleString("ru-RU") : value}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginTop: "0.4rem", minHeight: 18 }}>
        {delta !== null && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontSize: "0.75rem", fontWeight: 700, color: deltaColor }}>
            <DeltaIcon size={13} aria-hidden />
            {delta > 0 ? "+" : ""}{delta}%
          </span>
        )}
        {hint && <span style={{ fontSize: "0.75rem", color: INK.muted }}>{hint}</span>}
      </div>
    </div>
  );
}
