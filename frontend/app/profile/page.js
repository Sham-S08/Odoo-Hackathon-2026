import AppShell from "@/components/layout/AppShell";
import Button from "@/components/common/Button";

export default function ProfilePage() {
  return (
    <AppShell title="Profile">
      <div className="max-w-md rounded-card border border-brand-100 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 font-medium">
            PS
          </div>
          <div>
            <p className="text-sm font-medium text-brand-800">Priya Shah</p>
            <p className="text-xs text-[var(--text-muted)]">Employee — Engineering</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Update information</Button>
          <Button variant="secondary">Change password</Button>
        </div>
      </div>
    </AppShell>
  );
}
