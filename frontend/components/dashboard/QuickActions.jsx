"use client";

import { useRouter } from "next/navigation";
import { Plus, Calendar, Wrench } from "lucide-react";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    { 
      label: "Register Asset", 
      icon: Plus,
      href: "/assets?action=register",
      color: "bg-brand-50 text-brand-600 hover:bg-brand-100"
    },
    { 
      label: "Book Resource", 
      icon: Calendar,
      href: "/bookings?action=book",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100"
    },
    { 
      label: "Raise Maintenance", 
      icon: Wrench,
      href: "/maintenance?action=raise",
      color: "bg-amber-50 text-amber-600 hover:bg-amber-100"
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-brand-100 p-6">
      <h3 className="text-sm font-semibold text-brand-800 mb-4">Quick Actions</h3>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => router.push(action.href)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-105 ${action.color}`}
            >
              <Icon size={16} />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}