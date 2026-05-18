import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@sharpnr/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@sharpnr/ui";
import { Badge } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { motion } from "framer-motion";
import { Route } from "@/routes/_appuser/legal_entity/$leID/details";
import {
  ShieldCheck,
  MapPin,
  ArrowLeft,
  Pencil,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Building2,
  FileText,
  Receipt,
  Users,
  Landmark,
  CreditCard,
  GitBranch,
  ExternalLink,
  ChevronRight,
  BadgeCheck,
  Calendar,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TaxComponent {
  code: string;
  rate: number;
  interState?: boolean;
}

// ─── Fade-in animation variant ────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 },
};

// ─── Dummy data ───────────────────────────────────────────────────────────────

const ENTITY = {
  legalName: "Preeti Foods Private Limited",
  displayName: "Preeti Foods Pvt Ltd",
  entityType: "PVT_LTD",
  incorporationDate: "12 April 2019",
  fyStartMonth: "April",
  isActive: true,
  isVerified: true,
  location: "Jaipur, Rajasthan, India",
  completionPercent: 82,
};

const IDENTIFIERS = [
  { type: "PAN", value: "AABCP1234F", verified: true, expiresAt: null },
  {
    type: "CIN",
    value: "U15549RJ2019PTC034891",
    verified: true,
    expiresAt: null,
  },
  {
    type: "GSTIN",
    value: "08AABCP1234F1Z5",
    verified: true,
    note: "Rajasthan · 08",
    expiresAt: null,
  },
  {
    type: "GSTIN",
    value: "27AABCP1234F1Z1",
    verified: false,
    note: "Maharashtra · 27 · Pending",
    expiresAt: null,
  },
  { type: "TAN", value: null, verified: false, missing: true },
];

const ADDRESSES = [
  {
    type: "REGISTERED",
    label: "Registered office",
    line1: "14, Malviya Nagar, Near SBI Branch",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302017",
    country: "IN",
    gstStateCode: "08",
    gstin: "08AABCP1234F1Z5",
    isPrimary: true,
  },
  {
    type: "OPERATIONAL",
    label: "Operational office",
    line1: "Plot 7B, Bandra Kurla Complex",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400051",
    country: "IN",
    gstStateCode: "27",
    gstin: "27AABCP1234F1Z1",
    isPrimary: false,
  },
];

const TAX_REGISTRATIONS = [
  {
    id: "t1",
    taxType: "GST",
    number: "08AABCP1234F1Z5",
    gstRegistrationType: "REGULAR",
    state: "Rajasthan",
    gstStateCode: "08",
    effectiveFrom: "Apr 2019",
    effectiveTo: null,
    isActive: true,
  },
  {
    id: "t2",
    taxType: "GST",
    number: "27AABCP1234F1Z1",
    gstRegistrationType: "REGULAR",
    state: "Maharashtra",
    gstStateCode: "27",
    effectiveFrom: "Jan 2023",
    effectiveTo: null,
    isActive: true,
  },
];

const TAX_CATEGORIES = [
  {
    id: "c1",
    name: "Room Rent",
    code: "ROOM_RENT",
    sacCode: "996311",
    hsnCode: null,
    rules: [
      {
        priority: 1,
        rate: 18,
        condition: "≥ ₹7,500",
        components: [
          { code: "CGST", rate: 9 },
          { code: "SGST", rate: 9 },
          { code: "IGST", rate: 18, interState: true },
        ] as TaxComponent[],
      },
      {
        priority: 2,
        rate: 12,
        condition: "< ₹7,500 (catch-all)",
        components: [
          { code: "CGST", rate: 6 },
          { code: "SGST", rate: 6 },
        ],
      },
    ],
  },
  {
    id: "c2",
    name: "Food & Beverage",
    code: "FOOD_BEV",
    sacCode: "996331",
    hsnCode: "2106",
    rules: [
      {
        priority: 99,
        rate: 5,
        condition: "Catch-all",
        components: [
          { code: "CGST", rate: 2.5 },
          { code: "SGST", rate: 2.5 },
        ],
      },
    ],
  },
];

