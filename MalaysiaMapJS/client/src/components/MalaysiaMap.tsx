import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as d3 from "d3";
import type { Project } from "@shared/schema";

interface MalaysiaMapProps {
  onStateClick?: (state: string) => void;
}

interface GeoJSONFeature {
  type: string;
  properties: {
    shapeName: string;
    shapeISO: string;
  };
  geometry: any;
}

interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}

export default function MalaysiaMap({ onStateClick }: MalaysiaMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const statesWithProjects = [
    "Johor", "Kedah", "Kelantan", "Melaka", "Negeri Sembilan", "Pahang",
    "Penang", "Perak", "Perlis", "Selangor", "Terengganu", "Sabah", "Sarawak"
  ].map(state => ({
    name: state,
    count: projects.filter(p => p.state === state).length
  }));

  // Create a map for quick lookup of project counts by state
  const projectCountByState = new Map(
    statesWithProjects.map(s => [s.name.toLowerCase(), s.count])
  );

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = 400;

    // Clear previous content
    svg.selectAll("*").remove();

    // Create a group for the map
    const g = svg.append("g");

    // Load and render the map
    d3.json<GeoJSONData>("/malaysia-states.geojson").then((geoData) => {
      if (!geoData) {
        console.error("Failed to load Malaysia GeoJSON data");
        return;
      }
      console.log(`Loaded ${geoData.features.length} states from GeoJSON`);

      // Create projection centered on Malaysia
      const projection = d3.geoMercator()
        .fitSize([width, height], geoData as any);

      const path = d3.geoPath().projection(projection);

      // Get max project count for color scaling
      const maxCount = Math.max(...Array.from(projectCountByState.values()), 1);

      // Color scale from light to dark blue based on project count
      const colorScale = d3.scaleSequential()
        .domain([0, maxCount])
        .interpolator(d3.interpolateBlues);

      // Draw states
      g.selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", path as any)
        .attr("fill", (d) => {
          const stateName = d.properties.shapeName;
          const count = projectCountByState.get(stateName.toLowerCase()) || 0;
          return count > 0 ? colorScale(count) : "#e5e7eb";
        })
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .attr("class", "state-path")
        .style("cursor", "pointer")
        .style("transition", "all 0.2s")
        .on("mouseenter", function(event, d) {
          const stateName = d.properties.shapeName;
          const count = projectCountByState.get(stateName.toLowerCase()) || 0;
          
          d3.select(this)
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 2)
            .attr("fill-opacity", 0.8);

          setTooltip({
            x: event.pageX,
            y: event.pageY,
            content: `${stateName}: ${count} project${count !== 1 ? 's' : ''}`
          });
        })
        .on("mousemove", function(event) {
          setTooltip(prev => prev ? { ...prev, x: event.pageX, y: event.pageY } : null);
        })
        .on("mouseleave", function() {
          d3.select(this)
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .attr("fill-opacity", 1);

          setTooltip(null);
        })
        .on("click", function(event, d) {
          const stateName = d.properties.shapeName;
          console.log(`Map state clicked: ${stateName}`);
          onStateClick?.(stateName);
        });
    });
  }, [projects, onStateClick]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Map</CardTitle>
        <p className="text-sm text-muted-foreground">Click on a state to view projects</p>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px] rounded-lg mb-4 bg-gray-50 dark:bg-gray-900">
          <svg
            ref={svgRef}
            className="w-full h-full"
            data-testid="map-container"
          />
          {tooltip && (
            <div
              className="fixed z-50 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg shadow-lg pointer-events-none"
              style={{
                left: `${tooltip.x + 10}px`,
                top: `${tooltip.y + 10}px`,
              }}
            >
              {tooltip.content}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">States by Project Count</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {statesWithProjects.map((state) => (
              <button
                key={state.name}
                className="flex items-center justify-between p-3 rounded-lg border hover-elevate active-elevate-2 text-left"
                onClick={() => {
                  console.log(`State clicked: ${state.name}`);
                  onStateClick?.(state.name);
                }}
                data-testid={`button-state-${state.name.toLowerCase()}`}
              >
                <span className="text-sm font-medium">{state.name}</span>
                <Badge variant="secondary">{state.count}</Badge>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
