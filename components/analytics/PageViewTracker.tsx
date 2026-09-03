"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Fires one beacon per pathname. Uses sendBeacon where available so the request
 * survives the page being closed, and never blocks navigation.
 */
export default function PageViewTracker({ locale }: { locale: string }) {
  const pathname = usePathname();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastSent.current === pathname) return;
    // Admin traffic is our own — don't pollute the site's numbers.
    if (pathname.startsWith("/admin")) return;

    lastSent.current = pathname;
    const payload = JSON.stringify({ path: pathname, locale });

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
      } else {
        void fetch("/api/track", {
          method: "POST",
          body: payload,
          headers: { "Content-Type": "application/json" },
          keepalive: true,
        });
      }
    } catch {
      // Analytics must never break the page.
    }
  }, [pathname, locale]);

  return null;
}
