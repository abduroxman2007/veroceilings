"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package, Image as ImageIcon, MessageSquare, LayoutDashboard,
  Video, GalleryHorizontal, HelpCircle, Mail, Settings,
} from "lucide-react";

const GROUPS: { label: string; items: { href: string; label: string; icon: React.ReactNode }[] }[] = [
  {
    label: "Umumiy",
    items: [{ href: "/admin", label: "Asosiy panel", icon: <LayoutDashboard size={18} /> }],
  },
  {
    label: "Kontent",
    items: [
      { href: "/admin/products", label: "Mahsulotlar", icon: <Package size={18} /> },
      { href: "/admin/projects", label: "Loyihalar", icon: <ImageIcon size={18} /> },
      { href: "/admin/videos", label: "Videolar", icon: <Video size={18} /> },
      { href: "/admin/hero-slides", label: "Slayder", icon: <GalleryHorizontal size={18} /> },
      { href: "/admin/faq", label: "Savol-javoblar", icon: <HelpCircle size={18} /> },
    ],
  },
  {
    label: "Mijozlar",
    items: [
      { href: "/admin/inquiries", label: "Murojaatlar", icon: <MessageSquare size={18} /> },
      { href: "/admin/newsletter", label: "Obunachilar", icon: <Mail size={18} /> },
    ],
  },
  {
    label: "Sozlamalar",
    items: [{ href: "/admin/settings", label: "Sayt sozlamalari", icon: <Settings size={18} /> }],
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  // "/admin" must only match exactly, or it would light up on every page.
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: "0.15rem", flex: 1 }}>
      {GROUPS.map((group) => (
        <div key={group.label} style={{ display: "contents" }}>
          <span className="admin-nav-section">{group.label}</span>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link ${isActive(item.href) ? "active" : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
