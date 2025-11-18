import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
  filters?: FilterState;
}

export interface FilterState {
  search: string;
  states: string[];
  categories: string[];
  statuses: string[];
}

const STATES = [
  "Selangor", "Perak", "Penang", "Johor", "Kedah", "Kelantan",
  "Pahang", "Terengganu", "Sabah", "Sarawak", "Melaka", "Negeri Sembilan", "Perlis"
];

const CATEGORIES = ["Infrastructure", "Development", "Social", "Economic"];
const STATUSES = ["Ongoing", "Completed", "Planned"];

export default function ProjectFilters({ onFilterChange, filters: externalFilters }: ProjectFiltersProps) {
  const [internalFilters, setInternalFilters] = useState<FilterState>({
    search: "",
    states: [],
    categories: [],
    statuses: [],
  });

  const filters = externalFilters || internalFilters;

  useEffect(() => {
    if (externalFilters) {
      setInternalFilters(externalFilters);
    }
  }, [externalFilters]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setInternalFilters(updated);
    onFilterChange?.(updated);
    console.log("Filters updated:", updated);
  };

  const toggleArrayFilter = (key: "states" | "categories" | "statuses", value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilters({ [key]: updated });
  };

  const clearFilters = () => {
    updateFilters({ search: "", states: [], categories: [], statuses: [] });
  };

  const activeFilterCount = filters.states.length + filters.categories.length + filters.statuses.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="text-lg">Filters</CardTitle>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            data-testid="button-clear-filters"
          >
            Clear All
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search">Search Projects</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>States</Label>
          <div className="flex flex-wrap gap-2">
            {STATES.map((state) => (
              <Badge
                key={state}
                variant={filters.states.includes(state) ? "default" : "outline"}
                className="cursor-pointer hover-elevate"
                onClick={() => toggleArrayFilter("states", state)}
                data-testid={`filter-state-${state.toLowerCase()}`}
              >
                {state}
                {filters.states.includes(state) && <X className="w-3 h-3 ml-1" />}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Categories</Label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={filters.categories.includes(category) ? "default" : "outline"}
                className="cursor-pointer hover-elevate"
                onClick={() => toggleArrayFilter("categories", category)}
                data-testid={`filter-category-${category.toLowerCase()}`}
              >
                {category}
                {filters.categories.includes(category) && <X className="w-3 h-3 ml-1" />}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((status) => (
              <Badge
                key={status}
                variant={filters.statuses.includes(status) ? "default" : "outline"}
                className="cursor-pointer hover-elevate"
                onClick={() => toggleArrayFilter("statuses", status)}
                data-testid={`filter-status-${status.toLowerCase()}`}
              >
                {status}
                {filters.statuses.includes(status) && <X className="w-3 h-3 ml-1" />}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
