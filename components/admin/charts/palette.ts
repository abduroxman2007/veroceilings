/**
 * Chart palette.
 *
 * Categorical slots are the validated reference order, checked against this
 * dashboard's real surface (white cards, #ffffff) rather than a generic one:
 *   node scripts/validate_palette.js "#2a78d6,#eb6834,#1baf7a,#eda100" \
 *     --mode light --surface "#ffffff"
 * → lightness band PASS, chroma floor PASS, CVD separation PASS (worst
 *   adjacent ΔE 9.1), normal-vision floor PASS (worst adjacent ΔE 22.9),
 *   contrast WARN on aqua (2.82) and yellow (2.17).
 *
 * That contrast warning is not dismissable — it obligates relief. Every chart
 * here ships visible value labels or an adjacent count, so identity and
 * magnitude are never carried by hue alone.
 *
 * Assign slots in fixed order and never cycle them: a series keeps its colour
 * when a filter changes the series count.
 */
export const SERIES = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100"] as const;

/**
 * Status colours are reserved and never reused as a categorical slot, so a
 * status can't impersonate a series. Paired with a visible label everywhere,
 * since two of these sit below 3:1 on a light surface by design.
 */
export const STATUS: Record<string, string> = {
  NEW: "#2a78d6",
  CONTACTED: "#fab219",
  QUOTED: "#0ca30c",
  CLOSED: "#8a8a85",
  SPAM: "#d03b3b",
};

export const INK = {
  primary: "#0b0b0b",
  secondary: "#52514e",
  muted: "#8a8a85",
  grid: "#ececea",
};
