/**
 * Dummy marketplace catalogue.
 *
 * Stands in until the listings API exists. Every listing belongs to a supplier
 * organization, because this is an org-to-org marketplace -- there are no
 * individual sellers, and a listing without a verified org behind it would not
 * be a thing the real product can represent.
 */

export type ListingKind = "product" | "service";

export type Supplier = {
  id: string;
  name: string;
  sharpId: string;
  industry: string;
  location: string;
  /** Verified organizations are the only ones allowed to trade. */
  verified: boolean;
  rating: number;
  reviews: number;
  respondsIn: string;
  onPlatformSince: string;
};

export type Listing = {
  id: string;
  kind: ListingKind;
  title: string;
  summary: string;
  category: string;
  supplierId: string;
  /** Unit price in INR, or a day rate for services. */
  price: number;
  unit: string;
  /** Minimum order quantity. Services quote per engagement, so 1. */
  moq: number;
  leadTime: string;
  tags: string[];
  specs: { label: string; value: string }[];
};

export const suppliers: Supplier[] = [
  {
    id: "org_meridian",
    name: "Meridian Foods",
    sharpId: "SHRP-4821",
    industry: "Food & Beverage",
    location: "Pune, MH",
    verified: true,
    rating: 4.8,
    reviews: 214,
    respondsIn: "under 4 hours",
    onPlatformSince: "2024",
  },
  {
    id: "org_kestrel",
    name: "Kestrel Components",
    sharpId: "SHRP-6142",
    industry: "Industrial Supply",
    location: "Coimbatore, TN",
    verified: true,
    rating: 4.6,
    reviews: 138,
    respondsIn: "same day",
    onPlatformSince: "2023",
  },
  {
    id: "org_ardent",
    name: "Ardent Packaging",
    sharpId: "SHRP-2290",
    industry: "Packaging",
    location: "Ahmedabad, GJ",
    verified: true,
    rating: 4.4,
    reviews: 96,
    respondsIn: "1 business day",
    onPlatformSince: "2025",
  },
  {
    id: "org_northwind",
    name: "Northwind Interiors",
    sharpId: "SHRP-7734",
    industry: "Furniture & Fit-out",
    location: "Jaipur, RJ",
    verified: true,
    rating: 4.9,
    reviews: 302,
    respondsIn: "under 2 hours",
    onPlatformSince: "2022",
  },
  {
    id: "org_lumen",
    name: "Lumen Facility Services",
    sharpId: "SHRP-5518",
    industry: "Facilities",
    location: "Bengaluru, KA",
    verified: true,
    rating: 4.5,
    reviews: 174,
    respondsIn: "same day",
    onPlatformSince: "2024",
  },
  {
    id: "org_veritas",
    name: "Veritas Advisory",
    sharpId: "SHRP-9061",
    industry: "Professional Services",
    location: "Mumbai, MH",
    verified: true,
    rating: 4.7,
    reviews: 61,
    respondsIn: "2 business days",
    onPlatformSince: "2025",
  },
];

export const categories = [
  "All categories",
  "Food & Beverage",
  "Packaging",
  "Industrial Supply",
  "Furniture & Fit-out",
  "Facilities",
  "Professional Services",
] as const;

