import { createClient } from "@/lib/supabase/server";

/**
 * Verifies the caller has a valid Supabase Auth session. Server Actions that
 * mutate data must call this themselves rather than relying solely on
 * middleware — defense in depth in case a route matcher ever drifts.
 */
export async function requireAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");
  return user;
}
