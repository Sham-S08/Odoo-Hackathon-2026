export default function Loader({ label = "Loading…" }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-sm text-[var(--text-muted)]">
      <span className="h-3 w-3 animate-spin rounded-full border-2 border-brand-300 border-t-brand-600" />
      {label}
    </div>
  );
}
