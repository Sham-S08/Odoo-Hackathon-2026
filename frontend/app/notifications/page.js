import AppShell from "@/components/layout/AppShell";

const FILTERS = ["All", "Alerts", "Approvals", "Bookings"];

const NOTIFICATIONS = [
  { message: "Laptop AF-0014 assigned to Priya Shah", time: "2m ago" },
  { message: "Maintenance request AF-0055 approved", time: "18m ago" },
  { message: "Booking confirmed — Room B2, 2:00 to 3:00 PM", time: "1h ago" },
  { message: "Transfer approved — AF-0033 to Facilities dept", time: "3h ago" },
  { message: "Overdue return — AF-0021 was due 3 days ago", time: "1d ago" },
  { message: "Audit discrepancy flagged — AF-0099 damaged", time: "2d ago" },
];

export default function NotificationsPage() {
  return (
    <AppShell title="Notifications & activity logs">
      <div className="mb-4 flex gap-2">
        {FILTERS.map((f) => (
          <span
            key={f}
            className="rounded-full border border-brand-100 px-3 py-1 text-xs text-[#5F5E5A]"
          >
            {f}
          </span>
        ))}
      </div>
      <ul className="flex flex-col gap-3">
        {NOTIFICATIONS.map((n, i) => (
          <li
            key={i}
            className="flex items-center justify-between border-b border-brand-100 pb-3 text-sm last:border-none"
          >
            <span>{n.message}</span>
            <span className="text-xs text-[var(--text-muted)]">{n.time}</span>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
