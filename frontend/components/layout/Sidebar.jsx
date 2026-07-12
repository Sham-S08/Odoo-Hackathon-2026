"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard,
  Building2,
  Package,
  ArrowLeftRight,
  Calendar,
  Wrench,
  CheckSquare,
  BarChart3,
  Bell,
  User,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Organization", href: "/organization", icon: Building2 },
  { label: "Assets", href: "/assets", icon: Package },
  { label: "Allocation & Transfer", href: "/allocations", icon: ArrowLeftRight },
  { label: "Resource Booking", href: "/bookings", icon: Calendar },
  { label: "Maintenance", href: "/maintenance", icon: Wrench },
  { label: "Audit", href: "/audits", icon: CheckSquare },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Profile", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <aside className="hidden w-60 shrink-0 border-r border-brand-100 bg-white px-3 py-6 sm:block">
      <div className="mb-8 flex items-center gap-2 px-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-brand-600 text-white text-sm font-bold shadow-lg shadow-brand-500/25">
          AF
        </div>
        <span className="text-sm font-bold text-brand-800">AssetFlow</span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-brand-50 text-brand-800 font-medium"
                  : "text-[#5F5E5A] hover:bg-brand-50 hover:text-brand-800"
              }`}
            >
              <Icon size={18} className={active ? "text-brand-500" : "text-[#5F5E5A]"} />
              {item.label}
            </Link>
          );
        })}
        
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors mt-4"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </aside>
  );
}