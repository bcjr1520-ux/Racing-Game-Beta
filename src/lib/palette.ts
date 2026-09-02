export const TEAM_SWATCHES = {
  crimson: "#c45c54",
  teal: "#2f9a8c",
  steel: "#4d7aa8",
  sand: "#8a7d6b",
  olive: "#6b8f71",
} as const;

export type SwatchId = keyof typeof TEAM_SWATCHES;

export const SWATCH_ORDER: SwatchId[] = [
  "crimson",
  "teal",
  "steel",
  "sand",
  "olive",
];
