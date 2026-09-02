import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import {
  Flag,
  Gift,
  Maximize2,
  Minimize2,
  Plus,
  Settings2,
  Undo2,
  Users,
} from "lucide-react";
import { ActivityFeed } from "@/components/ActivityFeed";
import { PrizeWheel } from "@/components/PrizeWheel";
import { QuickLog } from "@/components/QuickLog";
import { RosterPanel } from "@/components/RosterPanel";
import { SetupPanel } from "@/components/SetupPanel";
import { Standings } from "@/components/Standings";
import { TrackCanvas } from "@/components/TrackCanvas";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { unlockAudio } from "@/lib/audio";
import { useCircuit } from "@/lib/circuit-store";
import { MODE_COPY, PERIOD_COPY } from "@/lib/scoring";
import type { BoardMode, Period } from "@/lib/types";

type View = "race" | "pit" | "wheel" | "setup";

const MODES: BoardMode[] = ["sales", "saves", "cancels"];
const PERIODS: Period[] = ["today", "week", "month", "all"];

export function CircuitApp() {
  const hydrated = useCircuit((s) => s.hydrated);
  const setHydrated = useCircuit((s) => s.setHydrated);
  const mode = useCircuit((s) => s.mode);
  const period = useCircuit((s) => s.period);
  const theater = useCircuit((s) => s.theater);
  const setMode = useCircuit((s) => s.setMode);
  const setPeriod = useCircuit((s) => s.setPeriod);
  const setTheater = useCircuit((s) => s.setTheater);
  const undoLast = useCircuit((s) => s.undoLast);
  const [view, setView] = useState<View>("race");
  const [logOpen, setLogOpen] = useState(false);
  const [spinFor, setSpinFor] = useState<string | null>(null);
  const [wheelOpen, setWheelOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) setHydrated();
    };
    void Promise.resolve(useCircuit.persist.rehydrate()).finally(finish);
    const t = window.setTimeout(finish, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [setHydrated]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "l" || e.key === "L") setLogOpen(true);
      if (e.key === "w" || e.key === "W") {
        setView("wheel");
        setWheelOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background text-muted-foreground">
        Loading board
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Toaster theme="dark" position="top-center" />
      <header className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 sm:px-6">
        <div className="mr-auto">
          <p className="font-display text-2xl font-semibold tracking-tight leading-none">
            Circuit
          </p>
          <p className="text-xs text-muted-foreground">
            {MODE_COPY[mode].headline} · {PERIOD_COPY[period]}
          </p>
        </div>
        {!theater ? (
          <>
            <div className="flex rounded-[var(--radius-md)] bg-muted p-1">
              {MODES.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className="h-9 rounded-[var(--radius-sm)] px-3 text-xs font-medium uppercase tracking-wide"
                  style={{
                    background: mode === m ? "var(--color-primary)" : "transparent",
                    color: mode === m ? "var(--color-primary-foreground)" : undefined,
                  }}
                >
                  {MODE_COPY[m].label}
                </button>
              ))}
            </div>
            <div className="flex rounded-[var(--radius-md)] bg-muted p-1">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className="h-9 rounded-[var(--radius-sm)] px-2.5 text-xs font-medium"
                  style={{
                    background: period === p ? "var(--color-card)" : "transparent",
                  }}
                >
                  {PERIOD_COPY[p]}
                </button>
              ))}
            </div>
          </>
        ) : null}
        <Button
          variant="ghost"
          size="icon"
          aria-label={theater ? "Exit theater" : "Theater"}
          onClick={() => setTheater(!theater)}
        >
          {theater ? <Minimize2 /> : <Maximize2 />}
        </Button>
        {!theater ? (
          <>
            <Button variant="ghost" size="icon" aria-label="Pit roster" onClick={() => setView("pit")}>
              <Users />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Prize wheel" onClick={() => setView("wheel")}>
              <Gift />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Setup" onClick={() => setView("setup")}>
              <Settings2 />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Undo last log" onClick={undoLast}>
              <Undo2 />
            </Button>
            <Button
              onClick={() => {
                unlockAudio();
                setLogOpen(true);
              }}
            >
              <Plus />
              {MODE_COPY[mode].verb}
            </Button>
          </>
        ) : null}
      </header>

      {view !== "race" && !theater ? (
        <div className="border-b border-border px-4 py-2 sm:px-6">
          <Button variant="ghost" size="sm" onClick={() => setView("race")}>
            <Flag className="size-3.5" />
            Back to the grid
          </Button>
        </div>
      ) : null}

      {theater || view === "race" ? (
        <div
          className={
            theater
              ? "grid h-[calc(100dvh-64px)]"
              : "grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-6"
          }
        >
          <div className="min-h-[280px] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card lg:min-h-[540px]">
            <TrackCanvas />
          </div>
          {!theater ? (
            <aside className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-border bg-card p-4">
              <Standings />
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight">
                  Live tape
                </h2>
                <div className="mt-3 max-h-48 overflow-y-auto">
                  <ActivityFeed />
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      ) : null}

      {view === "pit" && !theater ? (
        <div className="p-4 sm:p-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight">Pit roster</h1>
          <p className="mb-4 text-sm text-muted-foreground">
            Add, rename, move, or remove drivers. Five cars stay on the grid.
          </p>
          <RosterPanel />
        </div>
      ) : null}

      {view === "wheel" && !theater ? (
        <div className="p-4 sm:p-6">
          <PrizeWheel associateId={spinFor} />
        </div>
      ) : null}

      {view === "setup" && !theater ? (
        <div className="p-4 sm:p-6">
          <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight">
            Setup
          </h1>
          <SetupPanel />
        </div>
      ) : null}

      <QuickLog
  open={logOpen}
  onOpenChange={setLogOpen}
  onBundle={() => {
    // Bundle logged — wheel stays closed unless opened from the gift icon
  }}
/>

      <Sheet open={wheelOpen} onOpenChange={setWheelOpen}>
        <SheetContent side="bottom" className="p-6">
          <SheetTitle className="sr-only">Prize wheel</SheetTitle>
          <PrizeWheel
            associateId={spinFor}
            onDone={() => {
              setWheelOpen(false);
              setSpinFor(null);
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
