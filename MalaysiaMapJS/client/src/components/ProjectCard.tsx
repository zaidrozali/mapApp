import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StateBadge from "./StateBadge";
import StatusIndicator from "./StatusIndicator";
import { MapPin, ArrowRight } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const categoryColors: Record<string, string> = {
    Infrastructure: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Development: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    Social: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Economic: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  };

  return (
    <Card className="hover-elevate flex flex-col h-full" data-testid={`card-project-${project.id}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <StateBadge state={project.state} />
        <StatusIndicator status={project.status as "Completed" | "Ongoing" | "Planned"} />
      </CardHeader>
      <CardContent className="flex-1">
        <h3 className="text-xl font-semibold mb-2" data-testid={`text-project-title-${project.id}`}>
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4" />
          <span data-testid={`text-project-location-${project.id}`}>{project.location}</span>
        </div>
        <span
          className={`inline-block px-2 py-1 rounded-md text-xs font-medium mb-3 ${categoryColors[project.category] || "bg-gray-100 text-gray-800"}`}
          data-testid={`badge-category-${project.id}`}
        >
          {project.category}
        </span>
        <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-description-${project.id}`}>
          {project.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          className="w-full justify-between"
          data-testid={`button-view-details-${project.id}`}
          onClick={() => {
            console.log(`View details for project: ${project.title}`);
            onClick?.();
          }}
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
