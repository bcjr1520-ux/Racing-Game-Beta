export const TEAM_SWATCHES = {
  crimson: "#c45c54",
  teal: "#2f9a8c",
  steel: "#4d7aa8",
  sand: "#8a7d6b",
  olive: "#6b8f71",
  slate: "#7a8494",
  plum: "#8b6f8f",
  copper: "#a67c5d",
  pine: "#4f7f6e",
  ink: "#5c6b8a",
} as const;

export type SwatchId = keyof typeof TEAM_SWATCHES;

export const SWATCH_ORDER: SwatchId[] = [
  "crimson",
  "teal",
  "steel",
  "sand",
  "olive",
  "slate",
  "plum",
  "copper",
  "pine",
  "ink",
];
