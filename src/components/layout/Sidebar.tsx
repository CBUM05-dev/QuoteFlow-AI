"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Users,
  Tags,
  Settings,
  Ship,
} from "lucide-react";

const PRIMARY_NAV_ITEMS = [
  { href: "/inbox", label: "RFQ Inbox", icon: Inbox },
  { href: "/quotes", label: "Quotes", icon: FileText },
  { href: "/rates", label: "Rates", icon: Tags },
  { href: "/dashboard", label: "Analytics", icon: LayoutDashboard },
];

const SECONDARY_NAV_ITEMS = [
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
          <Ship size={17} strokeWidth={2.25} />
        </div>
        <span className="font-display text-[15px] font-semibold tracking-tight text-text-primary">
          QuoteFlow AI
        </span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {PRIMARY_NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                active
                  ? "bg-accent-soft text-accent"
                  : "text-text-secondary hover:bg-surface-sunken hover:text-text-primary"
              }`}
            >
              <Icon
                size={17}
                strokeWidth={2}
                className={active ? "text-accent" : "text-text-muted group-hover:text-text-secondary"}
              />
              {item.label}
            </Link>
          );
        })}

        <div className="my-3 border-t border-border" />

        {SECONDARY_NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`group flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
                active
                  ? "bg-accent-soft text-accent"
                  : "text-text-muted hover:bg-surface-sunken hover:text-text-secondary"
              }`}
            >
              <Icon
                size={15}
                strokeWidth={2}
                className={active ? "text-accent" : "text-text-muted group-hover:text-text-secondary"}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 mb-4 rounded-lg border border-border bg-surface-sunken px-3.5 py-3">
        <p className="text-xs font-medium text-text-primary">Human-in-the-loop</p>
        <p className="mt-1 text-[11px] leading-snug text-text-muted">
          AI drafts every quote. Nothing reaches a customer without a person clicking approve.
        </p>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r border-border bg-surface lg:block">
      <SidebarContent />
    </aside>
  );
}
