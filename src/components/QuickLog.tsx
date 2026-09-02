import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCircuit } from "@/lib/circuit-store";
import { MODE_COPY } from "@/lib/scoring";
import { TEAM_SWATCHES } from "@/lib/palette";
import { unlockAudio } from "@/lib/audio";

export function QuickLog({
  open,
  onOpenChange,
  onBundle,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onBundle: (associateId: string) => void;
}) {
  const teams = useCircuit((s) => s.teams);
  const associates = useCircuit((s) => s.associates);
  const mode = useCircuit((s) => s.mode);
  const logUnit = useCircuit((s) => s.logUnit);
  const [q, setQ] = useState("");
  const [teamId, setTeamId] = useState<string | null>(null);
  const [associateId, setAssociateId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const copy = MODE_COPY[mode];

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return associates
      .filter((a) => a.active)
      .filter((a) => !teamId || a.teamId === teamId)
      .filter((a) => !query || a.name.toLowerCase().includes(query))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [associates, q, teamId]);

  function reset() {
    setQ("");
    setTeamId(null);
    setAssociateId(null);
    setQty(1);
  }

  function submit() {
    if (!associateId) return;
    unlockAudio();
    const { bundle, bonusApplied } = logUnit({ associateId, qty });
    const name = associates.find((a) => a.id === associateId)?.name ?? "Driver";
    toast.success(`${copy.verb.replace("Log ", "")} logged for ${name}`, {
      description: bonusApplied ? `Count ${qty}+1 with double-count bonus` : `${qty} ${copy.unit}${qty > 1 ? "s" : ""}`,
    });
    onOpenChange(false);
    if (bundle) onBundle(associateId);
    reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent>
        <DialogTitle>{copy.verb}</DialogTitle>
        <DialogDescription>
          Pick a driver, set the count, and the car moves on the next frame.
        </DialogDescription>
        <div className="mt-4 grid grid-cols-5 gap-1.5">
          {teams.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTeamId(teamId === t.id ? null : t.id);
                setAssociateId(null);
              }}
              className="flex h-11 flex-col items-center justify-center rounded-[var(--radius-sm)] border border-border text-[10px] font-medium uppercase tracking-wide"
              style={{
                background:
                  teamId === t.id ? TEAM_SWATCHES[t.swatch] : "transparent",
                color: teamId === t.id ? "#0b0c0e" : undefined,
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <Label htmlFor="driver">Driver</Label>
          <Input
            id="driver"
            className="mt-1"
            placeholder="Search roster"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="mt-2 max-h-40 overflow-y-auto rounded-[var(--radius-md)] border border-border">
          {filtered.length === 0 ? (
            <p className="px-3 py-4 text-sm text-muted-foreground">No matches.</p>
          ) : (
            filtered.slice(0, 40).map((a) => {
              const team = teams.find((t) => t.id === a.teamId);
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAssociateId(a.id)}
                  className="flex w-full items-center justify-between gap-2 border-b border-border px-3 py-2.5 text-left text-sm last:border-0 hover:bg-muted"
                  style={{
                    background:
                      associateId === a.id ? "var(--color-muted)" : undefined,
                  }}
                >
                  <span>{a.name}</span>
                  <span className="text-xs text-muted-foreground">{team?.name}</span>
                </button>
              );
            })
          )}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Label>Count</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setQty(n)}
                className="size-11 rounded-[var(--radius-sm)] border border-border text-sm font-medium tabular-nums hover:bg-muted"
                style={{
                  background: qty === n ? "var(--color-primary)" : undefined,
                  color: qty === n ? "var(--color-primary-foreground)" : undefined,
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <Button className="mt-4 w-full" disabled={!associateId} onClick={submit}>
          {copy.verb}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
