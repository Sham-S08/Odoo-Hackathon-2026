"use client";

export default function RoleCard({ label, sublabel, icon, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-center text-center gap-1 rounded-card border border-brand-100 bg-[#FAFAFE] px-4 py-5 transition-colors hover:border-brand-300 hover:bg-brand-50"
    >
      <span className="text-2xl text-brand-500">{icon}</span>
      <p className="mt-2 text-sm font-medium text-brand-800">{label}</p>
      <p className="text-xs text-[var(--text-muted)]">{sublabel}</p>
    </button>
  );
}
