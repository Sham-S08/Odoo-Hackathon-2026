export default function KpiCard({ label, value, icon: Icon, color = "default" }) {
  const colors = {
    default: "bg-brand-50 text-brand-800 border-brand-100",
    blue: "bg-blue-50 text-blue-800 border-blue-100",
    green: "bg-green-50 text-green-800 border-green-100",
    amber: "bg-amber-50 text-amber-800 border-amber-100",
    purple: "bg-purple-50 text-purple-800 border-purple-100",
    red: "bg-red-50 text-red-800 border-red-100",
  };

  return (
    <div className={`rounded-xl border p-4 ${colors[color] || colors.default}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium opacity-80">{label}</p>
        {Icon && <Icon size={16} className="opacity-60" />}
      </div>
      <p className="mt-1 text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}