import ProjectCard from "../ProjectCard";

export default function ProjectCardExample() {
  const mockProject = {
    id: "1",
    title: "Kuala Lumpur MRT Line 3",
    description: "Construction of the third MRT line connecting major residential and commercial areas in Kuala Lumpur, improving public transportation infrastructure.",
    state: "Selangor",
    location: "Kuala Lumpur & Selangor",
    category: "Infrastructure",
    status: "Ongoing",
  };

  return (
    <div className="max-w-sm">
      <ProjectCard project={mockProject} />
    </div>
  );
}
