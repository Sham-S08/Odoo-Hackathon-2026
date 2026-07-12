"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "🏠" },
  { label: "Organization setup", href: "/organization", icon: "🏢" },
  { label: "Assets", href: "/assets", icon: "📦" },
  { label: "Allocation & transfer", href: "/allocations", icon: "🔁" },
  { label: "Resource booking", href: "/bookings", icon: "📅" },
  { label: "Maintenance", href: "/maintenance", icon: "🛠️" },
  { label: "Audit", href: "/audits", icon: "✅" },
  { label: "Reports", href: "/reports", icon: "📊" },
  { label: "Notifications", href: "/notifications", icon: "🔔" },
  { label: "Profile", href: "/profile", icon: "👤" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-brand-100 bg-white px-3 py-6 sm:block">
      <div className="mb-8 flex items-center gap-2 px-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-white text-sm">
          📦
        </div>
        <span className="text-sm font-medium text-brand-800">AssetFlow</span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-brand-50 text-brand-800 font-medium"
                  : "text-[#5F5E5A] hover:bg-brand-50 hover:text-brand-800"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
