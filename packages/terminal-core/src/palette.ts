// PASO palette tokens for CLI/UI theming. Use this palette for all CLI color output.
// Keep in sync with docs/cli/index.md (CLI palette section).
export const PASO_PALETTE = {
  accent: "#E8590C",
  accentBright: "#F47A3A",
  accentDim: "#B9470A",
  info: "#F08B55",
  success: "#2FBF71",
  warn: "#FFB020",
  error: "#E23D2D",
  muted: "#8C827A",
} as const;

/** @deprecated Use PASO_PALETTE. Kept for import compatibility. */
export const LOBSTER_PALETTE = PASO_PALETTE;