const COMPLIANCES = [
  {
    id: "l1",
    type: "FSSAI",
    licenseNumber: "10019011000123",
    issuingAuthority: "Food Safety and Standards Authority of India",
    validFrom: "Mar 2024",
    validTo: "Mar 2026",
    daysUntilExpiry: 120,
    propertyId: null,
    module: "RESTAURANT",
    isActive: true,
  },
  {
    id: "l2",
    type: "TRADE_LICENSE",
    licenseNumber: "TL/JMC/2024/00892",
    issuingAuthority: "Jaipur Municipal Corporation",
    validFrom: "Apr 2024",
    validTo: "Mar 31, 2026",
    daysUntilExpiry: 28,
    propertyId: null,
    module: null,
    isActive: true,
  },
  {
    id: "l3",
    type: "SHOPS_EST",
    licenseNumber: "SEA/RJ/2022/45871",
    issuingAuthority: "Labour Dept, Rajasthan",
    validFrom: "Jun 2022",
    validTo: null,
    daysUntilExpiry: null,
    propertyId: null,
    module: null,
    isActive: true,
  },
];

const BANK_ACCOUNTS = [
  {
    id: "b1",
    bankName: "HDFC Bank",
    accountHolderName: "Preeti Foods Private Limited",
    accountNumber: "••••••4821",
    ifsc: "HDFC0001234",
    branch: "Malviya Nagar Branch",
    accountType: "CURRENT",
    isPrimary: true,
    isVerified: true,
    verifiedAt: "Jan 2024",
  },
];

const CONTACTS = [
  {
    id: "k1",
    type: "DIRECTOR",
    firstName: "Preeti",
    lastName: "Rathore",
    designation: "Managing Director",
    email: "preeti@preetifoodsgroup.in",
    mobile: "+91 98765 43210",
    din: "08234567",
    isPrimary: true,
  },
  {
    id: "k2",
    type: "DIRECTOR",
    firstName: "Anil",
    lastName: "Kumar",
    designation: "Director",
    email: "anil.k@preetifoodsgroup.in",
    mobile: "+91 98765 00001",
    din: "07891234",
    isPrimary: false,
  },
  {
    id: "k3",
    type: "AUTHORIZED_SIGNATORY",
    firstName: "Riya",
    lastName: "Sharma",
    designation: "CFO & Authorized GST Signatory",
    email: "riya.s@preetifoodsgroup.in",
    mobile: "+91 98765 11111",
    din: null,
    isPrimary: true,
  },
  {
    id: "k4",
    type: "ACCOUNTS",
    firstName: "Mohan",
    lastName: "Joshi",
    designation: "Head of Accounts",
    email: "accounts@preetifoodsgroup.in",
    mobile: null,
    din: null,
    isPrimary: true,
  },
];

const RELATIONSHIPS = {
  parent: null,
  children: [
    {
      id: "r1",
      name: "Preeti Food Services Pvt Ltd",
      entityType: "LLP",
      relationshipType: "SUBSIDIARY",
      ownershipPercent: 100,
      effectiveFrom: "Jan 2022",
    },
    {
      id: "r2",
      name: "Preeti Foods Mumbai Branch",
      entityType: "PVT_LTD",
      relationshipType: "BRANCH",
      ownershipPercent: null,
      effectiveFrom: "Jun 2023",
    },
  ],
};

// ─── Shared UI primitives ─────────────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
  action,
}: {
  icon: React.ElementType;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>
      {action}
    </div>
  );
}

function AddButton({ label }: { label: string }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 text-xs gap-1 text-primary"
    >
      <Plus className="h-3.5 w-3.5" />
      {label}
    </Button>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col py-2.5 border-b border-border last:border-0">
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );
}

