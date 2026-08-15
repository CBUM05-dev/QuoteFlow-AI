"use client";

import { Info } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { QuoteLineItem } from "@/lib/types";

export function QuoteBuilder({
  lineItems,
  editable,
  onChangeAmount,
  transitEstimate,
  validityWindow,
}: {
  lineItems: QuoteLineItem[];
  editable: boolean;
  onChangeAmount: (index: number, amount: number) => void;
  transitEstimate: string;
  validityWindow: string;
}) {
  const total = lineItems.reduce((sum, li) => sum + li.amount, 0);

  return (
    <div>
      <div className="divide-y divide-border">
        {lineItems.map((li, i) => (
          <div key={li.label} className="animate-fade-up flex items-center justify-between gap-3 px-5 py-2.5" style={{ animationDelay: `${i * 40}ms` }}>
            <span className="text-sm text-text-secondary">{li.label}</span>
            {editable ? (
              <div className="flex items-center gap-1 font-data text-sm text-text-primary">
                $
                <input
                  type="number"
                  value={li.amount}
                  onChange={(e) => onChangeAmount(i, Number(e.target.value))}
                  className="w-20 rounded-md border border-accent bg-background px-1.5 py-0.5 text-right"
                />
              </div>
            ) : (
              <span className="font-data text-sm text-text-primary">{formatCurrency(li.amount)}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border-strong bg-surface-sunken px-5 py-3.5">
        <span className="font-display text-sm font-semibold text-text-primary">Customer total</span>
        <span className="font-display font-data text-lg font-semibold text-text-primary">{formatCurrency(total)}</span>
      </div>

      <div className="space-y-1.5 px-5 py-3.5 text-xs text-text-secondary">
        <div className="flex justify-between">
          <span className="text-text-muted">Estimated transit</span>
          <span className="font-medium text-text-primary">{transitEstimate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Validity</span>
          <span className="font-medium text-text-primary">{validityWindow}</span>
        </div>
      </div>

      <div className="mx-5 mb-4 flex items-start gap-2 rounded-lg border border-border bg-surface-sunken px-3 py-2.5">
        <Info size={13} className="mt-0.5 shrink-0 text-text-muted" />
        <p className="text-[11px] leading-snug text-text-muted">
          Demo rates — connected to your rate database in production.
        </p>
      </div>
    </div>
  );
}
