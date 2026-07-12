"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    { label: "Register asset", href: "/assets?action=register" },
    { label: "Book resource", href: "/bookings?action=book" },
    { label: "Raise maintenance request", href: "/maintenance?action=raise" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="secondary"
          onClick={() => router.push(action.href)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
