// heroApps.ts — update your existing file to add a `slug` field per entry.
// `slug` must match the simple-icons icon name exactly (lowercase, no spaces/punctuation).
// Browse available icons at: https://simpleicons.org
//
// The `color` field is the brand's official hex (also listed on simpleicons.org).
// Used for the hover tint & border glow in AppGridBackground.

export const APPS = [
  // ── Food & Delivery ───────────────────────────────────────────────────────
  { short: "Uber Eats",  color: "#06C167", slug: "ubereats",  icon: "" },
  { short: "DoorDash",   color: "#FF3008", slug: "doordash",  icon: "" },
  { short: "Zomato",     color: "#E23744", slug: "zomato",    icon: "" },

  // ── Travel & Transport ────────────────────────────────────────────────────
  { short: "Airbnb",     color: "#FF5A5F", slug: "airbnb",    icon: "" },
  { short: "Booking",    color: "#003580", slug: "bookingcom", icon: "" },
  { short: "Uber",       color: "#000000", slug: "uber",      icon: "" },

  // ── E-Commerce ────────────────────────────────────────────────────────────
  { short: "Amazon",     color: "#FF9900", slug: "amazon",    icon: "" },
  { short: "Shopify",    color: "#96BF48", slug: "shopify",   icon: "" },
  { short: "eBay",       color: "#E53238", slug: "ebay",      icon: "" },

  // ── Home Services ─────────────────────────────────────────────────────────
  { short: "TaskRabbit", color: "#4A90D9", slug: "taskrabbit", icon: "" },
  { short: "Thumbtack",  color: "#009FD9", slug: "thumbtack",  icon: "" },

  // ── Payments ──────────────────────────────────────────────────────────────
  { short: "PayPal",     color: "#00457C", slug: "paypal",    icon: "" },
  { short: "Stripe",     color: "#008CDD", slug: "stripe",    icon: "" },

  // ── Ride & Maps ───────────────────────────────────────────────────────────
  { short: "Lyft",       color: "#FF00BF", slug: "lyft",      icon: "" },
  { short: "Google Maps",color: "#4285F4", slug: "googlemaps", icon: "" },
] as const;

export type App = typeof APPS[number];
