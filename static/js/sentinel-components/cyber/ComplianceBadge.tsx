import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ComplianceBadgeProps {
  name: string;
  status: "certified" | "compliant" | "in-progress";
  className?: string;
}

export function ComplianceBadge({ name, status, className }: ComplianceBadgeProps) {
  const statusColors = {
    certified: "bg-success/10 text-success border-success/30",
    compliant: "bg-primary/10 text-primary border-primary/30",
    "in-progress": "bg-warning/10 text-warning border-warning/30",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium",
        statusColors[status],
        className
      )}
    >
      {status === "certified" && <Check className="w-4 h-4" />}
      <span>{name}</span>
    </div>
  );
}
