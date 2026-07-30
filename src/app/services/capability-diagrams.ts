/*
 * Keyed by `Capability.id` — the section looks its drawing up rather than
 * the data file importing components, so `capabilities.tsx` stays content.
 *
 * The map lives here rather than in `./diagrams` so that that file exports
 * drawings and nothing else, which is what lets Vite hot-replace one while
 * you are working on it.
 */
import type { ReactElement } from "react";

import {
  DiagramCollab,
  DiagramCustomerRecord,
  DiagramFinance,
  DiagramIdentity,
  DiagramKnowledge,
  DiagramNetwork,
  DiagramPeople,
} from "./diagrams";

export const CAPABILITY_DIAGRAMS: Record<string, () => ReactElement> = {
  "financial-management": DiagramFinance,
  "people-workforce": DiagramPeople,
  "customer-relationships": DiagramCustomerRecord,
  "communication-collaboration": DiagramCollab,
  "identity-governance": DiagramIdentity,
  "knowledge-intelligence": DiagramKnowledge,
  "business-network": DiagramNetwork,
};
