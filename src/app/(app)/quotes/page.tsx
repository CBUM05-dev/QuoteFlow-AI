"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { RfqStatusBadge } from "@/components/rfq/RfqStatusBadge";
import { formatCurrency } from "@/lib/format";
import { useAppState } from "@/lib/app-state";

export default function QuotesPage() {
  const { rfqs } = useAppState();
  const quotes = rfqs
    .filter((r) => r.status === "quoted" || r.status === "sent")
    .sort((a, b) => a.receivedMinutesAgo - b.receivedMinutesAgo);

  return (
    <div className="animate-fade-up">
      <PageHeader title="Quotes" subtitle="Every quote prepared by QuoteFlow AI, approved and sent by a human." />

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="thin-scroll overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-sunken text-xs uppercase tracking-wide text-text-muted">
                  <th className="px-5 py-3 font-medium">RFQ</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Lane</th>
                  <th className="px-5 py-3 font-medium">Mode</th>
                  <th className="px-5 py-3 text-right font-medium">Quoted total</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {quotes.map((q) => (
                  <tr key={q.id} className="transition-colors duration-150 hover:bg-surface-sunken">
                    <td className="px-5 py-3.5">
                      <Link href={`/inbox/${q.id}`} className="font-medium text-accent hover:underline">
                        {q.rfqNumber}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-text-primary">{q.customer}</td>
                    <td className="px-5 py-3.5 text-text-secondary">
                      {q.origin} → {q.destination}
                    </td>
                    <td className="px-5 py-3.5 text-text-secondary">{q.mode}</td>
                    <td className="px-5 py-3.5 text-right font-data text-text-primary">{formatCurrency(q.quote.total)}</td>
                    <td className="px-5 py-3.5">
                      <RfqStatusBadge status={q.status} />
                    </td>
                  </tr>
                ))}
                {quotes.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-text-muted">
                      No quotes yet. Process an RFQ from the inbox to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
