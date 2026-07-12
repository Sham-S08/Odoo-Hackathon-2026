"use client";

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60";

  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600",
    secondary:
      "bg-white text-brand-700 border border-brand-200 hover:bg-brand-50",
    ghost: "text-brand-700 hover:bg-brand-50",
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}
