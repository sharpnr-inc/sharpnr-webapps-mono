export interface BlockDef {
  label: string;
}

/**
 * The eight capabilities every business runs on — named in Scene 03's core
 * map. Shared in one place so the vocabulary stays a single source of
 * truth even though Scene 02's own visual no longer names them directly.
 */
export const BLOCKS: BlockDef[] = [
  { label: "Operations" },
  { label: "Finance" },
  { label: "Communication" },
  { label: "People" },
  { label: "Inventory" },
  { label: "Customers" },
  { label: "Reports" },
  { label: "Intelligence" },
];
