"use client";

import { Menu } from "lucide-react";
import { DemoModeMenu } from "./DemoModeMenu";
import { Badge } from "@/components/ui/Badge";

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-surface/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="-ml-1 flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-sunken lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-text-primary">
            QuoteFlow AI <span className="hidden text-text-muted sm:inline">— AI-assisted quoting workflow</span>
          </p>
        </div>
        <span className="hidden shrink-0 md:block">
          <Badge tone="neutral">Demo environment</Badge>
        </span>
      </div>
      <DemoModeMenu />
    </header>
  );
}
