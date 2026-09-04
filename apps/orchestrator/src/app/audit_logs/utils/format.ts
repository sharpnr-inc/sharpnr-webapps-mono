import {
  Activity,
  Download,
  KeyRound,
  LogIn,
  LogOut,
  Pencil,
  Settings2,
  Trash2,
  UserPlus,
} from "lucide-react";
import type { AuditLogEntry } from "../api/types";

/**
 * `action` and `module` are free-form strings from the backend (e.g. "create",
 * "user.login", "permission_change"), so icon and tone are matched on the verb
 * rather than a closed union.
 */
const ACTION_ICONS: [RegExp, typeof Pencil][] = [
  [/create|add|invite/i, UserPlus],
  [/update|edit|modif/i, Pencil],
  [/delete|remove|revoke/i, Trash2],
  [/logout|signout|sign_out/i, LogOut],
  [/login|signin|sign_in/i, LogIn],
  [/export|download/i, Download],
  [/permission|role|access|grant/i, KeyRound],
  [/config|setting/i, Settings2],
];

export const DESTRUCTIVE_ACTION = /delete|remove|revoke|fail|denied/i;

export function actionIcon(action: string) {
  return ACTION_ICONS.find(([pattern]) => pattern.test(action))?.[1] ?? Activity;
}

/** "user.permission_change" → "User permission change" */
export function formatAction(action: string) {
  const words = action.replace(/[._-]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function actorLabel(entry: AuditLogEntry) {
  return entry.actor.name?.trim() || entry.actor.type || "Unknown";
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Metadata values are `unknown` — render scalars as-is, objects as JSON. */
export function formatMetaValue(value: unknown) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

/** Headline for a log entry, falling back to the action when unlabelled. */
export function entryTitle(entry: AuditLogEntry) {
  return entry.description?.trim() || formatAction(entry.action);
}
