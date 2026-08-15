import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { CUSTOMERS } from "@/lib/mock-data";

export default function CustomersPage() {
  return (
    <div className="animate-fade-up">
      <PageHeader title="Customers" subtitle="Accounts sending RFQs through QuoteFlow AI." />

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="thin-scroll overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-sunken text-xs uppercase tracking-wide text-text-muted">
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Primary lane</th>
                  <th className="px-5 py-3 text-right font-medium">RFQs this month</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {CUSTOMERS.map((c) => (
                  <tr key={c.id} className="transition-colors duration-150 hover:bg-surface-sunken">
                    <td className="px-5 py-3.5 font-medium text-text-primary">{c.name}</td>
                    <td className="px-5 py-3.5 text-text-secondary">
                      {c.contact}
                      <span className="block text-xs text-text-muted">{c.email}</span>
                    </td>
                    <td className="px-5 py-3.5 text-text-secondary">{c.lanes}</td>
                    <td className="px-5 py-3.5 text-right font-data text-text-primary">{c.rfqsThisMonth}</td>
                    <td className="px-5 py-3.5">
                      <Badge tone={c.status === "Active" ? "success" : "neutral"} dot>
                        {c.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
