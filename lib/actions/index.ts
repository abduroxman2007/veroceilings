"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/server";
import { requireAdminUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// ─── Schemas ────────────────────────────────────────────────────────────────

// Accepts "+998901234567", "998901234567", or a bare 9-digit local number.
const phoneSchema = z
  .string()
  .transform((v) => v.replace(/[^\d+]/g, ""))
  .refine((v) => /^(\+?998)?\d{9}$/.test(v), "Invalid phone");

const ContactSchema = z.object({
  name: z.string().min(2, "Name too short"),
  phone: phoneSchema,
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(5, "Message too short"),
  locale: z.string().default("uz"),
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

const CalculatorLeadSchema = z.object({
  name: z.string().min(2, "Name too short"),
  phone: phoneSchema,
  email: z.string().email().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  ceiling_type: z.enum(["grilyato", "armstrong", "slat"]),
  mode: z.enum(["dimensions", "area"]).default("dimensions"),
  // In "area" mode length/width are unknown (0); area is always computed
  // client-side and sent explicitly, so it's the one field that must be positive.
  length: z.coerce.number().min(0).max(500),
  width: z.coerce.number().min(0).max(500),
  area: z.coerce.number().positive().max(10000),
  calculation_data: z.string(),
  locale: z.string().default("uz"),
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

const NewsletterSchema = z.object({
  email: z.string().email(),
});

// ─── Telegram helper ────────────────────────────────────────────────────────

async function sendTelegramAlert(message: string) {
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) return; // silent — no Telegram configured

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
    });
  } catch {
    // Telegram failure should never break the form submission
  }
}

// ─── Contact form action ─────────────────────────────────────────────────────

export async function submitContactAction(
  prevState: { success: boolean; error?: string } | null,
  formData: FormData
) {
  const raw = Object.fromEntries(formData.entries());

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name, phone, email, message, locale, website } = parsed.data;
  if (website) return { success: true }; // honeypot tripped — pretend success, drop silently

  // Save to DB (if configured) — a DB failure must never block the user from
  // seeing a success message, but it must not vanish without a trace either.
  try {
    const supabase = await createAdminClient();
    const { error } = await supabase.from("inquiries").insert([
      {
        customer_name: name,
        phone,
        email: email || null,
        message,
        source: "contact_form",
        locale,
        status: "NEW",
      },
    ]);
    if (error) console.error("submitContactAction: DB insert failed:", error.message);
  } catch (e) {
    console.error("submitContactAction: DB insert threw:", e);
  }

  // Telegram alert
  const tgMsg =
    `🔔 <b>Yangi murojaat — Vero Ceilings</b>\n` +
    `👤 Ism: ${name}\n` +
    `📞 Tel: ${phone}\n` +
    `📧 Email: ${email || "—"}\n` +
    `💬 Xabar: ${message}\n` +
    `🌐 Til: ${locale}`;
  await sendTelegramAlert(tgMsg);

  revalidatePath("/[locale]/contact", "page");
  return { success: true };
}

// ─── Calculator lead action ───────────────────────────────────────────────────

export async function submitCalculatorLeadAction(
  prevState: { success: boolean; error?: string } | null,
  formData: FormData
) {
  const raw = Object.fromEntries(formData.entries());

  const parsed = CalculatorLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const d = parsed.data;
  if (d.website) return { success: true }; // honeypot tripped — pretend success, drop silently

  let calculationData: unknown = {};
  try {
    calculationData = JSON.parse(d.calculation_data);
  } catch {
    calculationData = { ceiling_type: d.ceiling_type, mode: d.mode, length: d.length, width: d.width, area: d.area };
  }

  try {
    const supabase = await createAdminClient();
    const { error } = await supabase.from("inquiries").insert([
      {
        customer_name: d.name,
        phone: d.phone,
        email: d.email || null,
        company: d.company || null,
        calculation_data: calculationData,
        source: "calculator",
        locale: d.locale,
        status: "NEW",
      },
    ]);
    if (error) console.error("submitCalculatorLeadAction: DB insert failed:", error.message);
  } catch (e) {
    console.error("submitCalculatorLeadAction: DB insert threw:", e);
  }

  const tgMsg =
    `🧮 <b>Kalkulyator so'rovi — Vero Ceilings</b>\n` +
    `👤 Ism: ${d.name}\n` +
    `📞 Tel: ${d.phone}\n` +
    `🏗️ Shift turi: ${d.ceiling_type}\n` +
    `📐 ${d.mode === "area" ? `Maydon: ${d.area} m²` : `O'lcham: ${d.length}m x ${d.width}m (${d.area} m²)`}\n` +
    `🌐 Til: ${d.locale}`;
  await sendTelegramAlert(tgMsg);

  return { success: true };
}

