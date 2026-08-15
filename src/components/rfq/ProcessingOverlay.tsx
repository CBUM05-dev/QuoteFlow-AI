"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

const STEPS = [
  "Reading RFQ",
  "Extracting shipment info",
  "Detecting missing info",
  "Matching to rate database",
  "Preparing quote",
  "Generating response",
];

const STEP_DURATION_MS = 260;

export function ProcessingOverlay({ onComplete }: { onComplete: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (activeStep >= STEPS.length) {
      const t = setTimeout(() => setFinished(true), 200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveStep((s) => s + 1), STEP_DURATION_MS);
    return () => clearTimeout(t);
  }, [activeStep]);

  useEffect(() => {
    if (!finished) return;
    const t = setTimeout(onComplete, 550);
    return () => clearTimeout(t);
  }, [finished, onComplete]);

  return (
    <div className="flex h-full min-h-[320px] items-center justify-center p-8">
      <div className="w-full max-w-xs animate-pop">
        <ul className="space-y-2.5">
          {STEPS.map((step, i) => {
            const isDone = i < activeStep || finished;
            const isActive = i === activeStep && !finished;
            return (
              <li key={step} className="flex items-center gap-2.5">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                    isDone ? "bg-success text-white" : isActive ? "bg-accent-soft text-accent" : "bg-surface-sunken text-text-muted"
                  }`}
                >
                  {isDone ? (
                    <Check size={12} strokeWidth={3} />
                  ) : isActive ? (
                    <Loader2 size={12} className="animate-spin" strokeWidth={3} />
                  ) : (
                    <span className="h-1 w-1 rounded-full bg-current" />
                  )}
                </span>
                <span
                  className={`text-sm transition-colors duration-200 ${
                    isDone ? "text-text-primary" : isActive ? "text-text-primary font-medium" : "text-text-muted"
                  }`}
                >
                  {step}
                </span>
              </li>
            );
          })}
        </ul>
        {finished && (
          <p className="mt-4 animate-fade-up rounded-lg border border-success-soft-border bg-success-soft px-3 py-2 text-center text-xs font-medium text-success">
            RFQ processed in 8 seconds
          </p>
        )}
      </div>
    </div>
  );
}
