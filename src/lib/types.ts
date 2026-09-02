import type { SwatchId } from "./palette";

export type BoardMode = "sales" | "saves" | "cancels";
export type Period = "today" | "week" | "month" | "all";

export type Team = {
  id: string;
  name: string;
  swatch: SwatchId;
};

export type Associate = {
  id: string;
  teamId: string;
  name: string;
  active: boolean;
};

export type LogEvent = {
  id: string;
  at: number;
  associateId: string;
  teamId: string;
  kind: BoardMode;
  qty: number;
  note: string;
  bundle: boolean;
};

export type Prize = {
  id: string;
  label: string;
  weight: number;
};

export type SpinRecord = {
  id: string;
  at: number;
  associateId: string;
  prize: string;
};

export type CircuitState = {
  version: number;
  teams: Team[];
  associates: Associate[];
  events: LogEvent[];
  prizes: Prize[];
  spins: SpinRecord[];
  mode: BoardMode;
  period: Period;
  lapGoal: number;
  bundleThreshold: number;
  sound: boolean;
  theater: boolean;
  pendingBonusId: string | null;
};
