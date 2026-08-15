import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";

const MANUAL_STEPS = [
  { label: "Read the RFQ", minutes: 5 },
  { label: "Extract shipment details", minutes: 7 },
  { label: "Find applicable rates", minutes: 8 },
  { label: "Prepare the quote", minutes: 7 },
  { label: "Format & send response", minutes: 3 },
];

const AI_STEPS = [
  { label: "Extraction", minutes: 0.1, note: "seconds" },
  { label: "Missing-info detection", minutes: 0.1, note: "automatic" },
  { label: "Rate matching", minutes: 0.1, note: "automatic" },
  { label: "Quote preparation", minutes: 0.1, note: "automatic" },
  { label: "Human review & send", minutes: 4, note: "3–5 min" },
];

const MANUAL_TOTAL = MANUAL_STEPS.reduce((s, x) => s + x.minutes, 0);
const AI_TOTAL_LOW = 5;
const AI_TOTAL_HIGH = 8;

function StepBar({ label, minutes, max, note }: { label: string; minutes: number; max: number; note?: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-text-secondary">{label}</span>
        <span className="font-data text-text-muted">{note ?? `${minutes} min`}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-sunken">
        <div
          className="h-full rounded-full bg-text-muted/50"
          style={{ width: `${Math.max(4, (minutes / max) * 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function RoiPage() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="ROI Breakdown"
        subtitle="What changes when AI handles the repetitive work and a human still approves every quote."
      />

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-primary">
          <ArrowLeft size={13} /> Back to dashboard
        </Link>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader title="Manual quoting" subtitle="Per RFQ, start to finish" />
            <div className="space-y-3.5 px-5 py-5">
              {MANUAL_STEPS.map((s) => (
                <StepBar key={s.label} label={s.label} minutes={s.minutes} max={MANUAL_TOTAL} />
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-border bg-surface-sunken px-5 py-3.5">
              <span className="text-sm font-medium text-text-primary">Total</span>
              <span className="font-display font-data text-lg font-semibold text-text-primary">{MANUAL_TOTAL} min / RFQ</span>
            </div>
          </Card>

          <Card className="border-accent-soft-border">
            <CardHeader title="AI-assisted quoting" subtitle="Per RFQ, start to finish" />
            <div className="space-y-3.5 px-5 py-5">
              {AI_STEPS.map((s) => (
                <StepBar key={s.label} label={s.label} minutes={s.minutes} max={MANUAL_TOTAL} note={s.note} />
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-accent-soft-border bg-accent-soft px-5 py-3.5">
              <span className="text-sm font-medium text-text-primary">Total</span>
              <span className="font-display font-data text-lg font-semibold text-accent">
                {AI_TOTAL_LOW}–{AI_TOTAL_HIGH} min / RFQ
              </span>
            </div>
          </Card>
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-border bg-surface-sunken px-4 py-2.5 text-xs text-text-muted">
          <Info size={13} className="mt-0.5 shrink-0" />
          Illustrative example — actual savings depend on workflow.
        </div>

        <Card>
          <CardHeader title="At 30 RFQs per week" subtitle="Time recovered for your team" />
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
            <StatTile label="Manual" value="15 hrs/week" />
            <StatTile label="AI-assisted" value="~4 hrs/week" accent />
            <StatTile label="Recovered" value="~11 hrs/week" accent />
          </div>
          <div className="flex items-start gap-2 border-t border-border px-5 py-3.5 text-xs text-text-muted">
            <Info size={13} className="mt-0.5 shrink-0" />
            Illustrative estimate. The goal isn&rsquo;t replacing your pricing team — it&rsquo;s letting the same team
            handle more RFQs without hiring.
          </div>
        </Card>
      </div>
    </div>
  );
}
