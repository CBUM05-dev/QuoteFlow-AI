import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border bg-surface px-4 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-text-primary">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-text-secondary">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
