"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Navbar({ title }) {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-brand-100 bg-white px-6 py-4">
      <h1 className="text-lg font-medium text-brand-800">{title}</h1>
      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="rounded-full p-2 text-[#5F5E5A] hover:bg-brand-50"
        >
          🔔
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-xs font-medium text-brand-700">
          {user?.name?.slice(0, 2)?.toUpperCase() || "AF"}
        </div>
      </div>
    </header>
  );
}
