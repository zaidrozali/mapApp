import StatusIndicator from "../StatusIndicator";

export default function StatusIndicatorExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusIndicator status="Completed" />
      <StatusIndicator status="Ongoing" />
      <StatusIndicator status="Planned" />
    </div>
  );
}
