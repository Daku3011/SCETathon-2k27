export function Announcement({ label, detail }: { label: string; detail?: string }) {
  return (
    <span className="announcement" role="status">
      <span className="announcement-label">{label}:</span> {detail ?? "To be announced"}
    </span>
  );
}
