import { getDashboardData } from "@/lib/db/analytics";
import StatTile from "@/components/admin/charts/StatTile";
import TrendChart from "@/components/admin/charts/TrendChart";
import RankedBars from "@/components/admin/charts/RankedBars";
import { SERIES, STATUS, INK } from "@/components/admin/charts/palette";
import { Eye, MessageSquare, Inbox, Mail, Info } from "lucide-react";

const SOURCE_LABELS: Record<string, string> = {
  contact_form: "Aloqa formasi",
  calculator: "Kalkulyator",
  newsletter: "Obuna",
  whatsapp: "WhatsApp",
  direct: "To'g'ridan-to'g'ri",
};

const LOCALE_LABELS: Record<string, string> = {
  uz: "O'zbekcha",
  ru: "Ruscha",
  en: "Inglizcha",
};

const CEILING_LABELS: Record<string, string> = {
  grilyato: "Grilyato",
  armstrong: "Armstrong",
  slat: "Reykali",
};

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="admin-card">
      <div style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: INK.primary }}>{title}</h2>
        {subtitle && <p style={{ fontSize: "0.78rem", color: INK.muted, marginTop: "0.15rem" }}>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default async function AdminDashboard() {
  const d = await getDashboardData();

  return (
    <div>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: INK.primary }}>Asosiy panel</h1>
        <p style={{ color: INK.muted, fontSize: "0.85rem", marginTop: "0.25rem" }}>
          Oxirgi 30 kun ko&apos;rsatkichlari
        </p>
      </div>

      {/* Hero numbers */}
      <div className="admin-stat-grid">
        <StatTile label="Sahifa ko'rishlar" value={d.totals.views30} previous={d.totals.viewsPrev30} hint="30 kun" accent={SERIES[0]} />
        <StatTile label="Murojaatlar" value={d.totals.inquiries30} previous={d.totals.inquiriesPrev30} hint="30 kun" accent={SERIES[1]} />
        <StatTile label="Yangi murojaatlar" value={d.totals.newInquiries} hint="javob kutilmoqda" accent={STATUS.NEW} />
        <StatTile label="Obunachilar" value={d.totals.subscribers} hint="jami" accent={SERIES[2]} />
      </div>

      {!d.hasViewData && (
        <div className="admin-notice">
          <Info size={16} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ margin: 0 }}>
            Tashriflar statistikasi hozirgina yoqildi — ma&apos;lumotlar shu paytdan boshlab to&apos;planadi.
            Qidiruv so&apos;rovlari uchun Google Search Console&apos;ni ulash kerak.
          </p>
        </div>
      )}

      {/* Trend */}
      <div style={{ marginTop: "1.25rem" }}>
        <Card title="Tashriflar va murojaatlar" subtitle="Kunlik, oxirgi 30 kun">
          <TrendChart data={d.daily} labels={{ views: "Ko'rishlar", inquiries: "Murojaatlar" }} />
        </Card>
      </div>

      {/* Breakdown row */}
      <div className="admin-grid-2" style={{ marginTop: "1.25rem" }}>
        <Card title="Murojaatlar holati" subtitle="Voronka bo'yicha taqsimot">
          <RankedBars
            data={d.byStatus}
            colors={d.byStatus.map((s) => STATUS[s.name] ?? INK.muted)}
            emptyLabel="Hozircha murojaatlar yo'q."
          />
        </Card>

        <Card title="Murojaat manbasi" subtitle="Qaysi forma orqali kelgan">
          <RankedBars
            data={d.bySource}
            colors={[...SERIES]}
            emptyLabel="Hozircha murojaatlar yo'q."
            labels={SOURCE_LABELS}
          />
        </Card>
      </div>

      <div className="admin-grid-2" style={{ marginTop: "1.25rem" }}>
        <Card title="Eng ko'p ko'rilgan sahifalar" subtitle="Oxirgi 30 kun">
          <RankedBars data={d.topPages} colors={SERIES[0]} emptyLabel="Tashriflar hali qayd etilmagan." />
        </Card>

        <Card title="Til bo'yicha" subtitle="Tashrifchilar tili">
          <RankedBars
            data={d.byLocale}
            colors={[...SERIES]}
            emptyLabel="Ma'lumot yo'q."
            labels={LOCALE_LABELS}
          />
        </Card>
      </div>

      <div className="admin-grid-2" style={{ marginTop: "1.25rem" }}>
        <Card title="Trafik manbalari" subtitle="Tashqi havolalar (referrer)">
          <RankedBars data={d.referrers} colors={SERIES[2]} emptyLabel="Tashqi havolalar hali qayd etilmagan." />
        </Card>

        <Card title="Kalkulyatorda tanlangan shift turi" subtitle="Mijozlar nimaga qiziqmoqda">
          <RankedBars
            data={d.ceilingTypes}
            colors={[...SERIES]}
            emptyLabel="Kalkulyator orqali so'rovlar hali yo'q."
            labels={CEILING_LABELS}
          />
        </Card>
      </div>

      {/* Content inventory */}
      <div style={{ marginTop: "1.25rem" }}>
        <Card title="Kontent" subtitle="Saytdagi joriy kontent hajmi">
          <div className="admin-inventory">
            {[
              { icon: <Eye size={16} />, label: "Mahsulotlar", value: d.totals.products },
              { icon: <MessageSquare size={16} />, label: "Loyihalar", value: d.totals.projects },
              { icon: <Inbox size={16} />, label: "Videolar", value: d.totals.videos },
              { icon: <Mail size={16} />, label: "Savol-javoblar", value: d.totals.faqs },
            ].map((it) => (
              <div key={it.label} className="admin-inventory__item">
                <span style={{ color: INK.muted }}>{it.icon}</span>
                <span style={{ fontSize: "1.25rem", fontWeight: 800, color: INK.primary, fontVariantNumeric: "tabular-nums" }}>{it.value}</span>
                <span style={{ fontSize: "0.78rem", color: INK.muted }}>{it.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
