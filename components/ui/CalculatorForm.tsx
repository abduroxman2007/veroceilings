"use client";

import { useActionState, useId, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { submitCalculatorLeadAction } from "@/lib/actions";
import { computeBOQ, type ArmstrongType, type CeilingType, type InputMode, type SlatType } from "@/lib/calculator";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface Props { locale: string; }

const CELL_SIZES = [50, 75, 100, 150, 200];
const COLORS = ["white", "black", "graphite", "metallic", "wood"] as const;
const ARMSTRONG_TYPES: ArmstrongType[] = ["metal", "washable", "gypsum"];
const SLAT_TYPES: SlatType[] = ["cube100", "classic84", "linear150"];

export default function CalculatorForm({ locale }: Props) {
  const t = useTranslations("calculator");
  const uid = useId();

  const [mode, setMode] = useState<InputMode>("dimensions");
  const [ceilingType, setCeilingType] = useState<CeilingType>("grilyato");
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [area, setArea] = useState<number>(0);
  const [perimeter, setPerimeter] = useState<number>(0);
  const [cellSizeMm, setCellSizeMm] = useState<number>(100);
  const [color, setColor] = useState<string>("white");
  const [armstrongType, setArmstrongType] = useState<ArmstrongType>("metal");
  const [slatType, setSlatType] = useState<SlatType>("cube100");

  const [state, formAction, pending] = useActionState(submitCalculatorLeadAction, null);

  const boq = useMemo(
    () => computeBOQ({ ceilingType, mode, length, width, area, perimeter: perimeter || undefined, cellSizeMm, armstrongType, slatType }),
    [ceilingType, mode, length, width, area, perimeter, cellSizeMm, armstrongType, slatType]
  );

  const hasValidInput = mode === "dimensions" ? length > 0 && width > 0 : area > 0;

  const calculationDataJson = useMemo(
    () => JSON.stringify({ ...boq, color, armstrongType, slatType, cellSizeMm }),
    [boq, color, armstrongType, slatType, cellSizeMm]
  );

  if (state?.success) {
    return (
      <div role="status" style={{ background: "var(--color-surface-alt)", padding: "2rem", borderRadius: "8px", border: "1px solid #4ade80", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
        <CheckCircle2 size={22} style={{ color: "#16a34a", flexShrink: 0 }} />
        <p style={{ color: "#166534", margin: 0 }}>
          {locale === "uz" ? "So'rovingiz qabul qilindi. Tez orada siz bilan bog'lanamiz." : locale === "ru" ? "Ваш запрос принят. Мы скоро свяжемся с вами." : "Your request was received. We'll be in touch shortly."}
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* 1. Ceiling type */}
      <div>
        <label className="calc-label">{t("labels.type")}</label>
        <select value={ceilingType} onChange={(e) => setCeilingType(e.target.value as CeilingType)} className="form-control">
          <option value="grilyato">{t("types.grilyato")}</option>
          <option value="armstrong">{t("types.armstrong")}</option>
          <option value="slat">{t("types.slat")}</option>
        </select>
      </div>

      {/* 2. Type-specific spec */}
      {ceilingType === "grilyato" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label className="calc-label">{t("labels.cell_size")}</label>
            <select value={cellSizeMm} onChange={(e) => setCellSizeMm(Number(e.target.value))} className="form-control">
              {CELL_SIZES.map((s) => <option key={s} value={s}>{s}x{s} mm</option>)}
            </select>
          </div>
          <div>
            <label className="calc-label">{t("labels.color")}</label>
            <select value={color} onChange={(e) => setColor(e.target.value)} className="form-control">
              {COLORS.map((c) => <option key={c} value={c}>{t(`colors.${c}`)}</option>)}
            </select>
          </div>
        </div>
      )}

      {ceilingType === "armstrong" && (
        <div>
          <label className="calc-label">{t("labels.armstrong_type")}</label>
          <select value={armstrongType} onChange={(e) => setArmstrongType(e.target.value as ArmstrongType)} className="form-control">
            {ARMSTRONG_TYPES.map((a) => <option key={a} value={a}>{t(`armstrong_types.${a}`)}</option>)}
          </select>
        </div>
      )}

      {ceilingType === "slat" && (
        <div>
          <label className="calc-label">{t("labels.slat_type")}</label>
          <select value={slatType} onChange={(e) => setSlatType(e.target.value as SlatType)} className="form-control">
            {SLAT_TYPES.map((s) => <option key={s} value={s}>{t(`slat_types.${s}`)}</option>)}
          </select>
        </div>
      )}

      {/* 4. Dimensions / area mode toggle */}
      <div>
        <label className="calc-label">{t("labels.dimensions")}</label>

        <div className="calc-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={mode === "dimensions"} className={`calc-tab ${mode === "dimensions" ? "active" : ""}`} onClick={() => setMode("dimensions")}>
            {locale === "uz" ? "Uzunlik va kenglik" : locale === "ru" ? "Длина и ширина" : "Length & width"}
          </button>
          <button type="button" role="tab" aria-selected={mode === "area"} className={`calc-tab ${mode === "area" ? "active" : ""}`} onClick={() => setMode("area")}>
            {locale === "uz" ? "Faqat umumiy maydon" : locale === "ru" ? "Только общая площадь" : "Total area only"}
          </button>
        </div>

        {mode === "dimensions" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.75rem" }}>
            <input
              type="number" min="0" step="0.1" placeholder={locale === "uz" ? "Uzunlik, m" : locale === "ru" ? "Длина, м" : "Length, m"}
              value={length || ""} onChange={(e) => setLength(Number(e.target.value))} className="form-control"
            />
            <input
              type="number" min="0" step="0.1" placeholder={locale === "uz" ? "Kenglik, m" : locale === "ru" ? "Ширина, м" : "Width, m"}
              value={width || ""} onChange={(e) => setWidth(Number(e.target.value))} className="form-control"
            />
          </div>
        ) : (
          <div style={{ marginTop: "0.75rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input
                type="number" min="0" step="0.1" placeholder={locale === "uz" ? "Umumiy maydon, m²" : locale === "ru" ? "Общая площадь, м²" : "Total area, m²"}
                value={area || ""} onChange={(e) => setArea(Number(e.target.value))} className="form-control"
              />
              <input
                type="number" min="0" step="0.1" placeholder={locale === "uz" ? "Perimetr, m (ixtiyoriy)" : locale === "ru" ? "Периметр, м (необязательно)" : "Perimeter, m (optional)"}
                value={perimeter || ""} onChange={(e) => setPerimeter(Number(e.target.value))} className="form-control"
              />
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "0.5rem", marginBottom: 0 }}>
              {locale === "uz"
                ? "Xona shakli murakkab bo'lsa (masalan, dahliz), faqat maydonni kiriting — perimetrni bilmasangiz, kvadrat xona asosida taxminan hisoblanadi."
                : locale === "ru"
                  ? "Если помещение неправильной формы (например, коридор), укажите только площадь — если периметр неизвестен, он будет оценён исходя из квадратного помещения."
                  : "For an irregular room (like a hallway), just enter the area — if you don't know the perimeter, it's estimated assuming a square room."}
            </p>
          </div>
        )}
      </div>

      {/* Live BOQ result */}
      <div style={{ padding: "1.5rem", background: "var(--color-surface-alt)", borderRadius: "8px" }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: "700", marginBottom: "1rem" }}>{t("results.title")}</h3>
        {hasValidInput ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <BoqRow label={t("results.area")} value={`${boq.area} m²`} />
            <BoqRow label={t("results.perimeter") + (boq.perimeterEstimated ? " *" : "")} value={`${boq.perimeter} m`} />
            {boq.items.filter((i) => i.key !== "area" && i.key !== "perimeter").map((item) => (
              <BoqRow key={item.key} label={t(`results.${item.key}` as Parameters<typeof t>[0])} value={String(item.qty)} />
            ))}
          </div>
        ) : (
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", margin: 0 }}>
            {locale === "uz" ? "Hisoblash uchun xona o'lchamlarini kiriting" : locale === "ru" ? "Введите размеры помещения для расчета" : "Enter room dimensions to calculate"}
          </p>
        )}
        {hasValidInput && boq.perimeterEstimated && (
          <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.75rem", marginBottom: 0 }}>
            * {locale === "uz" ? "Perimetr taxminiy (kvadrat xona asosida)" : locale === "ru" ? "Периметр оценён (для квадратного помещения)" : "Perimeter is estimated (assuming a square room)"}
          </p>
        )}
        <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "0.5rem", marginBottom: 0 }}>
          * {t("cta_quote")}
        </p>
      </div>

      {/* Contact / official quote request */}
      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem", borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="ceiling_type" value={ceilingType} />
        <input type="hidden" name="mode" value={mode} />
        <input type="hidden" name="length" value={length} />
        <input type="hidden" name="width" value={width} />
        <input type="hidden" name="area" value={boq.area} />
        <input type="hidden" name="calculation_data" value={calculationDataJson} />
        {/* honeypot — real visitors never fill this in */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }} aria-hidden="true" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label className="calc-label" htmlFor={`${uid}-name`}>{locale === "uz" ? "Ismingiz" : locale === "ru" ? "Ваше имя" : "Your name"}</label>
            <input id={`${uid}-name`} type="text" name="name" required minLength={2} className="form-control" />
          </div>
          <div>
            <label className="calc-label" htmlFor={`${uid}-phone`}>{locale === "uz" ? "Telefon raqamingiz" : locale === "ru" ? "Ваш телефон" : "Your phone number"}</label>
            <input id={`${uid}-phone`} type="tel" name="phone" required minLength={9} className="form-control" placeholder="+998" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label className="calc-label" htmlFor={`${uid}-email`}>Email</label>
            <input id={`${uid}-email`} type="email" name="email" className="form-control" />
          </div>
          <div>
            <label className="calc-label" htmlFor={`${uid}-company`}>{locale === "uz" ? "Kompaniya" : locale === "ru" ? "Компания" : "Company"}</label>
            <input id={`${uid}-company`} type="text" name="company" className="form-control" />
          </div>
        </div>

        {state?.error && (
          <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#dc2626", fontSize: "0.85rem", margin: 0 }}>
            <AlertCircle size={16} /> {state.error}
          </p>
        )}

        <button type="submit" disabled={pending || !hasValidInput} className="btn-primary" style={{ width: "100%", justifyContent: "center", opacity: pending || !hasValidInput ? 0.7 : 1 }}>
          {pending ? <Loader2 size={16} className="admin-spin" /> : <Send size={16} />}
          {pending ? "..." : t("cta_quote")}
        </button>
      </form>

      <style>{`
        .calc-label { display: block; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: var(--color-text-muted); margin-bottom: 0.4rem; }
        .calc-tabs { display: flex; gap: 0.4rem; background: var(--color-surface-alt); padding: 0.3rem; border-radius: 8px; }
        .calc-tab { flex: 1; border: none; background: transparent; padding: 0.55rem 0.75rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600; color: var(--color-text-muted); cursor: pointer; transition: background 0.15s, color 0.15s; }
        .calc-tab.active { background: white; color: var(--color-primary); box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .admin-spin { animation: admin-spin 0.9s linear infinite; }
        @keyframes admin-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function BoqRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
      <span style={{ color: "var(--color-text-muted)" }}>{label}</span>
      <span style={{ fontWeight: 700 }}>{value}</span>
    </div>
  );
}
