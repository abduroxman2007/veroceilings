import { createAdminClient } from "@/lib/supabase/server";
import { requireAdminUser } from "@/lib/auth";

export interface DaySeries {
  date: string; // YYYY-MM-DD
  views: number;
  inquiries: number;
}

export interface NameCount {
  name: string;
  value: number;
}

export interface DashboardData {
  totals: {
    views30: number;
    viewsPrev30: number;
    inquiries30: number;
    inquiriesPrev30: number;
    newInquiries: number;
    subscribers: number;
    products: number;
    projects: number;
    videos: number;
    faqs: number;
  };
  daily: DaySeries[];
  byStatus: NameCount[];
  bySource: NameCount[];
  byLocale: NameCount[];
  topPages: NameCount[];
  referrers: NameCount[];
  ceilingTypes: NameCount[];
  /** True until the tracking beacon has recorded anything — lets the UI say so honestly. */
  hasViewData: boolean;
}

const DAYS = 30;

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function emptyDays(days: number): DaySeries[] {
  const out: DaySeries[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    out.push({ date: dayKey(d), views: 0, inquiries: 0 });
  }
  return out;
}

function tally(rows: { [k: string]: unknown }[], key: string): NameCount[] {
  const counts = new Map<string, number>();
  for (const r of rows) {
    const raw = r[key];
    const name = typeof raw === "string" && raw ? raw : "—";
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export async function getDashboardData(): Promise<DashboardData> {
  await requireAdminUser();
  const supabase = await createAdminClient();

  const now = new Date();
  const since = new Date(now);
  since.setUTCDate(since.getUTCDate() - DAYS);
  const sincePrev = new Date(now);
  sincePrev.setUTCDate(sincePrev.getUTCDate() - DAYS * 2);

  const [viewsRes, prevViewsRes, inqRes, prevInqRes, subsRes, counts] = await Promise.all([
    supabase.from("page_views").select("path, locale, referrer_host, created_at").gte("created_at", since.toISOString()),
    supabase
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .gte("created_at", sincePrev.toISOString())
      .lt("created_at", since.toISOString()),
    supabase.from("inquiries").select("status, source, locale, calculation_data, created_at").gte("created_at", since.toISOString()),
    supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .gte("created_at", sincePrev.toISOString())
      .lt("created_at", since.toISOString()),
    supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
    Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("site_videos").select("id", { count: "exact", head: true }),
      supabase.from("faqs").select("id", { count: "exact", head: true }),
      supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "NEW"),
    ]),
  ]);

  const views = viewsRes.data ?? [];
  const inquiries = inqRes.data ?? [];
  const [productsRes, projectsRes, videosRes, faqsRes, newInqRes] = counts;

  // Bucket both series onto the same 30-day axis so one chart can carry them.
  const daily = emptyDays(DAYS);
  const idx = new Map(daily.map((d, i) => [d.date, i]));
  for (const v of views) {
    const i = idx.get(String(v.created_at).slice(0, 10));
    if (i !== undefined) daily[i].views += 1;
  }
  for (const q of inquiries) {
    const i = idx.get(String(q.created_at).slice(0, 10));
    if (i !== undefined) daily[i].inquiries += 1;
  }

  // Ceiling type comes out of the calculator's stored BOQ payload.
  const ceilingCounts = new Map<string, number>();
  for (const q of inquiries) {
    const data = q.calculation_data as { ceilingType?: string } | null;
    if (data?.ceilingType) {
      ceilingCounts.set(data.ceilingType, (ceilingCounts.get(data.ceilingType) ?? 0) + 1);
    }
  }

  return {
    totals: {
      views30: views.length,
      viewsPrev30: prevViewsRes.count ?? 0,
      inquiries30: inquiries.length,
      inquiriesPrev30: prevInqRes.count ?? 0,
      newInquiries: newInqRes.count ?? 0,
      subscribers: subsRes.count ?? 0,
      products: productsRes.count ?? 0,
      projects: projectsRes.count ?? 0,
      videos: videosRes.count ?? 0,
      faqs: faqsRes.count ?? 0,
    },
    daily,
    byStatus: tally(inquiries, "status"),
    bySource: tally(inquiries, "source"),
    byLocale: tally(views.length ? views : inquiries, "locale"),
    topPages: tally(views, "path").slice(0, 8),
    referrers: tally(views.filter((v) => v.referrer_host), "referrer_host").slice(0, 6),
    ceilingTypes: [...ceilingCounts.entries()].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value),
    hasViewData: views.length > 0,
  };
}
