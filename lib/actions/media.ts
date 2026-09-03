"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { requireAdminUser } from "@/lib/auth";

const BUCKET = "vero-media";

export async function uploadMediaAction(formData: FormData): Promise<{ url: string } | { error: string }> {
  try {
    await requireAdminUser();
  } catch {
    return { error: "Unauthorized" };
  }

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "Fayl tanlanmadi" };

  const MAX_BYTES = 50 * 1024 * 1024; // 50MB — generous enough for a short walkthrough video
  if (file.size > MAX_BYTES) return { error: "Fayl hajmi 50MB dan katta" };

  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const path = `${crypto.randomUUID()}.${ext}`;

  const supabase = await createAdminClient();
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  });

  if (error) return { error: error.message };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}
