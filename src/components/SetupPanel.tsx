import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCircuit } from "@/lib/circuit-store";

export function SetupPanel() {
  const fileRef = useRef<HTMLInputElement>(null);
  const lapGoal = useCircuit((s) => s.lapGoal);
  const bundleThreshold = useCircuit((s) => s.bundleThreshold);
  const sound = useCircuit((s) => s.sound);
  const prizes = useCircuit((s) => s.prizes);
  const setLapGoal = useCircuit((s) => s.setLapGoal);
  const setBundleThreshold = useCircuit((s) => s.setBundleThreshold);
  const setSound = useCircuit((s) => s.setSound);
  const setPrizes = useCircuit((s) => s.setPrizes);
  const clearPeriodEvents = useCircuit((s) => s.clearPeriodEvents);
  const resetBoard = useCircuit((s) => s.resetBoard);
  const importState = useCircuit((s) => s.importState);

  function exportJson() {
    // Build snapshot only when exporting (not on every render)
    const s = useCircuit.getState();
    const snapshot = {
      version: s.version,
      teams: s.teams,
      associates: s.associates,
      events: s.events,
      prizes: s.prizes,
      spins: s.spins,
      mode: s.mode,
      period: s.period,
      lapGoal: s.lapGoal,
      bundleThreshold: s.bundleThreshold,
      pendingBonusId: s.pendingBonusId,
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "circuit-board.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <section className="rounded-[var(--radius-lg)] border border-border bg-card p-4">
        <h2 className="font-display text-lg font-semibold">Race rules</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="lap">Units per lap</Label>
            <Input
              id="lap"
              type="number"
              min={5}
              max={200}
              className="mt-1"
              value={lapGoal}
              onChange={(e) => setLapGoal(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="bundle">Bundle spin at</Label>
            <Input
              id="bundle"
              type="number"
              min={2}
              max={10}
              className="mt-1"
              value={bundleThreshold}
              onChange={(e) => setBundleThreshold(Number(e.target.value))}
            />
          </div>
        </div>
        <label className="mt-4 flex h-11 items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={sound}
            onChange={(e) => setSound(e.target.checked)}
          />
          Sound on log and spin
        </label>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-border bg-card p-4">
        <h2 className="font-display text-lg font-semibold">Wheel prizes</h2>
        <p className="text-sm text-muted-foreground">
          Weight controls how often a slice appears.
        </p>
        <ul className="mt-3 space-y-2">
          {prizes.map((p, i) => (
            <li key={p.id} className="flex gap-2">
              <Input
                value={p.label}
                onChange={(e) =>
                  setPrizes(
                    prizes.map((x, j) =>
                      j === i ? { ...x, label: e.target.value } : x,
                    ),
                  )
                }
              />
              <Input
                type="number"
                min={0}
                max={10}
                className="w-20"
                value={p.weight}
                onChange={(e) =>
                  setPrizes(
                    prizes.map((x, j) =>
                      j === i
                        ? { ...x, weight: Number(e.target.value) }
                        : x,
                    ),
                  )
                }
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[var(--radius-lg)] border border-border bg-card p-4">
        <h2 className="font-display text-lg font-semibold">Data</h2>
        <p className="text-sm text-muted-foreground">
          Board lives in this browser. Export a backup before a floor PC swap.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exportJson}>
            Export
          </Button>
          <Button variant="secondary" onClick={() => fileRef.current?.click()}>
            Import
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              clearPeriodEvents();
              toast("Cleared events in the current window");
            }}
          >
            Clear this window
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("Reset teams, roster, and all logs?")) {
                resetBoard();
                toast("Board reset");
              }
            }}
          >
            Reset board
          </Button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
              const raw = JSON.parse(await file.text());
              if (importState(raw)) toast.success("Imported board");
              else toast.error("That file is not a Circuit backup");
            } catch {
              toast.error("Could not read that file");
            }
            e.target.value = "";
          }}
        />
      </section>
    </div>
  );
}
