import {
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import type { BoardMode, LogEvent, Period } from "./types";

export function periodStart(period: Period, now = new Date()): number {
  if (period === "all") return 0;
  if (period === "today") return startOfDay(now).getTime();
  if (period === "week") return startOfWeek(now, { weekStartsOn: 1 }).getTime();
  return startOfMonth(now).getTime();
}

export function inPeriod(events: LogEvent[], period: Period, now = new Date()) {
  const start = periodStart(period, now);
  return events.filter((e) => e.at >= start);
}

export function forMode(events: LogEvent[], mode: BoardMode) {
  return events.filter((e) => e.kind === mode);
}

export function sumQty(events: LogEvent[]) {
  return events.reduce((n, e) => n + e.qty, 0);
}

export function scoreFor(
  events: LogEvent[],
  mode: BoardMode,
  period: Period,
  pred: (e: LogEvent) => boolean,
) {
  return sumQty(forMode(inPeriod(events, period), mode).filter(pred));
}

export const MODE_COPY: Record<
  BoardMode,
  { label: string; unit: string; verb: string; headline: string }
> = {
  sales: {
    label: "Sales",
    unit: "sale",
    verb: "Log sale",
    headline: "Most units sold",
  },
  saves: {
    label: "Saves",
    unit: "save",
    verb: "Log save",
    headline: "Most accounts saved",
  },
  cancels: {
    label: "Cancels",
    unit: "cancel",
    verb: "Log cancel",
    headline: "Cancel volume on track",
  },
};

export const PERIOD_COPY: Record<Period, string> = {
  today: "Today",
  week: "This week",
  month: "This month",
  all: "All time",
};
