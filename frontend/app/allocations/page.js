import AppShell from "@/components/layout/AppShell";
import Button from "@/components/common/Button";

export default function AllocationsPage() {
  return (
    <AppShell title="Asset allocation & transfer">
      <div className="max-w-lg rounded-card border border-red-100 bg-red-50 p-4 text-sm text-red-700">
        Already allocated to Priya Shah (Engineering). Direct re-allocation is
        blocked — submit a transfer request below.
      </div>

      <div className="mt-6 max-w-lg">
        <h2 className="mb-3 text-sm font-medium text-brand-800">
          Transfer request
        </h2>
        <p className="mb-4 text-sm text-[var(--text-muted)]">
          From Priya Shah to a new employee, with a reason for the transfer.
        </p>
        <Button>Submit request</Button>
      </div>
    </AppShell>
  );
}