function Avatar({
  initials,
  className = "",
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div
      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${className}`}
    >
      {initials}
    </div>
  );
}

// ─── Tab: Overview ────────────────────────────────────────────────────────────

function OverviewTab() {
  const missingFields = IDENTIFIERS.filter((id) => id.missing);

  return (
    <motion.div {...fadeUp} className="space-y-4">
      {/* Warning banner */}
      {missingFields.length > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/30 px-3 py-3">
          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
              {missingFields.length} identifier
              {missingFields.length > 1 ? "s" : ""} missing
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-0.5">
              {missingFields.map((f) => f.type).join(", ")} — required for TDS
              deductions and statutory filings.
            </p>
          </div>
        </div>
      )}

      {/* Core info grid */}
      <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-border">
          <InfoRow label="Legal name" value={ENTITY.legalName} />
          <div className="pl-4">
            <InfoRow label="Display name" value={ENTITY.displayName} />
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border px-0">
          <InfoRow label="Entity type" value="Private Limited Company" />
          <div className="pl-4">
            <InfoRow
              label="Incorporation date"
              value={ENTITY.incorporationDate}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <InfoRow
            label="Financial year start"
            value={`${ENTITY.fyStartMonth} (Month 4)`}
          />
          <div className="pl-4">
            <InfoRow
              label="Status"
              value={
                <Badge
                  variant="secondary"
                  className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-900 text-xs"
                >
                  Active
                </Badge>
              }
            />
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "GSTINs", value: "2", sub: "RJ · MH" },
          { label: "Licenses", value: "3", sub: "1 expiring" },
          { label: "Contacts", value: "4", sub: "2 directors" },
          { label: "Subsidiaries", value: "2", sub: "Sub + Branch" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card px-3 py-3"
          >
            <div className="text-xl font-semibold text-foreground tabular-nums">
              {stat.value}
            </div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-0.5">
              {stat.label}
            </div>
            <div className="text-[10px] text-muted-foreground/70 mt-0.5">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Tab: Documents & Certificates ───────────────────────────────────────────

function DocumentsTab() {
  return (
    <motion.div {...fadeUp} className="space-y-5">
      {/* Identifiers */}
      <div>
        <SectionHeader
          icon={BadgeCheck}
          title="Government identifiers"
          action={<AddButton label="Add" />}
        />
        <div className="space-y-1.5">
          {IDENTIFIERS.map((id) =>
            id.missing ? (
              <div
                key={id.type}
                className="flex items-center gap-3 rounded-lg border border-dashed border-yellow-300 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2.5"
              >
                <span className="text-[10px] font-semibold bg-muted border border-border rounded px-1.5 py-0.5 min-w-[36px] text-center text-muted-foreground">
                  {id.type}
                </span>
                <span className="flex-1 text-sm text-muted-foreground">
                  Not added
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-800"
                >
                  Add {id.type}
                </Button>
              </div>
            ) : (
              <div
                key={id.type + id.value}
                className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5"
              >
                <span className="text-[10px] font-semibold bg-background border border-border rounded px-1.5 py-0.5 min-w-[36px] text-center text-muted-foreground">
                  {id.type}
                </span>
                <span className="flex-1 text-sm font-mono text-foreground">
                  {id.value}
                  {id.note && (
                    <span className="ml-2 font-sans text-[11px] text-muted-foreground">
                      {id.note}
                    </span>
                  )}
                </span>
                {id.verified ? (
                  <span className="flex items-center gap-1 text-[11px] text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] text-yellow-600 dark:text-yellow-400">
                    <Clock className="h-3.5 w-3.5" />
                    Pending
                  </span>
                )}
              </div>
            ),
          )}
        </div>
      </div>

      <Separator />

      {/* Compliance licenses */}
      <div>
        <SectionHeader
          icon={ShieldCheck}
          title="Licenses & registrations"
          action={<AddButton label="Add license" />}
        />
        <div className="space-y-1.5">
          {COMPLIANCES.map((c) => {
            const isExpiring =
              c.daysUntilExpiry != null && c.daysUntilExpiry <= 60;
            return (
              <div
                key={c.id}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                  isExpiring
                    ? "border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20"
                    : "border-border bg-muted/30"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full flex-shrink-0 ${
                    isExpiring ? "bg-yellow-400" : "bg-green-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    {c.type.replace(/_/g, " ")}
                  </div>
                  <div className="text-[11px] font-mono text-muted-foreground">
                    {c.licenseNumber}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  {c.validTo === null ? (
                    <span className="text-[11px] text-muted-foreground">
                      Perpetual
                    </span>
                  ) : isExpiring ? (
                    <span className="text-[11px] text-yellow-600 dark:text-yellow-400 font-medium">
                      Expires in {c.daysUntilExpiry} days
                    </span>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">
                      {c.validFrom} – {c.validTo}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tab: Tax Registration ────────────────────────────────────────────────────

function TaxRegistrationTab() {
  return (
    <motion.div {...fadeUp} className="space-y-5">
      {/* Registrations */}
      <div>
        <SectionHeader
          icon={Receipt}
          title="Tax registrations"
          action={<AddButton label="Add GSTIN" />}
        />
        <div className="space-y-1.5">
          {TAX_REGISTRATIONS.map((tr) => (
            <div
              key={tr.id}
              className="rounded-lg border border-border bg-muted/30 px-3 py-2.5 flex items-center gap-3"
            >
              <div className="text-[10px] font-semibold bg-background border border-border rounded px-1.5 py-0.5 text-muted-foreground">
                {tr.taxType}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-mono text-foreground">
                  {tr.number}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {tr.state} · State code {tr.gstStateCode} ·{" "}
                  {tr.gstRegistrationType}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[11px] text-muted-foreground">
                  From {tr.effectiveFrom}
                </div>
                <Badge
                  variant="secondary"
                  className="text-[10px] mt-0.5 bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900"
                >
                  Active
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Tax categories and rules */}
      <div>
        <SectionHeader
          icon={Receipt}
          title="Tax categories & rules"
          action={<AddButton label="Add category" />}
        />
        <div className="space-y-2">
          {TAX_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              {/* Category header */}
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {cat.name}
                  </span>
                  <code className="text-[10px] bg-muted border border-border rounded px-1.5 py-0.5 text-muted-foreground font-mono">
                    {cat.code}
                  </code>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  {cat.sacCode && <span>SAC · {cat.sacCode}</span>}
                  {cat.hsnCode && <span>HSN · {cat.hsnCode}</span>}
                </div>
              </div>

              {/* Rules */}
              <div className="divide-y divide-border">
                {cat.rules.map((rule, ri) => (
                  <div key={ri} className="px-3 py-2.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-muted-foreground">
                        Priority {rule.priority} · {rule.condition} →{" "}
                        <span className="font-semibold text-foreground">
                          {rule.rate}% GST
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {/* {rule.components.map((comp) => (
                        <div
                          key={comp.code}
                          className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] border ${
                            comp.interState
                              ? "bg-muted/30 border-border text-muted-foreground opacity-60"
                              : "bg-muted/60 border-border text-foreground"
                          }`}
                        >
                          <span className="font-medium">{comp.code}</span>
                          <span className="text-muted-foreground">
                            {comp.rate}%
                          </span>
                          {comp.interState && (
                            <span className="text-[9px] text-muted-foreground">
                              (inter-state)
                            </span>
                          )}
                        </div>
                      ))} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tab: General Settings ────────────────────────────────────────────────────

