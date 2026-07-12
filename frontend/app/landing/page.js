"use client";

import { useState } from "react";
import RoleCard from "@/components/landing/RoleCard";
import LoginModal from "@/components/landing/LoginModal";

const ROLES = [
  { label: "Admin", sublabel: "Full control", icon: "🛡️" },
  { label: "Asset Manager", sublabel: "Allocate and approve", icon: "📋" },
  { label: "Department Head", sublabel: "Approve within dept", icon: "🧑‍🤝‍🧑" },
  { label: "Employee", sublabel: "View and request", icon: "👤" },
];

export default function LandingPage() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-14 text-center">
      <div className="mb-9 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-white">
          📦
        </div>
        <span className="text-sm font-medium text-brand-800">AssetFlow</span>
      </div>

      <h1 className="mb-2 max-w-xl text-2xl font-medium text-[#1A1730] sm:text-3xl">
        Know what you have. Know who has it.
      </h1>
      <p className="mb-10 max-w-md text-sm text-[#5F5E5A]">
        One place to track assets, book resources, and route maintenance and
        audits, built for how your organization actually works.
      </p>

      <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
        {ROLES.map((role) => (
          <RoleCard
            key={role.label}
            label={role.label}
            sublabel={role.sublabel}
            icon={role.icon}
            onSelect={() => setSelectedRole(role.label)}
          />
        ))}
      </div>

      {selectedRole && (
        <LoginModal role={selectedRole} onClose={() => setSelectedRole(null)} />
      )}
    </main>
  );
}
