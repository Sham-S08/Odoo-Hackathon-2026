import AppShell from "@/components/layout/AppShell";
import Button from "@/components/common/Button";

const SLOTS = [
  { time: "9:00", label: "Booked — procurement team, 9 to 10", state: "booked" },
  { time: "10:00", label: "Requested 9:30 to 10:30 — conflict, slot is unavailable", state: "conflict" },
  { time: "11:00", label: "Open", state: "open" },
  { time: "12:00", label: "Open", state: "open" },
];

export default function BookingsPage() {
  return (
    <AppShell title="Resource booking">
      <p className="mb-4 text-sm text-[var(--text-muted)]">
        Conference room B2 — Tuesday, 7 Jul
      </p>
      <div className="flex max-w-lg flex-col gap-2">
        {SLOTS.map((slot) => (
          <div
            key={slot.time}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
              slot.state === "booked"
                ? "border-blue-100 bg-blue-50 text-blue-700"
                : slot.state === "conflict"
                ? "border-red-100 bg-red-50 text-red-700"
                : "border-brand-100 text-[#5F5E5A]"
            }`}
          >
            <span className="w-12 font-medium">{slot.time}</span>
            <span>{slot.label}</span>
          </div>
        ))}
      </div>
      <Button className="mt-4">Book a slot</Button>
    </AppShell>
  );
}
