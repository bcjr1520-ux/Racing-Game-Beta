import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TEAM_SWATCHES, SWATCH_ORDER } from "@/lib/palette";
import { useCircuit } from "@/lib/circuit-store";

export function RosterPanel() {
  const teams = useCircuit((s) => s.teams);
  const associates = useCircuit((s) => s.associates);
  const addAssociate = useCircuit((s) => s.addAssociate);
  const removeAssociate = useCircuit((s) => s.removeAssociate);
  const renameAssociate = useCircuit((s) => s.renameAssociate);
  const renameTeam = useCircuit((s) => s.renameTeam);
  const setTeamSwatch = useCircuit((s) => s.setTeamSwatch);
  const moveAssociate = useCircuit((s) => s.moveAssociate);
  const [draft, setDraft] = useState<Record<string, string>>({});

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {teams.map((team) => {
        const roster = associates
          .filter((a) => a.teamId === team.id)
          .sort((a, b) => a.name.localeCompare(b.name));
        return (
          <section
            key={team.id}
            className="rounded-[var(--radius-lg)] border border-border bg-card p-4"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-3 rounded-full"
                style={{ background: TEAM_SWATCHES[team.swatch] }}
              />
              <Input
                aria-label={`${team.name} team name`}
                value={team.name}
                onChange={(e) => renameTeam(team.id, e.target.value)}
                className="h-11 font-display text-lg font-semibold"
              />
            </div>
            <div className="mt-2 flex gap-1">
              {SWATCH_ORDER.map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-label={`Set ${team.name} color ${id}`}
                  onClick={() => setTeamSwatch(team.id, id)}
                  className="size-7 rounded-full border border-border"
                  style={{
                    background: TEAM_SWATCHES[id],
                    outline:
                      team.swatch === id ? "2px solid var(--color-primary)" : undefined,
                    outlineOffset: 2,
                  }}
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{roster.length} drivers</p>
            <ul className="mt-2 max-h-64 space-y-1 overflow-y-auto">
              {roster.map((a) => (
                <li key={a.id} className="flex items-center gap-1">
                  <Input
                    value={a.name}
                    onChange={(e) => renameAssociate(a.id, e.target.value)}
                    className="h-10"
                  />
                  <select
                    aria-label={`Move ${a.name}`}
                    className="h-10 rounded-[var(--radius-sm)] border border-border bg-muted px-2 text-xs"
                    value={a.teamId}
                    onChange={(e) => moveAssociate(a.id, e.target.value)}
                  >
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAssociate(a.id)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                addAssociate(team.id, draft[team.id] ?? "");
                setDraft((d) => ({ ...d, [team.id]: "" }));
              }}
            >
              <Input
                placeholder="Add driver"
                value={draft[team.id] ?? ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, [team.id]: e.target.value }))
                }
              />
              <Button type="submit" variant="secondary">
                Add
              </Button>
            </form>
          </section>
        );
      })}
    </div>
  );
}
