import type { IvaMessage } from "./iva.types";

/**
 * Placeholder content. Everything here is replaced once Iva is wired to a real
 * assistant backend -- it exists so the widget has something to render.
 */

export const DEFAULT_SUGGESTIONS = [
  "What can you do?",
  "Show me today's summary",
  "How do I add a legal entity?",
  "Open documentation",
];

export function greeting(assistantName: string): IvaMessage {
  return {
    id: "greeting",
    role: "assistant",
    text: `Hi, I'm ${assistantName} — your Sharpnr assistant. Ask me anything, or pick a suggestion below.`,
    at: Date.now(),
  };
}

const CANNED: { match: RegExp; reply: string }[] = [
  {
    match: /what can you do|help|capabilities/i,
    reply:
      "Right now I'm a placeholder — the UI is real, the answers are not. Once I'm connected I'll handle summaries, navigation and lookups across every Sharpnr app.",
  },
  {
    match: /summary|today|report/i,
    reply:
      "Here's a placeholder summary: 12 open tasks, 3 pending approvals and 1 overdue invoice. Real figures arrive with the backend.",
  },
  {
    match: /legal entity|entity/i,
    reply:
      "In Orchestrator, go to Legal Entity → Add. I'll be able to deep-link you there directly once navigation is wired up.",
  },
  {
    match: /doc|documentation|guide/i,
    reply: "The docs live at docs.sharpnr.com — I'll open the right page for you later on.",
  },
];

const FALLBACKS = [
  "Noted. I'm not connected to a real model yet, so this is a canned reply.",
  "Got it — that'll make sense once my backend is live.",
  "I hear you. For now I'm just here to prove the widget works.",
];

/** Deterministic-ish canned reply so the demo feels responsive. */
export function cannedReply(input: string, turn: number): string {
  const hit = CANNED.find((c) => c.match.test(input));
  if (hit) return hit.reply;
  return FALLBACKS[turn % FALLBACKS.length];
}
