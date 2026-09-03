import { createAdminClient } from "@/lib/supabase/server";
import { requireAdminUser } from "@/lib/auth";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  locale: string;
  is_active: boolean;
  created_at: string;
}

export async function getAllSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    await requireAdminUser();
    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as NewsletterSubscriber[];
  } catch {
    return [];
  }
}
