import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Calendar } from "lucide-react";

interface StatusIndicatorProps {
  status: "Completed" | "Ongoing" | "Planned";
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const statusConfig = {
    Completed: {
      icon: CheckCircle,
      className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
      label: "Completed",
    },
    Ongoing: {
      icon: Clock,
      className: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
      label: "Ongoing",
    },
    Planned: {
      icon: Calendar,
      className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
      label: "Planned",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={config.className} data-testid={`status-${status.toLowerCase()}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
}
