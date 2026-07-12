export default function RecentActivity({ items = [] }) {
  if (!items.length) {
    return (
      <p className="text-sm text-[#5F5E5A] text-center py-8">
        No recent activity.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b border-brand-100 pb-3 last:border-none last:pb-0"
        >
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
            <p className="text-sm text-[#1A1730]">{item.message}</p>
          </div>
          <span className="text-xs text-[#5F5E5A] flex-shrink-0 ml-4">
            {item.time}
          </span>
        </div>
      ))}
    </div>
  );
}