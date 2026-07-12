import AppShell from "@/components/layout/AppShell";
import Button from "@/components/common/Button";

export default function ReportsPage() {
  return (
    <AppShell title="Reports & analytics">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-card bg-brand-50 p-4">
          <p className="mb-2 text-sm font-medium text-brand-800">
            Utilization by department
          </p>
          <div className="h-32 rounded-lg bg-brand-100" />
        </div>
        <div className="rounded-card bg-brand-50 p-4">
          <p className="mb-2 text-sm font-medium text-brand-800">
            Maintenance frequency
          </p>
          <div className="h-32 rounded-lg bg-brand-100" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-brand-800">Most used assets</p>
          <p className="text-sm text-[var(--text-muted)]">
            Room B2 — 24 bookings this month
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-brand-800">Idle assets</p>
          <p className="text-sm text-[var(--text-muted)]">
            Camera AF-0501 — unused 60+ days
          </p>
        </div>
      </div>

      <Button className="mt-6">Export report</Button>
    </AppShell>
  );
}
