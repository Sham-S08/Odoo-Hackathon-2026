import AppShell from "@/components/layout/AppShell";
import Table from "@/components/common/Table";
import Button from "@/components/common/Button";

const COLUMNS = [
  { key: "asset", label: "Asset" },
  { key: "location", label: "Expected location" },
  { key: "status", label: "Verification" },
];

const ROWS = [
  { asset: "AF-003 Dell laptop", location: "Desk E12", status: "Verified" },
  { asset: "AF-9921 Office chair", location: "Desk E14", status: "Missing" },
  { asset: "AF-9839 Monitor", location: "Desk E15", status: "Damaged" },
];

export default function AuditsPage() {
  return (
    <AppShell title="Asset audit">
      <p className="mb-1 text-sm font-medium text-brand-800">
        Q3 audit — Engineering dept, 1–15 Jul
      </p>
      <p className="mb-4 text-sm text-[var(--text-muted)]">
        Auditors: A. Rao, S. Iqbal
      </p>
      <Table columns={COLUMNS} rows={ROWS} />
      <div className="mt-4 rounded-card bg-brand-50 p-3 text-sm text-brand-800">
        2 assets flagged — discrepancy report generated automatically.
      </div>
      <Button className="mt-4">Close audit cycle</Button>
    </AppShell>
  );
}
