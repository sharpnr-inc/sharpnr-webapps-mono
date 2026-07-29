/*
 * Scene 05 data — what changes, and what never does.
 *
 * The claim is "built around your business, not the other way around", so
 * the visual has to show a business shaping the platform rather than the
 * reverse. Two bands: an industry layer that swaps entirely when you
 * choose a trade, and a foundation underneath that does not move by a
 * pixel. The foundation holding still *is* the argument — if it shifted,
 * the platform would be the thing being rebuilt each time.
 *
 * Flat and full-width. This is where the alternating left/right rhythm of
 * Scenes 02–04 ends, so the page changes cadence at the point the story
 * turns from proving the platform to describing it.
 */

export interface Industry {
  label: string;
  /** The modules that exist only for this trade. */
  layer: string[];
}

export const INDUSTRIES: Industry[] = [
  { label: "Hospitality", layer: ["Tables", "Kitchen", "Rooms", "Menu"] },
  { label: "Retail", layer: ["Storefront", "Checkout", "Catalogue", "Loyalty"] },
  { label: "Healthcare", layer: ["Patients", "Appointments", "Records", "Prescriptions"] },
  { label: "Professional", layer: ["Projects", "Timesheets", "Retainers", "Deliverables"] },
  { label: "Manufacturing", layer: ["Production", "Materials", "Quality", "Shipments"] },
  { label: "Logistics", layer: ["Fleet", "Routes", "Consignments", "Depots"] },
];

/** Grouped rather than a flat run of six — an ungrouped list reads as
 * machine-generated. Business-facing capabilities first, then the platform
 * services underneath them. */
export const FOUNDATION_GROUPS: { rule: string; items: string[] }[] = [
  { rule: "Business core", items: ["Identity", "Accounting", "People"] },
  { rule: "Platform core", items: ["Communication", "Data", "Intelligence"] },
];
