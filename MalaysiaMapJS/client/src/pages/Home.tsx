import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MalaysiaMap from "@/components/MalaysiaMap";
import ProjectFilters, { type FilterState } from "@/components/ProjectFilters";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import type { Project } from "@shared/schema";

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    states: [],
    categories: [],
    statuses: [],
  });

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const handleStateClick = (state: string) => {
    setFilters(prev => ({
      ...prev,
      states: prev.states.includes(state) ? prev.states : [state]
    }));
  };

  const handleClearStateFilter = () => {
    setFilters(prev => ({
      ...prev,
      states: []
    }));
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = !filters.search || 
      project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesState = filters.states.length === 0 || filters.states.includes(project.state);
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(project.category);
    const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(project.status);

    return matchesSearch && matchesState && matchesCategory && matchesStatus;
  });

  const hasStateFilter = filters.states.length > 0;
  const selectedStateDisplay = filters.states.length === 1 ? filters.states[0] : `${filters.states.length} states`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Hero />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          {hasStateFilter && (
            <div className="mb-6 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Showing projects in:</span>
              <span className="font-semibold">{selectedStateDisplay}</span>
              <button
                onClick={handleClearStateFilter}
                className="text-sm text-primary hover:underline"
                data-testid="button-clear-state-filter"
              >
                View all states
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <MalaysiaMap onStateClick={handleStateClick} />
              <ProjectFilters onFilterChange={setFilters} filters={filters} />
            </div>

            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                  Development Projects
                </h2>
                <p className="text-muted-foreground">
                  {isLoading ? "Loading..." : `${filteredProjects.length} ${filteredProjects.length === 1 ? "project" : "projects"} found`}
                </p>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading projects...</p>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects match your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
