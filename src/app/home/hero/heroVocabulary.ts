/*
 * The vocabulary scattered behind the hero.
 *
 * A mix of systems (uppercase) and the work they do (sentence case), so the
 * field reads as a business rather than a product menu. The visitor is not
 * meant to read it — they are meant to notice, out of the corner of an eye,
 * that Payroll and Inventory and GST and job cards are all in here, and
 * conclude that this covers everything before reading a word of the
 * headline.
 *
 * ── Layout rules, and why ──
 *
 * Positions are hand-placed on three bands with generous spacing, not
 * scattered freely. An earlier version packed in 48 words and collided all
 * over: coordinates are percentages, so as the viewport narrows the gaps
 * shrink while the words keep the same pixel width, and neighbours that
 * cleared each other at 1920 were overlapping by 1024.
 *
 *   Top band     y 4–18    four, then three, then four — staggered
 *   Middle band  y 27–63   flanks only, at x 9 and x 91
 *   Bottom band  y 74–90   four, then three, then four
 *
 * The middle is reserved for the copy: the headline runs nearly the full
 * container width, so nothing sits between x 12 and x 88 anywhere in that
 * band. Within a row, centres are at least 26% apart — wider than the
 * longest phrase at the narrowest supported width.
 *
 * Every sector appears at least once — hotel, workshop, distribution,
 * restaurant, clinic, retail — so no visitor reads this as belonging to
 * somebody else's industry.
 */

export interface FieldWord {
  label: string;
  x: number;
  y: number;
  kind: "sys" | "evt";
}

const sys = (label: string, x: number, y: number): FieldWord => ({
  label,
  x,
  y,
  kind: "sys",
});
const evt = (label: string, x: number, y: number): FieldWord => ({
  label,
  x,
  y,
  kind: "evt",
});

export const FIELD: FieldWord[] = [
  // ── Top band ──
  evt("Invoice raised", 8, 4),
  evt("Stock updated", 36, 4),
  evt("Room assigned", 64, 4),
  evt("GST return filed", 92, 4),

  sys("Operations", 22, 11),
  evt("Job card opened", 50, 11),
  sys("Payroll", 78, 11),

  evt("Quotation sent", 8, 18),
  sys("CRM", 36, 18),
  sys("Inventory", 64, 18),
  evt("Route planned", 92, 18),

  // ── Middle band: flanks only, clear of the headline and the buttons ──
  sys("Marketplace", 9, 27),
  sys("Accounting", 91, 27),

  evt("Reports generated", 9, 36),
  sys("Analytics", 91, 36),

  sys("Customers", 9, 45),
  evt("Payments settled", 91, 45),

  evt("Audit logged", 9, 54),
  sys("Documents", 91, 54),

  evt("Warranty logged", 9, 63),
  evt("Employee onboarded", 91, 63),

  // ── Bottom band ──
  sys("Storage", 8, 74),
  evt("Purchase order", 36, 74),
  sys("People", 64, 74),
  evt("Kitchen ready", 92, 74),

  evt("Table booked", 22, 82),
  sys("Communication", 50, 82),
  evt("Prescription issued", 78, 82),

  evt("Shift closed", 8, 90),
  evt("Ledger reconciled", 36, 90),
  evt("Counter sale", 64, 90),
  evt("Approval granted", 92, 90),
];
