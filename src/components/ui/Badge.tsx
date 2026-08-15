import type { ReactNode } from "react";

type BadgeTone = "accent" | "success" | "warning" | "danger" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  accent: "bg-accent-soft text-accent border-accent-soft-border",
  success: "bg-success-soft text-success border-success-soft-border",
  warning: "bg-warning-soft text-warning border-warning-soft-border",
  danger: "bg-danger-soft text-danger border-danger-soft-border",
  neutral: "bg-surface-sunken text-text-secondary border-border-strong",
};

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className = "",
}: {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium leading-5 ${toneClasses[tone]} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
