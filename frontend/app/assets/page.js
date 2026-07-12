import AppShell from "@/components/layout/AppShell";
import Table from "@/components/common/Table";
import Button from "@/components/common/Button";

const COLUMNS = [
  { key: "tag", label: "Tag" },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "status", label: "Status" },
  { key: "location", label: "Location" },
];

const ROWS = [
  { tag: "AF-0012", name: "Dell laptop", category: "Electronics", status: "Allocated", location: "Bengaluru" },
  { tag: "AF-0062", name: "Projector", category: "Electronics", status: "Maintenance", location: "HQ floor 2" },
  { tag: "AF-0201", name: "Office chair", category: "Furniture", status: "Available", location: "Warehouse" },
];

export default function AssetsPage() {
  return (
    <AppShell title="Asset registration & directory">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[var(--text-muted)]">
          Search by asset tag, serial number, or QR code.
        </p>
        <Button>Register asset</Button>
      </div>
      <Table columns={COLUMNS} rows={ROWS} />
    </AppShell>
  );
}
