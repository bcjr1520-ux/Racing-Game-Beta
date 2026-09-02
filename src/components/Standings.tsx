import { TEAM_SWATCHES } from "@/lib/palette";
import { MODE_COPY, scoreFor } from "@/lib/scoring";
import { useCircuit } from "@/lib/circuit-store";

export function Standings() {
  const teams = useCircuit((s) => s.teams);
  const associates = useCircuit((s) => s.associates);
  const events = useCircuit((s) => s.events);
  const mode = useCircuit((s) => s.mode);
  const period = useCircuit((s) => s.period);
  const copy = MODE_COPY[mode];

  const teamRows = [...teams]
    .map((t) => ({
      ...t,
      score: scoreFor(events, mode, period, (e) => e.teamId === t.id),
    }))
    .sort((a, b) => b.score - a.score);

  const driverRows = associates
    .filter((a) => a.active)
    .map((a) => ({
      ...a,
      score: scoreFor(events, mode, period, (e) => e.associateId === a.id),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  return (
    <div className="flex h-full flex-col gap-5">
      <section>
        <h2 className="font-display text-lg font-semibold tracking-tight">
          Constructor standings
        </h2>
        <p className="text-xs text-muted-foreground">{copy.headline}</p>
        <ol className="mt-3 space-y-1.5">
          {teamRows.map((t, i) => (
            <li
              key={t.id}
              className="flex items-center gap-3 rounded-[var(--radius-md)] bg-muted/60 px-3 py-2"
            >
              <span className="w-6 font-display text-lg tabular-nums text-muted-foreground">
                {i + 1}
              </span>
              <span
                className="size-2.5 rounded-full"
                style={{ background: TEAM_SWATCHES[t.swatch] }}
              />
              <span className="flex-1 text-sm font-medium">{t.name}</span>
              <span className="font-display text-lg tabular-nums">{t.score}</span>
            </li>
          ))}
        </ol>
      </section>
      <section className="min-h-0 flex-1">
        <h2 className="font-display text-lg font-semibold tracking-tight">
          Drivers
        </h2>
        <ol className="mt-3 space-y-1">
          {driverRows.map((d, i) => {
            const team = teams.find((t) => t.id === d.teamId);
            return (
              <li key={d.id} className="flex items-center gap-3 px-1 py-1.5 text-sm">
                <span className="w-5 tabular-nums text-muted-foreground">{i + 1}</span>
                <span className="flex-1 truncate">{d.name}</span>
                <span className="text-xs text-muted-foreground">{team?.name}</span>
                <span className="w-8 text-right tabular-nums">{d.score}</span>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
