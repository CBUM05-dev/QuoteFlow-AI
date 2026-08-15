"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, PlayCircle, Ship, Truck, AlertTriangle, Layers } from "lucide-react";
import { useAppState } from "@/lib/app-state";

const SCENARIOS = [
  {
    id: "10482",
    mode: "forwarding" as const,
    title: "Ocean Freight RFQ",
    description: "Clean RFQ, all fields detected",
    icon: Ship,
  },
  {
    id: "10481",
    mode: "trucking" as const,
    title: "Trucking RFQ",
    description: "Full truckload, Chicago → Dallas",
    icon: Truck,
  },
  {
    id: "10483",
    mode: "forwarding" as const,
    title: "Incomplete RFQ",
    description: "Missing container size — flags for review",
    icon: AlertTriangle,
  },
  {
    id: "queue",
    mode: "forwarding" as const,
    title: "Multiple RFQs Queued",
    description: "See the inbox backlog in one view",
    icon: Layers,
  },
];

export function DemoModeMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setMode, setRfqStatus, resolveMissingInfo } = useAppState();

  function runScenario(scenario: (typeof SCENARIOS)[number]) {
    setOpen(false);
    setMode(scenario.mode);
    if (scenario.id === "queue") {
      router.push("/inbox");
      return;
    }
    setRfqStatus(scenario.id, "new");
    resolveMissingInfo(scenario.id, "edited");
    router.push(`/inbox/${scenario.id}?autoplay=1`);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface px-3.5 py-2 text-sm font-medium text-text-primary transition-colors duration-150 hover:bg-surface-sunken"
      >
        <PlayCircle size={16} className="text-accent" strokeWidth={2} />
        Demo Mode
        <ChevronDown size={14} className={`text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-80 animate-fade-up rounded-xl border border-border bg-surface p-2 shadow-lg shadow-black/10">
            <p className="px-3 pb-2 pt-1.5 text-xs font-medium uppercase tracking-wide text-text-muted">
              Preset scenarios
            </p>
            {SCENARIOS.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => runScenario(s)}
                  className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150 hover:bg-surface-sunken"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
                    <Icon size={14} strokeWidth={2.25} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{s.title}</p>
                    <p className="text-xs text-text-muted">{s.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