function GeneralSettingsTab() {
  return (
    <motion.div {...fadeUp} className="space-y-5">
      {/* Addresses */}
      <div>
        <SectionHeader
          icon={MapPin}
          title="Addresses"
          action={<AddButton label="Add address" />}
        />
        <div className="space-y-2">
          {ADDRESSES.map((addr) => (
            <div
              key={addr.type}
              className="rounded-xl border border-border bg-card grid grid-cols-[auto_1fr_auto] gap-3 items-start px-3 py-3"
            >
              <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center mt-0.5">
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {addr.label}
                </div>
                <div className="text-sm text-foreground leading-relaxed">
                  {addr.line1}
                  <br />
                  {addr.city}, {addr.state} – {addr.pincode}, {addr.country}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-primary mt-1.5">
                  <Receipt className="h-3 w-3" />
                  GST state code: {addr.gstStateCode} · GSTIN: {addr.gstin}
                </div>
              </div>
              {addr.isPrimary && (
                <Badge
                  variant="secondary"
                  className="text-[10px] bg-primary/10 text-primary border-primary/20 flex-shrink-0"
                >
                  Primary
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Banking */}
      <div>
        <SectionHeader
          icon={CreditCard}
          title="Bank accounts"
          action={<AddButton label="Add account" />}
        />
        <div className="space-y-2">
          {BANK_ACCOUNTS.map((bank) => (
            <div
              key={bank.id}
              className="rounded-xl border border-border bg-card grid grid-cols-[auto_1fr_auto] gap-3 items-center px-3 py-3"
            >
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                <Landmark className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">
                    {bank.bankName}
                  </span>
                  {bank.isPrimary && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-primary/10 text-primary border-primary/20"
                    >
                      Primary
                    </Badge>
                  )}
                  {bank.isVerified && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900"
                    >
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground">
                  {bank.accountType} · {bank.accountNumber}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {bank.ifsc} · {bank.branch}
                </div>
              </div>
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Contacts */}
      <div>
        <SectionHeader
          icon={Users}
          title="Key personnel"
          action={<AddButton label="Add contact" />}
        />
        <div className="space-y-1.5">
          {CONTACTS.map((contact) => {
            const initials = `${contact.firstName[0]}${contact.lastName?.[0] ?? ""}`;
            return (
              <div
                key={contact.id}
                className="rounded-lg border border-border bg-muted/30 flex items-center gap-3 px-3 py-2.5"
              >
                <Avatar
                  initials={initials}
                  className="bg-primary/10 text-primary"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    {contact.firstName} {contact.lastName}
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {contact.designation}
                    {contact.din && (
                      <span className="ml-2 font-mono text-[10px]">
                        DIN: {contact.din}
                      </span>
                    )}
                  </div>
                </div>
                {contact.email && (
                  <span className="text-[11px] text-muted-foreground hidden sm:block truncate max-w-[160px]">
                    {contact.email}
                  </span>
                )}
                <Badge
                  variant="secondary"
                  className="text-[10px] flex-shrink-0"
                >
                  {contact.type.replace(/_/g, " ")}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Relationships */}
      <div>
        <SectionHeader
          icon={GitBranch}
          title="Group structure"
          action={<AddButton label="Add relationship" />}
        />
        <div className="space-y-2">
          {/* Self */}
          <div className="rounded-lg border border-primary/25 bg-primary/5 flex items-center gap-3 px-3 py-2.5">
            <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground flex items-center gap-2">
                {ENTITY.displayName}
                <Badge
                  variant="secondary"
                  className="text-[10px] bg-primary/10 text-primary border-primary/20"
                >
                  You
                </Badge>
              </div>
              <div className="text-[11px] text-muted-foreground">
                Holding company · PVT LTD
              </div>
            </div>
            <Badge
              variant="secondary"
              className="text-[10px] bg-primary/10 text-primary border-primary/20"
            >
              Holding
            </Badge>
          </div>

          {/* Children */}
          <div className="ml-5 border-l border-border pl-4 space-y-1.5">
            {RELATIONSHIPS.children.map((child) => (
              <div
                key={child.id}
                className="rounded-lg border border-border bg-muted/30 flex items-center gap-3 px-3 py-2.5"
              >
                <div className="h-7 w-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    {child.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {child.entityType}
                    {child.ownershipPercent != null &&
                      ` · ${child.ownershipPercent}% ownership`}
                    {` · From ${child.effectiveFrom}`}
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="text-[10px] flex-shrink-0"
                >
                  {child.relationshipType}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tab: Reports ─────────────────────────────────────────────────────────────

function ReportsTab() {
  const reports = [
    { id: "r1", name: "GSTR-1 Summary", period: "Feb 2026", status: "ready" },
    { id: "r2", name: "GSTR-3B Summary", period: "Feb 2026", status: "ready" },
    {
      id: "r3",
      name: "TDS Certificate (Form 16A)",
      period: "Q3 FY25-26",
      status: "pending",
    },
    {
      id: "r4",
      name: "Annual Compliance Report",
      period: "FY 2024-25",
      status: "ready",
    },
  ];

  return (
    <motion.div {...fadeUp} className="space-y-3">
      <SectionHeader
        icon={FileText}
        title="Available reports"
        action={<AddButton label="Generate" />}
      />
      {reports.map((r) => (
        <div
          key={r.id}
          className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5"
        >
          <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground">{r.name}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {r.period}
            </div>
          </div>
          {r.status === "ready" ? (
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
              <Download className="h-3.5 w-3.5" />
              Download
            </Button>
          ) : (
            <Badge
              variant="secondary"
              className="text-[10px] text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-900"
            >
              Pending
            </Badge>
          )}
        </div>
      ))}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const LegalEntityDetailsPage: React.FC = () => {
  const {} = Route.useParams();

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {/* ── Header ── */}
        <motion.div {...fadeUp}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
            <button className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" />
              Legal entities
            </button>
            <span className="text-border">/</span>
            <span className="text-foreground truncate">
              {ENTITY.displayName}
            </span>
          </div>

          {/* Title row */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {ENTITY.legalName}
                </h2>
                {ENTITY.isVerified && (
                  <div className="flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 px-2 py-0.5 text-[11px] font-medium text-green-700 dark:text-green-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Sharpnr Verified
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                {ENTITY.location}
                <span className="text-border">·</span>
                <span>Inc. {ENTITY.incorporationDate}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
            </div>
          </div>
        </motion.div>

        <Separator />

        {/* ── Tabs ── */}

        <Tabs defaultValue="overview" className="w-full">
          <TabsList variant={"line"}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  View your key metrics and recent project activity. Track
                  progress across all your active projects.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                You have 12 active projects and 3 pending tasks.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Track performance and user engagement metrics. Monitor trends
                  and identify growth opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Page views are up 25% compared to last month.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>
                  Generate and download your detailed reports. Export data in
                  multiple formats for analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                You have 5 reports ready and available to export.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and options. Customize your
                  experience to fit your needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Configure notifications, security, and themes.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LegalEntityDetailsPage;
