export default function RecentActivity({ items = [] }) {
  if (!items.length) {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        No recent notifications.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-center justify-between border-b border-brand-100 pb-3 text-sm last:border-none last:pb-0"
        >
          <span className="text-[#1A1730]">{item.message}</span>
          <span className="text-xs text-[var(--text-muted)]">{item.time}</span>
        </li>
      ))}
    </ul>
  );
}
