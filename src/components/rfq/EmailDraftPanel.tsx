"use client";

import { useState } from "react";
import { Pencil, Save, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";

export function EmailDraftPanel({
  draft,
  onSend,
  sent,
  rfqNumber,
  total,
  origin,
  destination,
}: {
  draft: string;
  onSend: () => void;
  sent: boolean;
  rfqNumber: string;
  total: number;
  origin: string;
  destination: string;
}) {
  const [text, setText] = useState(draft);
  const [editing, setEditing] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  function handleSaveDraft() {
    setEditing(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 1800);
  }

  if (sent) {
    return (
      <div className="animate-fade-up flex flex-col items-center gap-3 rounded-xl border border-success-soft-border bg-success-soft px-6 py-10 text-center">
        <CheckCircle2 size={28} className="text-success" strokeWidth={1.75} />
        <div>
          <p className="font-display text-sm font-semibold text-success">Quote approved and sent</p>
          <p className="mt-1 text-xs text-success/80">The customer email has been sent. This RFQ is now marked as Sent.</p>
        </div>
        <div className="mt-1 flex flex-col items-center gap-0.5 rounded-lg border border-success-soft-border bg-surface px-5 py-3">
          <p className="font-display text-sm font-semibold text-text-primary">{rfqNumber}</p>
          <p className="font-display font-data text-xl font-semibold text-success">{formatCurrency(total)}</p>
          <p className="text-xs text-text-muted">
            {origin} → {destination}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      {editing ? (
        <textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={14}
          className="thin-scroll w-full resize-y rounded-lg border border-accent bg-background px-3.5 py-3 font-data text-[12.5px] leading-relaxed text-text-primary"
        />
      ) : (
        <pre className="thin-scroll max-h-[420px] w-full overflow-y-auto whitespace-pre-wrap rounded-lg border border-border-strong bg-background px-3.5 py-3 font-data text-[12.5px] leading-relaxed text-text-primary">
          {text}
        </pre>
      )}

      <div className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
        <ShieldCheck size={13} className="shrink-0 text-accent" />
        AI prepared this response. Human approval required before sending.
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        {savedNotice && <span className="text-xs font-medium text-success">✓ Draft saved</span>}
        <Button variant="secondary" size="sm" onClick={() => setEditing((v) => !v)}>
          <Pencil size={13} />
          {editing ? "Done" : "Edit"}
        </Button>
        <Button variant="secondary" size="sm" onClick={handleSaveDraft}>
          <Save size={13} />
          Save Draft
        </Button>
        <Button variant="primary" size="sm" onClick={onSend}>
          <CheckCircle2 size={13} />
          Approve &amp; Send
        </Button>
      </div>
    </div>
  );
}