// ─── Newsletter action ────────────────────────────────────────────────────────

export async function subscribeNewsletterAction(
  prevState: { success: boolean; error?: string } | null,
  formData: FormData
) {
  const parsed = NewsletterSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { success: false, error: "Noto'g'ri email manzil" };
  }

  try {
    const supabase = await createAdminClient();
    await supabase
      .from("newsletter_subscribers")
      .upsert([{ email: parsed.data.email }], { onConflict: "email" });
  } catch {
    // silent
  }

  return { success: true };
}

// ─── Admin: Product create/update ─────────────────────────────────────────────

const PRODUCT_JSON_FIELDS = ["specifications", "images", "application_cases", "related_products"];

export async function upsertProductAction(
  _prevState: { success: boolean; error?: string } | null,
  formData: FormData
) {
  try {
    await requireAdminUser();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  const id = formData.get("id") as string | null;
  const payload: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "id") continue;
    if (PRODUCT_JSON_FIELDS.includes(key)) {
      try {
        payload[key] = JSON.parse(value as string);
      } catch {
        payload[key] = key === "related_products" ? [] : [];
      }
    } else if (key === "is_active") {
      payload[key] = value === "true";
    } else if (key === "sort_order") {
      payload[key] = Number(value) || 0;
    } else {
      payload[key] = value;
    }
  }

  if (!payload.slug) return { success: false, error: "Slug majburiy" };

  try {
    const supabase = await createAdminClient();
    if (id) {
      const { error } = await supabase.from("products").update(payload).eq("id", id);
      if (error) return { success: false, error: error.message };
    } else {
      const { error } = await supabase.from("products").insert([payload]);
      if (error) return { success: false, error: error.message };
    }
  } catch (e: unknown) {
    return { success: false, error: String(e) };
  }

  revalidatePath("/admin/products");
  revalidatePath("/[locale]/products", "page");
  revalidatePath("/[locale]/products/[slug]", "page");
  return { success: true };
}

export async function deleteProductAction(id: string) {
  try {
    await requireAdminUser();
    const supabase = await createAdminClient();
    await supabase.from("products").delete().eq("id", id);
    revalidatePath("/admin/products");
    revalidatePath("/[locale]/products", "page");
    return { success: true };
  } catch {
    return { success: false };
  }
}

// ─── Admin: Project upsert ────────────────────────────────────────────────────

export async function upsertProjectAction(
  _prevState: { success: boolean; error?: string } | null,
  formData: FormData
) {
  try {
    await requireAdminUser();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  const id = formData.get("id") as string | null;
  const payload: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "id") continue;
    if (key === "media") {
      try {
        payload[key] = JSON.parse(value as string);
      } catch {
        payload[key] = [];
      }
    } else if (key === "year" || key === "area_sqm") {
      payload[key] = value ? Number(value) : null;
    } else if (key === "sort_order") {
      payload[key] = Number(value) || 0;
    } else {
      payload[key] = value;
    }
  }
  payload.is_video = payload.is_video === "true";
  payload.is_active = payload.is_active === "true";

  // Keep legacy single-media_url in sync with the first gallery item so the
  // old fallback path (STATIC_PROJECTS-shaped rows) still has a thumbnail.
  const media = payload.media as Array<{ url: string }> | undefined;
  if (media && media.length > 0 && !payload.media_url) {
    payload.media_url = media[0].url;
  }

  try {
    const supabase = await createAdminClient();
    if (id) {
      const { error } = await supabase.from("projects").update(payload).eq("id", id);
      if (error) return { success: false, error: error.message };
    } else {
      const { error } = await supabase.from("projects").insert([payload]);
      if (error) return { success: false, error: error.message };
    }
  } catch (e: unknown) {
    return { success: false, error: String(e) };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/[locale]/projects", "page");
  return { success: true };
}

export async function deleteProjectAction(id: string) {
  try {
    await requireAdminUser();
    const supabase = await createAdminClient();
    await supabase.from("projects").delete().eq("id", id);
    revalidatePath("/admin/projects");
    revalidatePath("/[locale]/projects", "page");
    return { success: true };
  } catch {
    return { success: false };
  }
}

// ─── Admin: Site video upsert/delete ──────────────────────────────────────────