export const listings: Listing[] = [
  {
    id: "lst_1001",
    kind: "product",
    title: "Cold-pressed sunflower oil — 15 L tin",
    summary:
      "Bulk edible oil for kitchens and food manufacturers. FSSAI certified, batch traceable.",
    category: "Food & Beverage",
    supplierId: "org_meridian",
    price: 2180,
    unit: "per 15 L tin",
    moq: 20,
    leadTime: "3–5 days",
    tags: ["FSSAI", "Batch traceable", "Bulk"],
    specs: [
      { label: "Pack size", value: "15 L tin" },
      { label: "Shelf life", value: "9 months" },
      { label: "Certification", value: "FSSAI, ISO 22000" },
      { label: "Origin", value: "Maharashtra" },
    ],
  },
  {
    id: "lst_1002",
    kind: "product",
    title: "Basmati rice — 25 kg sack, aged 12 months",
    summary:
      "Long-grain aged basmati for restaurant groups and catering. Consistent grain length.",
    category: "Food & Beverage",
    supplierId: "org_meridian",
    price: 3450,
    unit: "per 25 kg sack",
    moq: 40,
    leadTime: "2–4 days",
    tags: ["Aged 12m", "Restaurant grade"],
    specs: [
      { label: "Grain length", value: "8.2 mm avg" },
      { label: "Ageing", value: "12 months" },
      { label: "Moisture", value: "< 13%" },
      { label: "Pack", value: "25 kg jute sack" },
    ],
  },
  {
    id: "lst_1003",
    kind: "product",
    title: "Corrugated shipping carton — 400×300×300 mm",
    summary:
      "5-ply double-wall cartons for e-commerce and distribution. Custom printing available.",
    category: "Packaging",
    supplierId: "org_ardent",
    price: 62,
    unit: "per carton",
    moq: 500,
    leadTime: "5–7 days",
    tags: ["5-ply", "Custom print", "Recyclable"],
    specs: [
      { label: "Dimensions", value: "400 × 300 × 300 mm" },
      { label: "Ply", value: "5-ply double wall" },
      { label: "Bursting strength", value: "18 kg/cm²" },
      { label: "Print", value: "Up to 3 colours" },
    ],
  },
  {
    id: "lst_1004",
    kind: "product",
    title: "Stretch wrap film — 500 mm × 250 m",
    summary:
      "Machine-grade pallet wrap. Consistent cling and puncture resistance for warehouse use.",
    category: "Packaging",
    supplierId: "org_ardent",
    price: 890,
    unit: "per roll",
    moq: 60,
    leadTime: "3 days",
    tags: ["Machine grade", "23 micron"],
    specs: [
      { label: "Width", value: "500 mm" },
      { label: "Length", value: "250 m" },
      { label: "Thickness", value: "23 micron" },
      { label: "Core", value: "76 mm" },
    ],
  },
  {
    id: "lst_1005",
    kind: "product",
    title: "Thermal receipt roll — 80 mm × 60 m",
    summary:
      "BPA-free thermal paper for POS terminals. Bulk cartons for multi-outlet operators.",
    category: "Industrial Supply",
    supplierId: "org_kestrel",
    price: 34,
    unit: "per roll",
    moq: 200,
    leadTime: "2 days",
    tags: ["BPA-free", "POS"],
    specs: [
      { label: "Width", value: "80 mm" },
      { label: "Length", value: "60 m" },
      { label: "GSM", value: "55 gsm" },
      { label: "Carton", value: "100 rolls" },
    ],
  },
  {
    id: "lst_1006",
    kind: "product",
    title: "Barcode label roll — 50 × 25 mm, thermal transfer",
    summary:
      "Direct thermal labels for inventory and shipping. Compatible with standard 4-inch printers.",
    category: "Industrial Supply",
    supplierId: "org_kestrel",
    price: 410,
    unit: "per roll of 2,000",
    moq: 100,
    leadTime: "2–3 days",
    tags: ["Thermal transfer", "Inventory"],
    specs: [
      { label: "Label size", value: "50 × 25 mm" },
      { label: "Labels per roll", value: "2,000" },
      { label: "Adhesive", value: "Permanent acrylic" },
      { label: "Core", value: "25 mm" },
    ],
  },
  {
    id: "lst_1007",
    kind: "product",
    title: "Hotel guest room desk — solid sheesham, 1200 mm",
    summary:
      "Contract-grade writing desk for hospitality fit-outs. Finished to commercial durability spec.",
    category: "Furniture & Fit-out",
    supplierId: "org_northwind",
    price: 14800,
    unit: "per unit",
    moq: 25,
    leadTime: "4–6 weeks",
    tags: ["Contract grade", "Solid wood"],
    specs: [
      { label: "Dimensions", value: "1200 × 550 × 750 mm" },
      { label: "Material", value: "Solid sheesham" },
      { label: "Finish", value: "PU matte, scratch resistant" },
      { label: "Warranty", value: "5 years structural" },
    ],
  },
  {
    id: "lst_1008",
    kind: "product",
    title: "Stackable banquet chair — powder-coated steel",
    summary:
      "High-density stacking chair for conference and banquet halls. Stacks 12 high.",
    category: "Furniture & Fit-out",
    supplierId: "org_northwind",
    price: 3250,
    unit: "per chair",
    moq: 100,
    leadTime: "3–5 weeks",
    tags: ["Stackable", "Banquet"],
    specs: [
      { label: "Frame", value: "25 mm powder-coated steel" },
      { label: "Load rating", value: "150 kg" },
      { label: "Stack height", value: "12 chairs" },
      { label: "Upholstery", value: "Fire-retardant fabric" },
    ],
  },
  {
    id: "lst_2001",
    kind: "service",
    title: "Commercial deep cleaning — per site, per visit",
    summary:
      "Scheduled deep cleaning for offices, clinics and hospitality sites. Trained, background-checked crews.",
    category: "Facilities",
    supplierId: "org_lumen",
    price: 18500,
    unit: "per site visit",
    moq: 1,
    leadTime: "Book 5 days ahead",
    tags: ["Recurring", "Background-checked"],
    specs: [
      { label: "Crew size", value: "4–8 depending on area" },
      { label: "Coverage", value: "Up to 10,000 sq ft" },
      { label: "Scheduling", value: "Weekly, monthly or ad hoc" },
      { label: "Insurance", value: "Public liability covered" },
    ],
  },
  {
    id: "lst_2002",
    kind: "service",
    title: "HVAC preventive maintenance contract — annual",
    summary:
      "Quarterly servicing for commercial HVAC with guaranteed response on breakdowns.",
    category: "Facilities",
    supplierId: "org_lumen",
    price: 96000,
    unit: "per year, per site",
    moq: 1,
    leadTime: "Start within 2 weeks",
    tags: ["AMC", "4-hour response"],
    specs: [
      { label: "Visits", value: "4 scheduled per year" },
      { label: "Breakdown response", value: "4 business hours" },
      { label: "Parts", value: "Quoted separately" },
      { label: "Reporting", value: "Post-visit condition report" },
    ],
  },
  {
    id: "lst_2003",
    kind: "service",
    title: "GST compliance & filing retainer",
    summary:
      "Monthly GST return preparation, reconciliation and filing for multi-state operations.",
    category: "Professional Services",
    supplierId: "org_veritas",
    price: 42000,
    unit: "per month",
    moq: 1,
    leadTime: "Onboard in 1 week",
    tags: ["Retainer", "Multi-state"],
    specs: [
      { label: "Returns", value: "GSTR-1, GSTR-3B, annual" },
      { label: "States", value: "Up to 5 registrations" },
      { label: "Reconciliation", value: "Monthly 2A/2B matching" },
      { label: "Support", value: "Named account manager" },
    ],
  },
  {
    id: "lst_2004",
    kind: "service",
    title: "Supplier audit & due diligence — per counterparty",
    summary:
      "On-site verification and financial due diligence before you commit to a new supplier.",
    category: "Professional Services",
    supplierId: "org_veritas",
    price: 65000,
    unit: "per audit",
    moq: 1,
    leadTime: "2–3 weeks",
    tags: ["On-site", "Due diligence"],
    specs: [
      { label: "Scope", value: "Financial, operational, compliance" },
      { label: "Output", value: "Written report with risk rating" },
      { label: "Site visit", value: "Included, one location" },
      { label: "Turnaround", value: "10 working days after visit" },
    ],
  },
];

export const supplierById = (id: string) =>
  suppliers.find((s) => s.id === id) ?? suppliers[0];

export const listingById = (id: string) => listings.find((l) => l.id === id);

/** Indian-format currency, which is what every price here is quoted in. */
export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
