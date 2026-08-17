/*
 * Scene 02 — one customer, five systems, one ledger.
 *
 * Nothing here is exaggerated. This is what accumulates when software is
 * bought one tool at a time: four spellings of one name, five masking
 * conventions, five key schemes, and four fields nobody ever captured —
 * each absent in that system's own dialect ("Customer missing", "No phone",
 * "NULL", "—"). Real enterprise data is not tidy, and a tidy table would
 * have been unbelievable.
 *
 * ── What the cyan mark means ─────────────────────────────────────────
 * A value that diverges from the others in its column. Not "wrong" —
 * **nothing in this scene is authoritative**, because the whole point is
 * that there is no system of record yet. One arrives in Scene 03.
 *
 * That distinction is easy to lose and was lost once already. The mark was
 * described as "disagrees with the system of record", and the CRM row was
 * left entirely unmarked as the implicit baseline — which drew a table
 * saying the CRM holds the truth and four other systems are wrong. It is
 * the same CRM-first bias that had to be taken out of Scene 03's slab. Two
 * rows may legitimately agree with each other (Delivery and the CRM both
 * spell the name in full, and neither is marked for it); no row gets to be
 * clean by default.
 *
 * Reference numbers stay unmarked however different they look: a challan
 * number is *supposed* to differ from an invoice number, and marking it
 * would call the one correct thing here broken. Marking everything is what
 * made the accent meaningless at fourteen underlines — cyan means exactly
 * one thing, so the eye can trust it.
 *
 * Phone numbers show at most the last three digits. The rule is the same
 * everywhere; the presentation is not, which is the point.
 */

export interface Cell {
  value: string;
  /** Diverges from the others in its column. Draws the cyan mark. */
  off?: boolean;
  /** Never captured. Renders as an absence — never marked. */
  missing?: boolean;
}

export interface Row {
  system: string;
  /** The document that system thinks it is holding. */
  doc: string;
  cells: Cell[];
}

/* Database columns, not form labels. "Primary key" is the sharpest of them:
   it names precisely what every one of these systems minted for itself. */
export const COLUMNS = ["Identity", "Contact", "Primary key", "Reference"];

export const ROWS: Row[] = [
  {
    system: "CRM",
    doc: "Contact",
    cells: [
      { value: "Ramesh Kumar" },
      { value: "+91 98xxxx345" },
      /* Marked, and it matters that it is.
         Every system in this column minted its own key — CUST-0194,
         AC-4471, USR-77, and two that were never captured at all. If the
         other schemes are marked and this one is not, the table says
         CUST-0194 is the customer's real id and the CRM is the system of
         record. It is not: in this scene nothing is, and that is the whole
         reason Scene 03 exists. Leaving this cell clean also left the CRM
         as the only row in the table with no mark anywhere on it, which
         crowned it by omission. */
      { value: "CUST-0194", off: true },
      { value: "LEAD-2231" },
    ],
  },
  {
    system: "Billing",
    doc: "Invoice",
    cells: [
      { value: "R. Kumar", off: true },
      { value: "98xxxxx345", off: true },
      { value: "AC-4471", off: true },
      { value: "INV-88213" },
    ],
  },
  {
    system: "Orders",
    doc: "Sales order",
    cells: [
      { value: "Ramesh K.", off: true },
      { value: "+91 98xxxx345" },
      { value: "Customer missing", missing: true },
      { value: "SO-1180" },
    ],
  },
  {
    system: "Delivery",
    doc: "Challan",
    cells: [
      { value: "Ramesh Kumar" },
      { value: "98xxxx345", off: true },
      { value: "—", missing: true },
      { value: "DC-0447" },
    ],
  },
  {
    system: "Support",
    doc: "Ticket",
    cells: [
      { value: "Kumar, Ramesh", off: true },
      { value: "No phone", missing: true },
      { value: "USR-77", off: true },
      { value: "NULL", missing: true },
    ],
  },
];

/*
 * Deliberately about the *systems*, not the people — the paragraph beside
 * this table already makes the point about staff ("your people become the
 * integration"), and repeating it here would spend the strongest position
 * in the section on something already said.
 */
export const VERDICT = "Five systems. Five identities. One customer.";
