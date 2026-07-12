import AppShell from "@/components/layout/AppShell";
import KpiCard from "@/components/dashboard/KpiCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";

const KPIS = [
  { label: "Assets available", value: 128 },
  { label: "Assets allocated", value: 76 },
  { label: "Resources booked today", value: 9 },
  { label: "Maintenance requests", value: 5 },
  { label: "Pending transfer requests", value: 3 },
  { label: "Upcoming returns", value: 12 },
  { label: "Overdue returns", value: 3, tone: "danger" },
  { label: "Active audit cycles", value: 2 },
];

const RECENT_ACTIVITY = [
  { message: "Laptop AF-0114 allocated to Priya Shah — IT dept", time: "2m ago" },
  { message: "Room B2 booking confirmed — 2:00 to 3:00 PM", time: "18m ago" },
  { message: "Projector AF-0062 maintenance resolved", time: "1h ago" },
];

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      <section className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {KPIS.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-medium text-brand-800">Quick actions</h2>
        <QuickActions />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-brand-800">
          Recent notifications
        </h2>
        <RecentActivity items={RECENT_ACTIVITY} />
      </section>
    </AppShell>
  );
}
