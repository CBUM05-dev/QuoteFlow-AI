"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Ship,
  Truck,
  Sparkles,
  Mail,
  FileText,
  ShieldCheck,
  Pencil,
  Save,
  CheckCircle2,
  ScanSearch,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RfqStatusBadge } from "@/components/rfq/RfqStatusBadge";
import { ProcessingOverlay } from "@/components/rfq/ProcessingOverlay";
import { ExtractionFieldRow } from "@/components/rfq/ExtractionField";
import { QuoteBuilder } from "@/components/rfq/QuoteBuilder";
import { EmailDraftPanel } from "@/components/rfq/EmailDraftPanel";
import { useAppState } from "@/lib/app-state";
import type { QuoteLineItem } from "@/lib/types";

const FORWARDING_DEMO_ID = "10482";
const TRUCKING_DEMO_ID = "10481";

type Resolution = "asked" | "assumed" | "edited";

export function RfqDetailClient({ id, autoplay }: { id: string; autoplay: boolean }) {
  const { getRfq, setRfqStatus, markQuoteSent, setMode } = useAppState();
  const rfq = getRfq(id);
  const router = useRouter();

  const [resolutions, setResolutions] = useState<Record<string, Resolution>>({});
  const [quoteEditable, setQuoteEditable] = useState(false);
  const [quoteItems, setQuoteItems] = useState<QuoteLineItem[]>(rfq?.quote.lineItems ?? []);
  const [emailPanelOpen, setEmailPanelOpen] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const emailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rfq) return;
    setMode(rfq.mode === "Trucking" ? "trucking" : "forwarding");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rfq?.id]);

  useEffect(() => {
    if (autoplay && rfq && rfq.status === "new") {
      const t = setTimeout(() => setRfqStatus(rfq.id, "processing"), 450);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, rfq?.id]);

  if (!rfq) {
    return (
      <div className="p-8 text-center text-sm text-text-muted">
        RFQ not found. <Link href="/inbox" className="text-accent hover:underline">Back to inbox</Link>
      </div>
    );
  }

  const isReady = rfq.status === "quoted" || rfq.status === "sent";
  const isProcessing = rfq.status === "processing";

  function handleResolve(key: string, resolution: Resolution) {
    setResolutions((prev) => ({ ...prev, [key]: resolution }));
  }

  function handleQuoteAmountChange(index: number, amount: number) {
    setQuoteItems((prev) => prev.map((li, i) => (i === index ? { ...li, amount } : li)));
  }

  function handleApproveAndSend() {
    setEmailPanelOpen(true);
    setTimeout(() => emailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }

  function handleSaveDraft() {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 1800);
  }

  function switchModeTo(target: "forwarding" | "trucking") {
    const targetId = target === "forwarding" ? FORWARDING_DEMO_ID : TRUCKING_DEMO_ID;
    setMode(target);
    setRfqStatus(targetId, "new");
    router.push(`/inbox/${targetId}`);
  }

  const currentModeCategory = rfq.mode === "Trucking" ? "trucking" : "forwarding";

  return (
    <div className="animate-fade-up pb-16">
      <div className="border-b border-border bg-surface px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/inbox" className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-primary">
          <ArrowLeft size={13} /> RFQ Inbox
        </Link>

        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-display text-xl font-semibold tracking-tight text-text-primary">
                {rfq.rfqNumber} — {rfq.customer}
              </h1>
              <RfqStatusBadge status={rfq.status} />
            </div>
            <p className="mt-1 text-sm text-text-muted">
              {rfq.origin} → {rfq.destination} · {rfq.mode} · {rfq.equipment} · {rfq.receivedLabel}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-lg border border-border-strong bg-surface-sunken p-1 text-sm">
              <button
                onClick={() => switchModeTo("forwarding")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors duration-150 ${
                  currentModeCategory === "forwarding" ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                }`}
              >
                <Ship size={14} strokeWidth={2.25} />
                Freight Forwarding
              </button>
              <button
                onClick={() => switchModeTo("trucking")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors duration-150 ${
                  currentModeCategory === "trucking" ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                }`}
              >
                <Truck size={14} strokeWidth={2.25} />
                Trucking
              </button>
            </div>

            {rfq.status === "new" && (
              <Button variant="primary" onClick={() => setRfqStatus(rfq.id, "processing")}>
                <Sparkles size={15} />
                Process RFQ
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:px-8">
        <Card className="flex flex-col lg:col-span-1">
          <CardHeader
            title="Original RFQ"
            subtitle={rfq.emailFrom}
            action={<Mail size={16} className="mt-0.5 text-text-muted" />}
          />
          <div className="thin-scroll max-h-[520px] flex-1 overflow-y-auto px-5 py-4">
            <p className="mb-3 text-sm font-medium text-text-primary">{rfq.emailSubject}</p>
            <pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-text-secondary">
              {rfq.emailBody}
            </pre>
          </div>
        </Card>

        <Card className="flex flex-col lg:col-span-1">
          <CardHeader
            title="AI Extraction"
            subtitle="Structured shipment fields"
            action={<ScanSearch size={16} className="mt-0.5 text-text-muted" />}
          />
          {rfq.status === "new" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-16 text-center">
              <ScanSearch size={22} className="text-text-muted" strokeWidth={1.5} />
              <p className="text-sm text-text-muted">Click &ldquo;Process RFQ&rdquo; to extract shipment details.</p>
            </div>
          )}
          {isProcessing && <ProcessingOverlay onComplete={() => setRfqStatus(rfq.id, "quoted")} />}
          {isReady && (
            <div className="thin-scroll max-h-[520px] flex-1 overflow-y-auto">
              {rfq.extraction.map((field, i) => (
                <ExtractionFieldRow
                  key={field.key}
                  field={field}
                  index={i}
                  resolution={resolutions[field.key] ?? null}
                  onResolve={handleResolve}
                />
              ))}
            </div>
          )}
        </Card>

        <Card className="flex flex-col lg:col-span-1">
          <CardHeader
            title="Quote Builder"
            subtitle="Editable line items"
            action={
              isReady && (
                <button
                  onClick={() => setQuoteEditable((v) => !v)}
                  className="flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                >
                  <Pencil size={12} />
                  {quoteEditable ? "Done" : "Edit"}
                </button>
              )
            }
          />
          {rfq.status === "new" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-16 text-center">
              <FileText size={22} className="text-text-muted" strokeWidth={1.5} />
              <p className="text-sm text-text-muted">Quote will appear once the RFQ is processed.</p>
            </div>
          )}
          {isProcessing && (
            <div className="flex-1 animate-pulse space-y-3 px-5 py-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-3.5 rounded bg-surface-sunken" />
              ))}
            </div>
          )}
          {isReady && (
            <QuoteBuilder
              lineItems={quoteItems}
              editable={quoteEditable}
              onChangeAmount={handleQuoteAmountChange}
              transitEstimate={rfq.quote.transitEstimate}
              validityWindow={rfq.quote.validityWindow}
            />
          )}
        </Card>
      </div>

      {isReady && (
        <div className="px-4 sm:px-6 lg:px-8">
          <Card className="border-accent-soft-border bg-accent-soft">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-accent" strokeWidth={2} />
                <div>
                  <p className="font-display text-sm font-semibold tracking-tight text-text-primary">
                    Quote ready for review
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    AI prepared the quote. Human approval required — nothing is sent automatically.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {savedNotice && <span className="text-xs font-medium text-success">✓ Draft saved</span>}
                <Button variant="secondary" size="sm" onClick={() => setQuoteEditable(true)}>
                  <Pencil size={13} />
                  Edit Quote
                </Button>
                <Button variant="secondary" size="sm" onClick={handleSaveDraft}>
                  <Save size={13} />
                  Save Draft
                </Button>
                <Button variant="primary" size="sm" onClick={handleApproveAndSend} disabled={rfq.status === "sent"}>
                  <CheckCircle2 size={13} />
                  {rfq.status === "sent" ? "Sent" : "Approve & Send"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {isReady && emailPanelOpen && (
        <div ref={emailRef} className="px-4 pt-5 sm:px-6 lg:px-8">
          <Card>
            <CardHeader title="Customer Email" subtitle="Generated response — review before sending" action={<Mail size={16} className="mt-0.5 text-text-muted" />} />
            <div className="p-5">
              <EmailDraftPanel draft={rfq.emailDraft} onSend={() => markQuoteSent(rfq.id)} sent={rfq.status === "sent"} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
