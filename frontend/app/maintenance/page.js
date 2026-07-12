import AppShell from "@/components/layout/AppShell";

const COLUMNS = [
  { title: "Pending", cards: ["AF-0062 — projector bulb not turning on"] },
  { title: "Approved", cards: ["AF-003 — AC unit noisy compressor"] },
  { title: "Technician assigned", cards: ["AF-0098 — forklift, tech R varma"] },
  { title: "In progress", cards: ["AF-897 — printer jam, parts ordered"] },
  { title: "Resolved", cards: ["AF-923 — chair repair resolved 7 Jul"] },
];

export default function MaintenancePage() {
  return (
    <AppShell title="Maintenance management">
      <p className="mb-4 text-sm text-[var(--text-muted)]">
        Approving a card moves the asset to under maintenance. Resolving
        returns it to available.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {COLUMNS.map((col) => (
          <div key={col.title} className="rounded-card border border-brand-100 p-3">
            <h3 className="mb-2 text-xs font-medium text-brand-800">{col.title}</h3>
            <div className="flex flex-col gap-2">
              {col.cards.map((card) => (
                <div
                  key={card}
                  className="rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-800"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
