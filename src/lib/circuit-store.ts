import { create } from "zustand";
import { persist } from "zustand/middleware";
import { playLog } from "./audio";
import { DEFAULT_PRIZES, DEFAULT_TEAMS, seedAssociates, seedEvents } from "./seed";
import type { SwatchId } from "./palette";
import type {
  Associate,
  BoardMode,
  CircuitState,
  LogEvent,
  Period,
  Prize,
  SpinRecord,
} from "./types";

export const SAVE_VERSION = 1;

const associates = seedAssociates();

function uid() {
  return crypto.randomUUID();
}

type Actions = {
  setHydrated: () => void;
  setMode: (mode: BoardMode) => void;
  setPeriod: (period: Period) => void;
  setLapGoal: (n: number) => void;
  setBundleThreshold: (n: number) => void;
  setSound: (on: boolean) => void;
  setTheater: (on: boolean) => void;
  renameTeam: (id: string, name: string) => void;
  setTeamSwatch: (id: string, swatch: SwatchId) => void;
  addAssociate: (teamId: string, name: string) => void;
  renameAssociate: (id: string, name: string) => void;
  removeAssociate: (id: string) => void;
  moveAssociate: (id: string, teamId: string) => void;
  logUnit: (input: {
    associateId: string;
    qty: number;
    note?: string;
  }) => { event: LogEvent; bundle: boolean; bonusApplied: boolean };
  undoLast: () => void;
  setPrizes: (prizes: Prize[]) => void;
  recordSpin: (associateId: string, prize: string) => void;
  clearPeriodEvents: () => void;
  resetBoard: () => void;
  importState: (raw: unknown) => boolean;
};

export type CircuitStore = CircuitState & { hydrated: boolean } & Actions;

export const useCircuit = create<CircuitStore>()(
  persist(
    (set, get) => ({
      version: SAVE_VERSION,
      hydrated: false,
      teams: DEFAULT_TEAMS,
      associates,
      events: seedEvents(associates),
      prizes: DEFAULT_PRIZES,
      spins: [],
      mode: "sales",
      period: "today",
      lapGoal: 25,
      bundleThreshold: 2,
      sound: false,
      theater: false,
      pendingBonusId: null,
      setHydrated: () => set({ hydrated: true }),
      setMode: (mode) => set({ mode }),
      setPeriod: (period) => set({ period }),
      setLapGoal: (n) => set({ lapGoal: Math.max(5, Math.min(200, Math.round(n) || 25)) }),
      setBundleThreshold: (n) =>
        set({ bundleThreshold: Math.max(2, Math.min(10, Math.round(n) || 2)) }),
      setSound: (sound) => set({ sound }),
      setTheater: (theater) => set({ theater }),
      renameTeam: (id, name) =>
        set({
          teams: get().teams.map((t) =>
            t.id === id ? { ...t, name: name.trim() || t.name } : t,
          ),
        }),
      setTeamSwatch: (id, swatch) =>
        set({
          teams: get().teams.map((t) => (t.id === id ? { ...t, swatch } : t)),
        }),
      addAssociate: (teamId, name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        const a: Associate = { id: uid(), teamId, name: trimmed, active: true };
        set({ associates: [...get().associates, a] });
      },
      renameAssociate: (id, name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        set({
          associates: get().associates.map((a) =>
            a.id === id ? { ...a, name: trimmed } : a,
          ),
        });
      },
      removeAssociate: (id) =>
        set({ associates: get().associates.filter((a) => a.id !== id) }),
      moveAssociate: (id, teamId) =>
        set({
          associates: get().associates.map((a) =>
            a.id === id ? { ...a, teamId } : a,
          ),
        }),
      logUnit: ({ associateId, qty, note }) => {
        const state = get();
        const assoc = state.associates.find((a) => a.id === associateId);
        if (!assoc) {
          throw new Error("Associate not found");
        }
        let amount = Math.max(1, Math.round(qty));
        let bonusApplied = false;
        if (state.pendingBonusId === associateId) {
          amount += 1;
          bonusApplied = true;
        }
        const bundle = amount >= state.bundleThreshold;
        const event: LogEvent = {
          id: uid(),
          at: Date.now(),
          associateId,
          teamId: assoc.teamId,
          kind: state.mode,
          qty: amount,
          note: note?.trim() ?? "",
          bundle,
        };
        set({
          events: [...state.events, event],
          pendingBonusId: bonusApplied ? null : state.pendingBonusId,
        });
        if (state.sound) playLog(bundle);
        return { event, bundle, bonusApplied };
      },
      undoLast: () => {
        const events = get().events;
        if (!events.length) return;
        set({ events: events.slice(0, -1) });
      },
      setPrizes: (prizes) => set({ prizes }),
      recordSpin: (associateId, prize) => {
        const rec: SpinRecord = {
          id: uid(),
          at: Date.now(),
          associateId,
          prize,
        };
        const pendingBonusId = prize.toLowerCase().includes("double-count")
          ? associateId
          : get().pendingBonusId;
        set({ spins: [...get().spins, rec], pendingBonusId });
      },
      clearPeriodEvents: () => {
        const { period, events } = get();
        const now = new Date();
        const start =
          period === "all"
            ? Number.POSITIVE_INFINITY
            : period === "today"
              ? new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
              : period === "week"
                ? now.getTime() - ((now.getDay() + 6) % 7) * 86400000
                : new Date(now.getFullYear(), now.getMonth(), 1).getTime();
        if (period === "all") {
          set({ events: [] });
          return;
        }
        set({ events: events.filter((e) => e.at < start) });
      },
      resetBoard: () => {
        const next = seedAssociates();
        set({
          teams: DEFAULT_TEAMS,
          associates: next,
          events: [],
          spins: [],
          prizes: DEFAULT_PRIZES,
          pendingBonusId: null,
          mode: "sales",
          period: "today",
          lapGoal: 25,
          bundleThreshold: 2,
        });
      },
      importState: (raw) => {
        try {
          const data = raw as Partial<CircuitState>;
          if (!data || !Array.isArray(data.teams) || !Array.isArray(data.associates)) {
            return false;
          }
          set({
            teams: data.teams,
            associates: data.associates,
            events: data.events ?? [],
            prizes: data.prizes ?? DEFAULT_PRIZES,
            spins: data.spins ?? [],
            mode: data.mode ?? "sales",
            period: data.period ?? "today",
            lapGoal: data.lapGoal ?? 25,
            bundleThreshold: data.bundleThreshold ?? 2,
            pendingBonusId: data.pendingBonusId ?? null,
          });
          return true;
        } catch {
          return false;
        }
      },
    }),
    {
      name: "circuit-board-v1",
      version: SAVE_VERSION,
      skipHydration: true,
      partialize: (s) => ({
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
        sound: s.sound,
        pendingBonusId: s.pendingBonusId,
      }),
    },
  ),
);
