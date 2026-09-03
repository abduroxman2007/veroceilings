import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

/**
 * First-party pageview beacon.
 *
 * This is a public write endpoint, so input is whitelisted rather than trusted:
 * the path must match our own locale-prefixed route shape, and only the
 * referrer's host is kept. Worst case an abuser inflates view counts on paths
 * that already exist — no business data is reachable from here.
 */

const PATH_RE = /^\/(uz|ru|en)(\/[a-z0-9\-/[\]]{0,120})?$/i;

// Per-IP sliding window: this runs as a persistent Node process (PM2 next
// start), not stateless serverless, so an in-memory map survives between
// requests and is enough to blunt casual flooding of this public endpoint.
const RATE_LIMIT = 60;
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

function refererHost(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const host = new URL(raw).hostname.toLowerCase();
    // Our own navigation isn't a traffic source.
    if (host.endsWith("veroceilings.uz") || host === "localhost") return null;
    return host.slice(0, 120);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ ok: true });
  }

  let body: { path?: unknown; locale?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const path = typeof body.path === "string" ? body.path : "";
  const locale = typeof body.locale === "string" ? body.locale.slice(0, 5) : null;

  if (!PATH_RE.test(path)) {
    // Unknown shape — accept quietly so we never leak which paths exist.
    return NextResponse.json({ ok: true });
  }

  try {
    const supabase = await createAdminClient();
    await supabase.from("page_views").insert([
      {
        path: path.slice(0, 160),
        locale,
        referrer_host: refererHost(request.headers.get("referer")),
      },
    ]);
  } catch (e) {
    console.error("track: insert failed", e);
  }

  return NextResponse.json({ ok: true });
}
