"use client";

export default function Input({ label, className = "", ...props }) {
  return (
    <label className="flex flex-col gap-1 text-left">
      {label && (
        <span className="text-xs text-[#5F5E5A]">{label}</span>
      )}
      <input
        className={`w-full rounded-lg border border-brand-100 px-3 py-2 text-sm text-[#1A1730] outline-none placeholder:text-[var(--text-muted)] focus:border-brand-400 focus:ring-1 focus:ring-brand-300 ${className}`}
        {...props}
      />
    </label>
  );
}
