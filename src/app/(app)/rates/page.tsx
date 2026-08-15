"use client";

import { useState } from "react";
import { Ship, Truck, Plane, Save } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RATES } from "@/lib/mock-data";
import type { RateRow } from "@/lib/types";

const MODE_ICON = { Ocean: Ship, Trucking: Truck, Air: Plane };

export default function RatesPage() {
  const [rates, setRates] = useState<RateRow[]>(RATES);
  const [savedNotice, setSavedNotice] = useState(false);

  function updateRate(id: string, baseRate: number) {
    setRates((prev) => prev.map((r) => (r.id === id ? { ...r, baseRate } : r)));
  }

  function handleSave() {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 1800);
  }

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Rates"
        subtitle="Base rates used by the quote builder. Edit here to reflect current carrier pricing."
        action={
          <div className="flex items-center gap-3">
            {savedNotice && <span className="text-xs font-medium text-success">✓ Rates saved</span>}
            <Button variant="primary" size="sm" onClick={handleSave}>
              <Save size={13} />
              Save changes
            </Button>
          </div>
        }
      />

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="thin-scroll overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-sunken text-xs uppercase tracking-wide text-text-muted">
                  <th className="px-5 py-3 font-medium">Route</th>
                  <th className="px-5 py-3 font-medium">Mode</th>
                  <th className="px-5 py-3 font-medium">Container / Equipment</th>
                  <th className="px-5 py-3 font-medium">Carrier</th>
                  <th className="px-5 py-3 text-right font-medium">Base rate (USD)</th>
                  <th className="px-5 py-3 font-medium">Valid until</th>
                  <th className="px-5 py-3 font-medium">Additional charges</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rates.map((r) => {
                  const ModeIcon = MODE_ICON[r.mode];
                  return (
                    <tr key={r.id} className="transition-colors duration-150 hover:bg-surface-sunken">
                      <td className="px-5 py-3.5 font-medium text-text-primary">{r.route}</td>
                      <td className="px-5 py-3.5">
                        <Badge tone="neutral" className="gap-1">
                          <ModeIcon size={12} /> {r.mode}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-text-secondary">{r.container}</td>
                      <td className="px-5 py-3.5 text-text-secondary">{r.carrier}</td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1 font-data text-text-primary">
                          $
                          <input
                            type="number"
                            value={r.baseRate}
                            onChange={(e) => updateRate(r.id, Number(e.target.value))}
                            className="w-20 rounded-md border border-border-strong bg-background px-2 py-1 text-right focus:border-accent"
                          />
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-text-secondary">{r.validUntil}</td>
                      <td className="px-5 py-3.5 max-w-[220px] text-xs text-text-muted">{r.additionalCharges}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
