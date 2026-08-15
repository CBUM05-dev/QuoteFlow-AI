"use client";

import { useState } from "react";
import { Copy, Check, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmailDraftPanel({ draft, onSend, sent }: { draft: string; onSend: () => void; sent: boolean }) {
  const [text, setText] = useState(draft);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — no-op for demo purposes
    }
  }

  if (sent) {
    return (
      <div className="animate-fade-up flex flex-col items-center gap-2 rounded-xl border border-success-soft-border bg-success-soft px-6 py-10 text-center">
        <CheckCircle2 size={28} className="text-success" strokeWidth={1.75} />
        <p className="font-display text-sm font-semibold text-success">Quote sent successfully</p>
        <p className="max-w-xs text-xs text-success/80">
          The customer email has been sent. This RFQ is now marked as Sent.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={14}
        className="thin-scroll w-full resize-y rounded-lg border border-border-strong bg-background px-3.5 py-3 font-data text-[12.5px] leading-relaxed text-text-primary focus:border-accent"
      />
      <div className="mt-3 flex items-center justify-end gap-2">
        <Button variant="secondary" size="sm" onClick={handleCopy}>
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button variant="primary" size="sm" onClick={onSend}>
          <Send size={13} />
          Send
        </Button>
      </div>
    </div>
  );
}
