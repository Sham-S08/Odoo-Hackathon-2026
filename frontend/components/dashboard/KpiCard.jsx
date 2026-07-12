export default function KpiCard({ label, value, tone = "default" }) {
  const tones = {
    default: "bg-brand-50 text-brand-800",
    danger: "bg-red-50 text-red-700",
  };

  return (
    <div className={`rounded-card px-4 py-4 ${tones[tone]}`}>
      <p className="text-xs opacity-80">{label}</p>
      <p className="mt-1 text-2xl font-medium">{value}</p>
    </div>
  );
}
