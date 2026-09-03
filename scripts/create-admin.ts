// Creates (or resets the password of) a Supabase Auth user allowed to log
// into /admin. Usage: npx tsx scripts/create-admin.ts <email> <password>
import { createClient } from "@supabase/supabase-js";

try {
  process.loadEnvFile(".env.local");
} catch {
  // already provided by the environment
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const [, , email, password] = process.argv;

if (!url || !serviceKey || !email || !password) {
  console.error("Usage: npx tsx scripts/create-admin.ts <email> <password>");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function main() {
  const { data: existing } = await supabase.auth.admin.listUsers();
  const match = existing?.users.find((u) => u.email === email);

  if (match) {
    const { error } = await supabase.auth.admin.updateUserById(match.id, { password });
    if (error) {
      console.error("Failed to update password:", error.message);
      process.exit(1);
    }
    console.log(`Password updated for existing admin user: ${email}`);
    return;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    console.error("Failed to create admin user:", error.message);
    process.exit(1);
  }
  console.log(`Admin user created: ${data.user?.email} (${data.user?.id})`);
}

main();
