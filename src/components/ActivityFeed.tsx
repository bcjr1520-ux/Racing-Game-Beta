import { formatDistanceToNow } from "date-fns";
import { MODE_COPY, inPeriod } from "@/lib/scoring";
import { useCircuit } from "@/lib/circuit-store";

export function ActivityFeed() {
  const events = useCircuit((s) => s.events);
  const associates = useCircuit((s) => s.associates);
  const teams = useCircuit((s) => s.teams);
  const period = useCircuit((s) => s.period);
  const mode = useCircuit((s) => s.mode);
  const recent = [...inPeriod(events, period)]
    .filter((e) => e.kind === mode)
    .sort((a, b) => b.at - a.at)
    .slice(0, 12);

  if (!recent.length) {
    return (
      <p className="text-sm text-muted-foreground">No units logged in this window.</p>
    );
  }

  return (
    <ul className="space-y-2">
      {recent.map((e) => {
        const a = associates.find((x) => x.id === e.associateId);
        const t = teams.find((x) => x.id === e.teamId);
        return (
          <li key={e.id} className="flex items-baseline justify-between gap-3 text-sm">
            <span>
              <span className="font-medium">{a?.name ?? "Removed"}</span>
              <span className="text-muted-foreground">
                {" "}
                {MODE_COPY[e.kind].unit}
                {e.qty > 1 ? ` x${e.qty}` : ""} · {t?.name}
                {e.bundle ? " · bundle" : ""}
              </span>
            </span>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
              {formatDistanceToNow(e.at, { addSuffix: true })}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
