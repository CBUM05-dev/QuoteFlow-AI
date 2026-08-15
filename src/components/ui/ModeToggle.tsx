"use client";

import { Ship, Truck } from "lucide-react";
import { useAppState } from "@/lib/app-state";

export function ModeToggle() {
  const { mode, setMode } = useAppState();

  return (
    <div className="inline-flex items-center rounded-lg border border-border-strong bg-surface-sunken p-1 text-sm">
      <button
        onClick={() => setMode("forwarding")}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors duration-150 ${
          mode === "forwarding" ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
        }`}
      >
        <Ship size={14} strokeWidth={2.25} />
        Freight Forwarding
      </button>
      <button
        onClick={() => setMode("trucking")}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors duration-150 ${
          mode === "trucking" ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
        }`}
      >
        <Truck size={14} strokeWidth={2.25} />
        Trucking
      </button>
    </div>
  );
}
