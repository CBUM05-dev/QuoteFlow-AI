"use client";

import { useState } from "react";
import { Mail, Database, Users2, Bell, Save, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      onClick={() => setChecked((v) => !v)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${checked ? "bg-accent" : "bg-border-strong"}`}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function Row({ label, description, control }: { label: string; description?: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {description && <p className="mt-0.5 text-xs text-text-muted">{description}</p>}
      </div>
      {control}
    </div>
  );
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Settings"
        subtitle="Company profile, integrations, and how QuoteFlow AI fits into your workflow."
        action={
          <div className="flex items-center gap-3">
            {saved && <span className="text-xs font-medium text-success">✓ Saved</span>}
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 1800);
              }}
            >
              <Save size={13} />
              Save changes
            </Button>
          </div>
        }
      />

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader title="Company profile" subtitle="Shown on customer-facing quote emails" />
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-text-muted">Company name</span>
              <input
                defaultValue="Harborline Freight Solutions"
                className="mt-1 w-full rounded-lg border border-border-strong bg-background px-3 py-2 text-sm text-text-primary focus:border-accent"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-text-muted">Reply-to address</span>
              <input
                defaultValue="quotes@harborline.com"
                className="mt-1 w-full rounded-lg border border-border-strong bg-background px-3 py-2 text-sm text-text-primary focus:border-accent"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-medium text-text-muted">Default quote validity window</span>
              <select
                defaultValue="7 days"
                className="mt-1 w-full rounded-lg border border-border-strong bg-background px-3 py-2 text-sm text-text-primary focus:border-accent"
              >
                <option>5 days</option>
                <option>7 days</option>
                <option>14 days</option>
              </select>
            </label>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Connections"
            subtitle="Where RFQs come from and where rates live"
            action={<Database size={16} className="mt-0.5 text-text-muted" />}
          />
          <div className="divide-y divide-border">
            <Row
              label="Email inbox (Microsoft 365 / Gmail)"
              description="Ingests incoming RFQ emails automatically"
              control={<Badge tone="neutral">Not connected — demo mode</Badge>}
            />
            <Row
              label="Rate database"
              description="Currently using local demo rates"
              control={<Badge tone="warning">Demo rates</Badge>}
            />
            <Row
              label="TMS"
              description="Push approved quotes into your TMS"
              control={<Badge tone="neutral">Not connected — demo mode</Badge>}
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Notifications" subtitle="When to alert your team" action={<Bell size={16} className="mt-0.5 text-text-muted" />} />
          <div className="divide-y divide-border">
            <Row label="New RFQ received" control={<Toggle defaultChecked />} />
            <Row label="Missing information flagged" control={<Toggle defaultChecked />} />
            <Row label="Quote approved and sent" control={<Toggle />} />
            <Row label="Weekly ROI summary" control={<Toggle defaultChecked />} />
          </div>
        </Card>

        <Card>
          <CardHeader title="Team" subtitle="People who can review and approve quotes" action={<Users2 size={16} className="mt-0.5 text-text-muted" />} />
          <div className="divide-y divide-border">
            {[
              { name: "You", role: "Owner", email: "ayfadili2022@gmail.com" },
              { name: "Sam Whitfield", role: "Ops Manager", email: "sam@harborline.com" },
              { name: "Renee Ibarra", role: "Pricing", email: "renee@harborline.com" },
            ].map((m) => (
              <Row
                key={m.email}
                label={m.name}
                description={m.email}
                control={
                  <Badge tone="neutral" className="gap-1">
                    <CheckCircle2 size={11} /> {m.role}
                  </Badge>
                }
              />
            ))}
          </div>
        </Card>

        <div className="flex items-start gap-2.5 rounded-lg border border-border bg-surface-sunken px-4 py-3 text-xs text-text-muted">
          <Mail size={14} className="mt-0.5 shrink-0" />
          This is a demo environment. No real email accounts, rate databases, or TMS systems are connected.
        </div>
      </div>
    </div>
  );
}
