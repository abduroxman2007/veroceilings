import { createAdminClient } from "@/lib/supabase/server";
import { requireAdminUser } from "@/lib/auth";

export interface Inquiry {
  id: string;
  customer_name: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  company: string | null;
  calculation_data: Record<string, unknown> | null;
  source: string;
  status: string;
  locale: string;
  notes: string | null;
  created_at: string;
}

/** Admin-only: inquiries are never publicly readable, so this always uses the service-role client. */
export async function getAllInquiries(): Promise<Inquiry[]> {
  try {
    await requireAdminUser();
    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as Inquiry[];
  } catch {
    return [];
  }
}
