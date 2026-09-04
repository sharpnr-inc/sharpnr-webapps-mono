import { create } from "zustand";

/**
 * Buyer-side marketplace state: saved listings, the compare tray, and RFQs
 * raised during this session.
 *
 * It lives in a store rather than in each page's local state so the three
 * surfaces stay in step -- an RFQ raised from a listing card shows up on the
 * RFQs page, and the header counters update from wherever the action happened.
 * Everything here is session-only until the real endpoints exist.
 */

export type RfqStatus = "Sent" | "Quoted" | "Withdrawn";

export type Rfq = {
  id: string;
  listingId: string;
  listingTitle: string;
  supplierName: string;
  quantity: number;
  neededBy: string;
  note: string;
  status: RfqStatus;
  sentAt: string;
};

/** Two vendors is the minimum worth comparing; four columns stops fitting. */
export const MAX_COMPARE = 4;

interface MarketplaceState {
  savedIds: string[];
  compareIds: string[];
  rfqs: Rfq[];

  toggleSaved: (listingId: string) => void;
  toggleCompare: (listingId: string) => boolean;
  clearCompare: () => void;
  addRfq: (rfq: Omit<Rfq, "id" | "status" | "sentAt">) => void;
  withdrawRfq: (rfqId: string) => void;
}

const seededRfqs: Rfq[] = [
  {
    id: "rfq_0001",
    listingId: "lst_1003",
    listingTitle: "Corrugated shipping carton — 400×300×300 mm",
    supplierName: "Ardent Packaging",
    quantity: 2000,
    neededBy: "2026-09-22",
    note: "Need 3-colour print with our logo. Please quote with and without print.",
    status: "Quoted",
    sentAt: "2026-09-01",
  },
  {
    id: "rfq_0002",
    listingId: "lst_2002",
    listingTitle: "HVAC preventive maintenance contract — annual",
    supplierName: "Lumen Facility Services",
    quantity: 1,
    neededBy: "2026-10-01",
    note: "Three sites in Bengaluru. Please quote per site and as a bundle.",
    status: "Sent",
    sentAt: "2026-09-03",
  },
];

export const useMarketplaceStore = create<MarketplaceState>((set, get) => ({
  savedIds: ["lst_1007"],
  compareIds: [],
  rfqs: seededRfqs,

  toggleSaved: (listingId) =>
    set((state) => ({
      savedIds: state.savedIds.includes(listingId)
        ? state.savedIds.filter((id) => id !== listingId)
        : [...state.savedIds, listingId],
    })),

  /** Returns false when the tray is full, so the caller can say why. */
  toggleCompare: (listingId) => {
    const { compareIds } = get();

    if (compareIds.includes(listingId)) {
      set({ compareIds: compareIds.filter((id) => id !== listingId) });
      return true;
    }

    if (compareIds.length >= MAX_COMPARE) return false;

    set({ compareIds: [...compareIds, listingId] });
    return true;
  },

  clearCompare: () => set({ compareIds: [] }),

  addRfq: (rfq) =>
    set((state) => ({
      rfqs: [
        {
          ...rfq,
          id: `rfq_${String(state.rfqs.length + 1).padStart(4, "0")}`,
          status: "Sent",
          sentAt: new Date().toISOString().slice(0, 10),
        },
        ...state.rfqs,
      ],
    })),

  withdrawRfq: (rfqId) =>
    set((state) => ({
      rfqs: state.rfqs.map((rfq) =>
        rfq.id === rfqId ? { ...rfq, status: "Withdrawn" } : rfq,
      ),
    })),
}));
