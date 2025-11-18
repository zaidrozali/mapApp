import { Badge } from "@/components/ui/badge";

interface StateBadgeProps {
  state: string;
}

const stateAbbreviations: Record<string, string> = {
  "Selangor": "SEL",
  "Perak": "PRK",
  "Penang": "PNG",
  "Johor": "JHR",
  "Kedah": "KDH",
  "Kelantan": "KEL",
  "Pahang": "PHG",
  "Terengganu": "TRG",
  "Sabah": "SBH",
  "Sarawak": "SWK",
  "Melaka": "MLK",
  "Negeri Sembilan": "NSN",
  "Perlis": "PLS",
};

export default function StateBadge({ state }: StateBadgeProps) {
  const abbreviation = stateAbbreviations[state] || state.substring(0, 3).toUpperCase();

  return (
    <Badge variant="secondary" data-testid={`badge-state-${state.toLowerCase().replace(/\s+/g, "-")}`}>
      {abbreviation}
    </Badge>
  );
}
