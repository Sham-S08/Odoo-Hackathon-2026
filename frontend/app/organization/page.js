import AppShell from "@/components/layout/AppShell";
import Table from "@/components/common/Table";

const COLUMNS = [
  { key: "name", label: "Department" },
  { key: "head", label: "Head" },
  { key: "parent", label: "Parent dept" },
  { key: "status", label: "Status" },
];

const ROWS = [
  { name: "Engineering", head: "Aditi Rao", parent: "—", status: "Active" },
  { name: "Facilities", head: "Rohan Mehta", parent: "—", status: "Active" },
  { name: "Field ops (east)", head: "Sana Iqbal", parent: "Field ops", status: "Inactive" },
];

export default function OrganizationPage() {
  return (
    <AppShell title="Organization setup">
      <p className="mb-4 text-sm text-[var(--text-muted)]">
        Departments, asset categories, and the employee directory. Editing here
        drives the picklists across assets, allocations, and reports.
      </p>
      <Table columns={COLUMNS} rows={ROWS} />
    </AppShell>
  );
}
