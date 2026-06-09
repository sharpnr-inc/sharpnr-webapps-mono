export const INFRA_Y = 480;
export const INFRA_X = -360;

// Layout constants
export const DIAGRAM_MIN_HEIGHT = 640;
export const DIAGRAM_HEIGHT = "75vh";

// We keep some HEX values for ReactFlow props that might not support CSS variables well
export const COLORS = {
  bg: "#0e0e0f",
  surface: "#161618",
  surfaceAlt: "#1c1c1f",
  border: "#2a2a2e",
  borderDash: "#3a3a3e",
  accent: "#e8604c",
  accentDim: "#7a3028",
  text: "#e2e2e6",
  textMuted: "#888890",
  textDim: "#555560",
  infra: "#141417",
} as const;
