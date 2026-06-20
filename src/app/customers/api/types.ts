/**
 * Customer domain types.
 *
 * These mirror the shape we expect the backend customers endpoint to return.
 * The index page currently runs off mock data (see `../mock/customers`),
 * but is wired so swapping in a real `useCustomers()` query is a drop-in.
 */

export type CustomerStatus = "active" | "inactive" | "prospect";

/** Loyalty / value tier derived from lifetime spend. */
export type CustomerTier = "standard" | "silver" | "gold" | "platinum";

export type PurchaseStatus = "paid" | "pending" | "refunded";

export type ServiceStatus = "open" | "in_progress" | "resolved" | "cancelled";

export interface Purchase {
  id: string;
  /** ISO-8601 date */
  date: string;
  /** Order / invoice reference shown to the user */
  reference: string;
  summary: string;
  amount: number;
  status: PurchaseStatus;
  /** e.g. "Restaurant", "Marketplace", "Subscription" */
  channel: string;
}

export interface ServiceRecord {
  id: string;
  /** ISO-8601 date */
  date: string;
  reference: string;
  subject: string;
  status: ServiceStatus;
  /** Assigned handler / agent */
  handler: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  /** City / region label */
  location: string;
  status: CustomerStatus;
  tier: CustomerTier;
  currency: string;
  /** ISO-8601 date the customer was first onboarded */
  joinedAt: string;
  /** ISO-8601 timestamp of most recent activity */
  lastActivityAt: string;
  /** Lifetime spend across all channels */
  lifetimeValue: number;
  purchases: Purchase[];
  services: ServiceRecord[];
}

export interface CustomerQuery {
  search?: string;
  status?: CustomerStatus | "all";
  tier?: CustomerTier | "all";
  page?: number;
  pageSize?: number;
}

export interface CustomerResponse {
  data: Customer[];
  total: number;
  page: number;
  pageSize: number;
}
