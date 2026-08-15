"use client";

import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RfqStatusBadge } from "@/components/rfq/RfqStatusBadge";
import { useAppState } from "@/lib/app-state";

export default function DashboardPage() {
  const { rfqs, dashboardStats } = useAppState();
  const recentRfqs = [...rfqs].sort((a, b) => a.receivedMinutesAgo - b.receivedMinutesAgo).slice(0, 4);

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Dashboard"
        subtitle="Turn incoming RFQs into quote-ready responses faster. Automate the repetitive work — keep pricing decisions under human control."
        action={<Badge tone="neutral">Demo environment</Badge>}
      />

      <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Today</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatTile label="RFQs received" value={dashboardStats.rfqsToday} sub="Across all lanes" />
            <StatTile label="Pending" value={dashboardStats.pendingToday} sub="Awaiting review" />
            <StatTile label="Quotes prepared" value={dashboardStats.quotesPreparedToday} sub="Ready or sent" />
            <StatTile
              label="Avg. response time"
              value={`${dashboardStats.avgResponseMinutes} min`}
              sub={`↓ ${dashboardStats.responseTimeReduction}% potential reduction`}
              accent
            />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader
              title="Recent RFQ activity"
              subtitle="Latest incoming requests across every lane"
              action={
                <Link href="/inbox" className="flex items-center gap-1 text-xs font-medium text-accent hover:underline">
                  View inbox <ArrowRight size={13} />
                </Link>
              }
            />
            <ul className="divide-y divide-border">
              {recentRfqs.map((rfq) => (
                <li key={rfq.id}>
                  <Link
                    href={`/inbox/${rfq.id}`}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors duration-150 hover:bg-surface-sunken"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-text-primary">
                        {rfq.rfqNumber} — {rfq.customer}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-text-muted">
                        {rfq.origin} → {rfq.destination} · {rfq.mode} · {rfq.receivedLabel}
                      </p>
                    </div>
                    <RfqStatusBadge status={rfq.status} />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="flex flex-col justify-between bg-gradient-to-br from-accent to-accent-hover text-white">
            <div className="p-5">
              <Sparkles size={18} className="mb-3 opacity-90" strokeWidth={2} />
              <h3 className="font-display text-base font-semibold tracking-tight">See the time savings</h3>
              <p className="mt-1.5 text-sm text-white/80">
                Compare manual quoting to AI-assisted quoting across a typical week of RFQs.
              </p>
            </div>
            <div className="p-5 pt-0">
              <Link href="/roi">
                <Button variant="secondary" className="w-full !border-white/30 !bg-white/10 !text-white hover:!bg-white/20">
                  Open ROI breakdown <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </Card>
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">All-time analytics</h2>
            <Clock size={12} className="text-text-muted" />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
            <StatTile label="RFQs processed" value={dashboardStats.rfqsProcessed} />
            <StatTile label="Quotes prepared" value={dashboardStats.quotesPreparedTotal} />
            <StatTile label="Avg. processing time" value={`${dashboardStats.avgProcessingMinutes} min`} />
            <StatTile label="Avg. manual time" value={`${dashboardStats.avgManualMinutes} min`} />
            <StatTile label="Time saved" value={`${dashboardStats.timeSavedHours} hrs`} accent />
            <StatTile label="Pending" value={dashboardStats.pendingTotal} />
          </div>
        </section>
      </div>
    </div>
  );
}
