"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Ship, Truck, Plane } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { RfqStatusBadge } from "@/components/rfq/RfqStatusBadge";
import { useAppState } from "@/lib/app-state";
import type { RfqStatus } from "@/lib/types";

const FILTERS: { key: RfqStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "processing", label: "Processing" },
  { key: "quoted", label: "Quoted" },
  { key: "sent", label: "Sent" },
];

const MODE_ICON = { Ocean: Ship, Trucking: Truck, Air: Plane };

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function InboxPage() {
  const { rfqs } = useAppState();
  const [filter, setFilter] = useState<RfqStatus | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return [...rfqs]
      .sort((a, b) => a.receivedMinutesAgo - b.receivedMinutesAgo)
      .filter((r) => filter === "all" || r.status === filter)
      .filter((r) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          r.customer.toLowerCase().includes(q) ||
          r.rfqNumber.toLowerCase().includes(q) ||
          r.origin.toLowerCase().includes(q) ||
          r.destination.toLowerCase().includes(q)
        );
      });
  }, [rfqs, filter, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rfqs.length };
    for (const r of rfqs) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [rfqs]);

  return (
    <div className="animate-fade-up">
      <PageHeader title="RFQ Inbox" subtitle="Every incoming request for quote, in one queue." />

      <div className="border-b border-border bg-surface px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                  filter === f.key
                    ? "bg-accent-soft text-accent"
                    : "text-text-secondary hover:bg-surface-sunken"
                }`}
              >
                {f.label}
                <span className="ml-1.5 text-text-muted">{counts[f.key] ?? 0}</span>
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search customer, lane, RFQ #"
              className="w-full rounded-lg border border-border-strong bg-background py-1.5 pl-8 pr-3 text-xs text-text-primary placeholder:text-text-muted focus:border-accent"
            />
          </div>
        </div>
      </div>

      <ul className="divide-y divide-border">
        {filtered.map((rfq, i) => {
          const ModeIcon = MODE_ICON[rfq.mode];
          return (
            <li key={rfq.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 30}ms` }}>
              <Link
                href={`/inbox/${rfq.id}`}
                className="flex items-center gap-4 px-4 py-3.5 transition-colors duration-150 hover:bg-surface-sunken sm:px-6 lg:px-8"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-xs font-semibold text-accent">
                  {initials(rfq.customer)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={`truncate text-sm ${
                        rfq.status === "new" ? "font-semibold text-text-primary" : "font-medium text-text-primary"
                      }`}
                    >
                      {rfq.rfqNumber} — {rfq.customer}
                    </p>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-text-muted">
                    {rfq.origin} → {rfq.destination} · {rfq.equipment}
                  </p>
                </div>
                <div className="hidden shrink-0 items-center gap-1.5 text-xs text-text-muted sm:flex">
                  <ModeIcon size={13} />
                  {rfq.mode}
                </div>
                <span className="hidden w-16 shrink-0 text-right text-xs text-text-muted sm:block">
                  {rfq.receivedLabel}
                </span>
                <div className="shrink-0">
                  <RfqStatusBadge status={rfq.status} />
                </div>
              </Link>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="px-6 py-12 text-center text-sm text-text-muted">No RFQs match this filter.</li>
        )}
      </ul>
    </div>
  );
}