export async function upsertSiteVideoAction(
  _prevState: { success: boolean; error?: string } | null,
  formData: FormData
) {
  try {
    await requireAdminUser();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  const id = formData.get("id") as string | null;
  const payload: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "id") continue;
    if (key === "sort_order") {
      payload[key] = Number(value) || 0;
    } else if (key === "product_slug") {
      payload[key] = value || null;
    } else {
      payload[key] = value;
    }
  }
  payload.is_active = payload.is_active === "true";

  if (!payload.youtube_id) return { success: false, error: "YouTube ID majburiy" };

  try {
    const supabase = await createAdminClient();
    if (id) {
      const { error } = await supabase.from("site_videos").update(payload).eq("id", id);
      if (error) return { success: false, error: error.message };
    } else {
      const { error } = await supabase.from("site_videos").insert([payload]);
      if (error) return { success: false, error: error.message };
    }
  } catch (e: unknown) {
    return { success: false, error: String(e) };
  }

  revalidatePath("/admin/videos");
  revalidatePath("/[locale]/architects", "page");
  revalidatePath("/[locale]/products/[slug]", "page");
  return { success: true };
}

export async function deleteSiteVideoAction(id: string) {
  try {
    await requireAdminUser();
    const supabase = await createAdminClient();
    await supabase.from("site_videos").delete().eq("id", id);
    revalidatePath("/admin/videos");
    revalidatePath("/[locale]/architects", "page");
    return { success: true };
  } catch {
    return { success: false };
  }
}

// ─── Admin: Inquiry status update ─────────────────────────────────────────────

export async function updateInquiryStatusAction(id: string, status: string) {
  try {
    await requireAdminUser();
    const supabase = await createAdminClient();
    await supabase.from("inquiries").update({ status }).eq("id", id);
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch {
    return { success: false };
  }
}

// ─── Admin: Site settings ─────────────────────────────────────────────────────

export async function upsertSiteSettingsAction(
  _prevState: { success: boolean; error?: string } | null,
  formData: FormData
) {
  try {
    await requireAdminUser();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  const rows = Array.from(formData.entries()).map(([key, value]) => ({ key, value: String(value) }));

  try {
    const supabase = await createAdminClient();
    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    if (error) return { success: false, error: error.message };
  } catch (e: unknown) {
    return { success: false, error: String(e) };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

// ─── Admin: Hero slide upsert/delete ──────────────────────────────────────────

export async function upsertHeroSlideAction(
  _prevState: { success: boolean; error?: string } | null,
  formData: FormData
) {
  try {
    await requireAdminUser();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  const id = formData.get("id") as string | null;
  const payload: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "id") continue;
    if (key === "sort_order") payload[key] = Number(value) || 0;
    else payload[key] = value;
  }
  payload.is_active = payload.is_active === "true";

  if (!payload.image_url) return { success: false, error: "Rasm majburiy" };

  try {
    const supabase = await createAdminClient();
    if (id) {
      const { error } = await supabase.from("hero_slides").update(payload).eq("id", id);
      if (error) return { success: false, error: error.message };
    } else {
      const { error } = await supabase.from("hero_slides").insert([payload]);
      if (error) return { success: false, error: error.message };
    }
  } catch (e: unknown) {
    return { success: false, error: String(e) };
  }

  revalidatePath("/admin/hero-slides");
  revalidatePath("/[locale]", "page");
  return { success: true };
}

export async function deleteHeroSlideAction(id: string) {
  try {
    await requireAdminUser();
    const supabase = await createAdminClient();
    await supabase.from("hero_slides").delete().eq("id", id);
    revalidatePath("/admin/hero-slides");
    revalidatePath("/[locale]", "page");
    return { success: true };
  } catch {
    return { success: false };
  }
}

// ─── Admin: FAQ upsert/delete ──────────────────────────────────────────────────

export async function upsertFaqAction(
  _prevState: { success: boolean; error?: string } | null,
  formData: FormData
) {
  try {
    await requireAdminUser();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  const id = formData.get("id") as string | null;
  const payload: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "id") continue;
    if (key === "sort_order") payload[key] = Number(value) || 0;
    else payload[key] = value;
  }
  payload.is_active = payload.is_active === "true";

  if (!payload.question_uz) return { success: false, error: "Savol majburiy" };

  try {
    const supabase = await createAdminClient();
    if (id) {
      const { error } = await supabase.from("faqs").update(payload).eq("id", id);
      if (error) return { success: false, error: error.message };
    } else {
      const { error } = await supabase.from("faqs").insert([payload]);
      if (error) return { success: false, error: error.message };
    }
  } catch (e: unknown) {
    return { success: false, error: String(e) };
  }

  revalidatePath("/admin/faq");
  revalidatePath("/[locale]/faq", "page");
  return { success: true };
}

export async function deleteFaqAction(id: string) {
  try {
    await requireAdminUser();
    const supabase = await createAdminClient();
    await supabase.from("faqs").delete().eq("id", id);
    revalidatePath("/admin/faq");
    revalidatePath("/[locale]/faq", "page");
    return { success: true };
  } catch {
    return { success: false };
  }
}
