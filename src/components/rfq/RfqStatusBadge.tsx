import { Badge } from "@/components/ui/Badge";
import type { RfqStatus } from "@/lib/types";

const STATUS_CONFIG: Record<RfqStatus, { label: string; tone: "accent" | "warning" | "success" | "neutral" }> = {
  new: { label: "New", tone: "accent" },
  processing: { label: "Processing", tone: "warning" },
  quoted: { label: "Quoted", tone: "success" },
  sent: { label: "Sent", tone: "neutral" },
};

export function RfqStatusBadge({ status }: { status: RfqStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <Badge tone={config.tone} dot>
      {config.label}
    </Badge>
  );
}
