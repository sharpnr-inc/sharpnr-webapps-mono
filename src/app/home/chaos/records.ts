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
 * Only the *identity* fields carry the cyan mark, and only where they
 * disagree with the system of record. Reference numbers are deliberately
 * left unmarked however different they look: a challan number is *supposed*
 * to differ from an invoice number, and marking it would say "this is
 * broken" about the one thing here that is working correctly. Marking
 * everything is what made the accent meaningless at fourteen underlines —
 * cyan now means exactly one thing, so the eye can trust it.
 *
 * Phone numbers show at most the last three digits. The rule is the same
 * everywhere; the presentation is not, which is the point.
 */

export interface Cell {
  value: string;
  /** Disagrees with the system of record. Draws the cyan mark. */
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
      { value: "CUST-0194" },
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
