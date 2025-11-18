import StateBadge from "../StateBadge";

export default function StateBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <StateBadge state="Selangor" />
      <StateBadge state="Perak" />
      <StateBadge state="Penang" />
      <StateBadge state="Johor" />
    </div>
  );
}
