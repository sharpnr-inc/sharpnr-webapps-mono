import type { LucideIcon } from "lucide-react";
import { Settings2, Wallet, MessageSquare, Users, Boxes, Contact, BarChart3 } from "lucide-react";

export interface BlockDef {
  label: string;
  icon: LucideIcon;
}

/**
 * The seven capabilities every business runs on — fragmented in Scene 02,
 * settled into one structure in Scene 03. Shared so both scenes render the
 * same shapes and the payoff reads as continuation, not repetition.
 */
export const BLOCKS: BlockDef[] = [
  { label: "Operations", icon: Settings2 },
  { label: "Finance", icon: Wallet },
  { label: "Communication", icon: MessageSquare },
  { label: "People", icon: Users },
  { label: "Inventory", icon: Boxes },
  { label: "Customers", icon: Contact },
  { label: "Reports", icon: BarChart3 },
];
