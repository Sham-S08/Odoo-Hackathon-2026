"use client";

import { useAuth } from "@/hooks/useAuth";
import { Bell, User } from "lucide-react";
import Link from "next/link";

export default function Navbar({ title }) {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-brand-100 bg-white px-6 py-4">
      <h1 className="text-lg font-medium text-brand-800">{title}</h1>
      <div className="flex items-center gap-3">
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-[#5F5E5A] hover:bg-brand-50 transition-colors"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-xs font-medium text-brand-700">
            {user?.name?.slice(0, 2)?.toUpperCase() || "AF"}
          </div>
          <span className="text-sm text-[#5F5E5A] hidden md:inline">
            {user?.name || "User"}
          </span>
        </div>
      </div>
    </header>
  );
}