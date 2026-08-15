"use client";

import { useState } from "react";
import { Check, AlertTriangle, Pencil } from "lucide-react";
import type { ExtractedField } from "@/lib/types";

type Resolution = "asked" | "assumed" | "edited" | null;

export function ExtractionFieldRow({
  field,
  index,
  resolution,
  onResolve,
}: {
  field: ExtractedField;
  index: number;
  resolution: Resolution;
  onResolve: (key: string, resolution: "asked" | "assumed" | "edited") => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(field.value);
  const isAmbiguous = field.status === "ambiguous" && !resolution;

  return (
    <div
      className="animate-fade-up border-b border-border px-5 py-3 last:border-b-0"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">{field.label}</p>
          {editing ? (
            <input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => {
                setEditing(false);
                onResolve(field.key, "edited");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
              className="mt-0.5 w-full rounded-md border border-accent bg-background px-2 py-1 text-sm text-text-primary"
            />
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="group mt-0.5 flex items-center gap-1.5 text-left text-sm font-medium text-text-primary"
            >
              {value}
              <Pencil size={11} className="text-text-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
            </button>
          )}
        </div>
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
            isAmbiguous ? "bg-warning-soft text-warning" : "bg-success-soft text-success"
          }`}
          title={isAmbiguous ? "Needs review" : "Detected"}
        >
          {isAmbiguous ? <AlertTriangle size={12} strokeWidth={2.5} /> : <Check size={12} strokeWidth={3} />}
        </span>
      </div>

      {isAmbiguous && field.note && (
        <div className="mt-2 rounded-lg border border-warning-soft-border bg-warning-soft px-3 py-2.5">
          <p className="text-xs leading-snug text-warning">⚠ {field.note}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <button
              onClick={() => onResolve(field.key, "asked")}
              className="rounded-md border border-warning-soft-border bg-surface px-2.5 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-sunken"
            >
              Ask customer
            </button>
            <button
              onClick={() => onResolve(field.key, "assumed")}
              className="rounded-md border border-warning-soft-border bg-surface px-2.5 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-sunken"
            >
              Continue with assumption
            </button>
            <button
              onClick={() => setEditing(true)}
              className="rounded-md border border-warning-soft-border bg-surface px-2.5 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-sunken"
            >
              Edit
            </button>
          </div>
        </div>
      )}

      {resolution && field.status === "ambiguous" && (
        <p className="mt-2 animate-fade-in text-[11px] font-medium text-success">
          {resolution === "asked" && "✓ Question sent to customer"}
          {resolution === "assumed" && "✓ Continuing with assumption"}
          {resolution === "edited" && "✓ Updated manually"}
        </p>
      )}
    </div>
  );
}
