// Preliminary material bill-of-quantities for the ceiling calculator.
// Formulas are standard simplified suspended-ceiling coverage ratios (grid
// spacing / module size) — intentionally a *preliminary* estimate, which is
// why the UI always pairs this with "Request Official Engineer Take-off".
export type CeilingType = "grilyato" | "armstrong" | "slat";
export type GrilyatoColor = "white" | "black" | "graphite" | "metallic" | "wood";
export type ArmstrongType = "metal" | "washable" | "gypsum";
export type SlatType = "cube100" | "classic84" | "linear150";
export type InputMode = "dimensions" | "area";

const SLAT_WIDTH_M: Record<SlatType, number> = {
  cube100: 0.1,
  classic84: 0.084,
  linear150: 0.15,
};

export interface BOQItem {
  key: string;
  qty: number;
}

export interface BOQResult {
  ceilingType: CeilingType;
  mode: InputMode;
  length: number;
  width: number;
  area: number;
  perimeter: number;
  perimeterEstimated: boolean;
  items: BOQItem[];
}

export interface CalculatorInput {
  ceilingType: CeilingType;
  mode: InputMode;
  length?: number;
  width?: number;
  /** Used when mode === "area" */
  area?: number;
  /** Optional, used when mode === "area" — if omitted, estimated assuming a square room */
  perimeter?: number;
  cellSizeMm?: number; // grilyato
  armstrongType?: ArmstrongType;
  slatType?: SlatType;
}

export function computeBOQ(input: CalculatorInput): BOQResult {
  const hasDimensions = input.mode === "dimensions";
  const length = hasDimensions ? Math.max(0, input.length ?? 0) : 0;
  const width = hasDimensions ? Math.max(0, input.width ?? 0) : 0;

  const area = hasDimensions ? length * width : Math.max(0, input.area ?? 0);
  const perimeterEstimated = !hasDimensions && !(input.perimeter && input.perimeter > 0);
  const perimeter = hasDimensions
    ? 2 * (length + width)
    : input.perimeter && input.perimeter > 0
      ? input.perimeter
      : 4 * Math.sqrt(area); // assumes a roughly square room when the real perimeter isn't known

  const items: BOQItem[] = [{ key: "area", qty: round2(area) }, { key: "perimeter", qty: round2(perimeter) }];

  if (input.ceilingType === "grilyato") {
    const cellSizeM = (input.cellSizeMm ?? 100) / 1000;
    const mainRunners = hasDimensions
      ? Math.ceil(width / 1.2) * Math.ceil(length / 2.4)
      : Math.ceil(area / (2.4 * 1.2));
    const totalBladeLengthM = (2 * area) / cellSizeM;
    const gridElements = Math.ceil(totalBladeLengthM / 2);
    const hangers = Math.ceil(area / 1.2);
    const lights = Math.ceil(area / 0.36 / 8);

    items.push(
      { key: "grilyato_main", qty: mainRunners },
      { key: "grilyato_elements", qty: gridElements },
      { key: "hangers", qty: hangers },
      { key: "lights", qty: lights }
    );
  } else if (input.ceilingType === "armstrong") {
    const mainRunners = hasDimensions
      ? Math.ceil(width / 1.2) * Math.ceil(length / 3.6)
      : Math.ceil(area / (3.6 * 1.2));
    const tiles = Math.ceil(area / 0.36);
    const crossTees12 = Math.ceil(tiles * 0.5);
    const crossTees06 = tiles;
    const hangers = Math.ceil(area / 1.2);
    const lights = Math.ceil(tiles / 8);

    items.push(
      { key: "t_main", qty: mainRunners },
      { key: "t_cross", qty: crossTees12 + crossTees06 },
      { key: "hangers", qty: hangers },
      { key: "lights", qty: lights }
    );
  } else {
    const slatWidthM = SLAT_WIDTH_M[input.slatType ?? "cube100"];
    const slats = hasDimensions
      ? Math.ceil(width / slatWidthM) * Math.ceil(length / 3)
      : Math.ceil(area / slatWidthM / 3);
    const stringers = hasDimensions ? Math.ceil(length / 1) * Math.ceil(width / 3) : Math.ceil(area / 3);
    const lAngle = Math.ceil(perimeter / 3);
    const hangers = Math.ceil(area / 1.2);

    items.push(
      { key: "slats", qty: slats },
      { key: "stringers", qty: stringers },
      { key: "l_angle", qty: lAngle },
      { key: "hangers", qty: hangers }
    );
  }

  return {
    ceilingType: input.ceilingType,
    mode: input.mode,
    length,
    width,
    area: round2(area),
    perimeter: round2(perimeter),
    perimeterEstimated,
    items,
  };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
