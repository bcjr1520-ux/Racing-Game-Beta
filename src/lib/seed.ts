import type { Associate, LogEvent, Prize, Team } from "./types";

export const DEFAULT_TEAMS: Team[] = [
  { id: "t1", name: "Renegades", swatch: "crimson" },
  { id: "t2", name: "Apex", swatch: "teal" },
  { id: "t3", name: "Titan", swatch: "steel" },
  { id: "t4", name: "Harbor", swatch: "sand" },
  { id: "t5", name: "North", swatch: "olive" },
];

const NAMES: Record<string, string[]> = {
  t1: [
    "Maya Ellis",
    "Jordan Hale",
    "Priya Shah",
    "Chris Dalton",
    "Elena Ruiz",
    "Marcus Quinn",
    "Nina Patel",
    "Owen Grant",
    "Sasha Kim",
    "Theo Brooks",
  ],
  t2: [
    "Lila Chen",
    "Andre Cole",
    "Riley Fox",
    "Hannah Park",
    "Dev Patel",
    "Sofia Lane",
    "Jonah West",
    "Ava Monroe",
    "Kai Reynolds",
    "Nora Blake",
  ],
  t3: [
    "Ivy Santos",
    "Ben Carter",
    "Mila Ortiz",
    "Sam Reed",
    "Zoe Hart",
    "Leo Navarro",
    "Claire Dunn",
    "Nate Young",
    "Ruby Singh",
    "Paul Kim",
  ],
  t4: [
    "Ada Walsh",
    "Hugo Price",
    "Iris Cole",
    "Finn Doyle",
    "Lena Moss",
    "Omar Diaz",
    "Willa Grant",
    "Seth Nolan",
    "Jade Tran",
    "Cole Hayes",
  ],
  t5: [
    "Quinn Avery",
    "Tara Singh",
    "Miles Boone",
    "Eva Shore",
    "Rex Palmer",
    "Nora Vale",
    "Gus Klein",
    "Pia Romero",
    "Hank Ortiz",
    "Cora Flynn",
  ],
};

export function seedAssociates(): Associate[] {
  return Object.entries(NAMES).flatMap(([teamId, names]) =>
    names.map((name, i) => ({
      id: `${teamId}-a${i + 1}`,
      teamId,
      name,
      active: true,
    })),
  );
}

export const DEFAULT_PRIZES: Prize[] = [
  { id: "p1", label: "Extra 15-min break", weight: 3 },
  { id: "p2", label: "Floor shout-out", weight: 4 },
  { id: "p3", label: "Pick the huddle playlist", weight: 3 },
  { id: "p4", label: "Leave 10 minutes early", weight: 2 },
  { id: "p5", label: "Mystery snack run", weight: 3 },
  { id: "p6", label: "Skip next icebreaker", weight: 3 },
  { id: "p7", label: "Double-count next unit", weight: 2 },
  { id: "p8", label: "Team lunch vote", weight: 1 },
];

export function seedEvents(associates: Associate[]): LogEvent[] {
  const now = Date.now();
  const picks = [
    ["t1-a1", "t1", 3],
    ["t1-a4", "t1", 1],
    ["t2-a2", "t2", 2],
    ["t2-a7", "t2", 1],
    ["t3-a3", "t3", 4],
    ["t3-a1", "t3", 1],
    ["t4-a5", "t4", 2],
    ["t5-a2", "t5", 3],
    ["t5-a8", "t5", 1],
    ["t1-a8", "t1", 2],
    ["t2-a4", "t2", 1],
    ["t4-a1", "t4", 1],
  ] as const;
  return picks.map(([associateId, teamId, qty], i) => ({
    id: `seed-${i}`,
    at: now - (picks.length - i) * 19 * 60 * 1000,
    associateId,
    teamId,
    kind: "sales" as const,
    qty,
    note: "",
    bundle: qty >= 2,
  })).filter((e) => associates.some((a) => a.id === e.associateId));
}
