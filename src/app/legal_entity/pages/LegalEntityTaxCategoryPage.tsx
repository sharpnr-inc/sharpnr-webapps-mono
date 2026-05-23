import {
  ArrowLeft,
  Tag,
  Percent,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Hash,
  ArrowUpDown,
  Pencil,
} from "lucide-react";
import { Button } from "@sharpnr/ui";

// ─── Types ─────────────────────────────────────────────────────────────────────
type LegalEntityTaxType = "CGST" | "SGST" | "IGST" | "CESS" | "VAT";

interface LegalEntityTaxComponentResponseDto {
  id: string;
  name: string;
  rate: number;
}

interface LegalEntityTaxRuleResponseDto {
  id: string;
  tax_registration_id: string;
  tax_type: LegalEntityTaxType;
  rate: number;
  condition_json: Record<string, any> | null;
  min_value: number | null;
  max_value: number | null;
  priority: number;
  effective_from: string;
  effective_to: string | null;
  is_active: boolean;
  components: LegalEntityTaxComponentResponseDto[];
}

interface TaxCategoryAccountMappingResponseDto {
  id: string;
  accounting_book_id: string;
  receivable_account_id: string;
  income_account_id: string;
  is_active: boolean;
}

interface LegalEntityTaxCategoryResponseDto {
  id: string;
  name: string;
  code: string;
  description?: string;
  sac_code: string | null;
  hsn_code: string | null;
  is_active: boolean;
  rules: LegalEntityTaxRuleResponseDto[];
  account_mappings: TaxCategoryAccountMappingResponseDto[];
}

// ─── Dummy Data ────────────────────────────────────────────────────────────────
const DUMMY_CATEGORY: LegalEntityTaxCategoryResponseDto = {
  id: "tcat_01",
  name: "Room Rent",
  code: "ROOM_RENT",
  description:
    "Applies to all accommodation charges including standard rooms, suites, and extended-stay bookings. GST slabs are applied based on the declared tariff per night.",
  sac_code: "996311",
  hsn_code: null,
  is_active: true,
  rules: [
    {
      id: "rule_01",
      tax_registration_id: "txreg_01",
      tax_type: "CGST",
      rate: 6,
      condition_json: { tariff_per_night: { lte: 7500 } },
      min_value: null,
      max_value: 7500,
      priority: 1,
      effective_from: "2024-01-01",
      effective_to: null,
      is_active: true,
      components: [{ id: "comp_01", name: "Base CGST", rate: 6 }],
    },
    {
      id: "rule_02",
      tax_registration_id: "txreg_01",
      tax_type: "SGST",
      rate: 6,
      condition_json: { tariff_per_night: { lte: 7500 } },
      min_value: null,
      max_value: 7500,
      priority: 2,
      effective_from: "2024-01-01",
      effective_to: null,
      is_active: true,
      components: [{ id: "comp_02", name: "Base SGST", rate: 6 }],
    },
    {
      id: "rule_03",
      tax_registration_id: "txreg_01",
      tax_type: "CGST",
      rate: 9,
      condition_json: { tariff_per_night: { gt: 7500 } },
      min_value: 7500,
      max_value: null,
      priority: 3,
      effective_from: "2024-01-01",
      effective_to: null,
      is_active: true,
      components: [{ id: "comp_03", name: "Premium CGST", rate: 9 }],
    },
    {
      id: "rule_04",
      tax_registration_id: "txreg_01",
      tax_type: "SGST",
      rate: 9,
      condition_json: { tariff_per_night: { gt: 7500 } },
      min_value: 7500,
      max_value: null,
      priority: 4,
      effective_from: "2024-01-01",
      effective_to: null,
      is_active: true,
      components: [{ id: "comp_04", name: "Premium SGST", rate: 9 }],
    },
    {
      id: "rule_05",
      tax_registration_id: "txreg_01",
      tax_type: "IGST",
      rate: 12,
      condition_json: null,
      min_value: null,
      max_value: null,
      priority: 5,
      effective_from: "2022-04-01",
      effective_to: "2023-12-31",
      is_active: false,
      components: [],
    },
  ],
  account_mappings: [
    {
      id: "map_01",
      accounting_book_id: "BOOK-IND-001",
      receivable_account_id: "ACC-RECV-1100",
      income_account_id: "ACC-INC-4010",
      is_active: true,
    },
    {
      id: "map_02",
      accounting_book_id: "BOOK-IND-002",
      receivable_account_id: "ACC-RECV-1105",
      income_account_id: "ACC-INC-4011",
      is_active: false,
    },
  ],
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
const TAX_TYPE_COLORS: Record<LegalEntityTaxType, string> = {
  CGST: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800",
  SGST: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800",
  IGST: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
  CESS: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800",
  VAT: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(val: number | null) {
  if (val === null) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

function conditionLabel(rule: LegalEntityTaxRuleResponseDto) {
  if (rule.max_value !== null && rule.min_value === null)
    return `Tariff ≤ ${formatAmount(rule.max_value)}`;
  if (rule.min_value !== null && rule.max_value === null)
    return `Tariff > ${formatAmount(rule.min_value)}`;
  if (rule.min_value !== null && rule.max_value !== null)
    return `${formatAmount(rule.min_value)} – ${formatAmount(rule.max_value)}`;
  return "All transactions";
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
  count,
  action,
}: {
  icon: React.ElementType;
  title: string;
  count?: number;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-sm font-medium">{title}</span>
        {count !== undefined && (
          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">
            {count}
          </span>
        )}
      </div>
      {action}
    </div>
  );
}

function TaxRuleRow({ rule }: { rule: LegalEntityTaxRuleResponseDto }) {
  return (
    <div
      className={`rounded-lg border p-3.5 space-y-3 transition-opacity ${
        rule.is_active ? "bg-background" : "opacity-60 bg-muted/20"
      }`}
    >
      {/* Rule header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded border ${
              TAX_TYPE_COLORS[rule.tax_type]
            }`}
          >
            {rule.tax_type}
          </span>
          <span className="text-sm font-semibold tabular-nums">
            {rule.rate}%
          </span>
          <span className="text-xs text-muted-foreground">
            {conditionLabel(rule)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {rule.is_active ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-muted-foreground" />
          )}
          <span className="text-xs text-muted-foreground">
            {rule.is_active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <ArrowUpDown className="w-3 h-3" />
          Priority {rule.priority}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formatDate(rule.effective_from)}
          {" → "}
          {rule.effective_to ? formatDate(rule.effective_to) : "Ongoing"}
        </span>
        <span className="flex items-center gap-1 font-mono">
          <Hash className="w-3 h-3" />
          {rule.tax_registration_id}
        </span>
      </div>

      {/* Components */}
      {rule.components.length > 0 && (
        <div className="border-t pt-2.5 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Components:</span>
          {rule.components.map((c) => (
            <span
              key={c.id}
              className="text-xs bg-muted px-2 py-0.5 rounded font-mono"
            >
              {c.name} · {c.rate}%
            </span>
          ))}
        </div>
      )}

      {/* Condition JSON */}
      {rule.condition_json && (
        <div className="border-t pt-2.5">
          <p className="text-xs text-muted-foreground mb-1">Condition</p>
          <pre className="text-xs font-mono bg-muted/50 rounded p-2 overflow-x-auto text-foreground">
            {JSON.stringify(rule.condition_json, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

function AccountMappingRow({
  mapping,
}: {
  mapping: TaxCategoryAccountMappingResponseDto;
}) {
  return (
    <div
      className={`rounded-lg border p-3.5 space-y-2.5 ${
        mapping.is_active ? "bg-background" : "opacity-60 bg-muted/20"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-mono text-muted-foreground">
          {mapping.accounting_book_id}
        </span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
            mapping.is_active
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
              : "border-border bg-muted/40 text-muted-foreground"
          }`}
        >
          {mapping.is_active ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
        <div>
          <p className="text-muted-foreground mb-0.5">Receivable account</p>
          <p className="font-mono text-foreground">
            {mapping.receivable_account_id}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground mb-0.5">Income account</p>
          <p className="font-mono text-foreground">
            {mapping.income_account_id}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export function LegalEntityTaxCategoryPage() {
  const category = DUMMY_CATEGORY;

  const activeRules = category.rules.filter((r) => r.is_active);
  const inactiveRules = category.rules.filter((r) => !r.is_active);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* ── Back nav ── */}
      <button
        onClick={() => console.log("Back to tax categories")}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Tax Categories
      </button>

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl border bg-muted/40 flex items-center justify-center shrink-0 mt-0.5">
            <Tag className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg font-semibold tracking-tight">
                {category.name}
              </h1>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${
                  category.is_active
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                    : "border-border bg-muted/40 text-muted-foreground"
                }`}
              >
                {category.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="text-xs font-mono text-muted-foreground mt-0.5">
              {category.code}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="gap-2 shrink-0"
          onClick={() => console.log("Edit category", category.id)}
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </Button>
      </div>

      {/* ── Overview card ── */}
      <div className="rounded-xl border bg-background p-4 space-y-4">
        {category.description && (
          <p className="text-sm text-muted-foreground leading-6">
            {category.description}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">SAC code</p>
            <p className="text-sm font-mono">
              {category.sac_code ?? (
                <span className="text-muted-foreground">—</span>
              )}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">HSN code</p>
            <p className="text-sm font-mono">
              {category.hsn_code ?? (
                <span className="text-muted-foreground">—</span>
              )}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Tax rules</p>
            <p className="text-sm font-medium flex items-center gap-1.5">
              <Percent className="w-3 h-3 text-muted-foreground" />
              {category.rules.length}
              <span className="text-xs text-muted-foreground font-normal">
                ({activeRules.length} active)
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Account mappings
            </p>
            <p className="text-sm font-medium flex items-center gap-1.5">
              <BookOpen className="w-3 h-3 text-muted-foreground" />
              {category.account_mappings.length}
            </p>
          </div>
        </div>
      </div>

      {/* ── Tax Rules ── */}
      <div>
        <SectionHeader
          icon={Percent}
          title="Tax rules"
          count={category.rules.length}
          action={
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 h-7 text-xs"
              onClick={() => console.log("Add rule")}
            >
              Add rule
            </Button>
          }
        />

        <div className="space-y-2.5">
          {activeRules.map((rule) => (
            <TaxRuleRow key={rule.id} rule={rule} />
          ))}
          {inactiveRules.length > 0 && (
            <>
              <p className="text-xs text-muted-foreground pt-1 pb-0.5">
                Inactive rules
              </p>
              {inactiveRules.map((rule) => (
                <TaxRuleRow key={rule.id} rule={rule} />
              ))}
            </>
          )}
        </div>
      </div>

      {/* ── Account Mappings ── */}
      <div>
        <SectionHeader
          icon={BookOpen}
          title="Account mappings"
          count={category.account_mappings.length}
          action={
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 h-7 text-xs"
              onClick={() => console.log("Add mapping")}
            >
              Add mapping
            </Button>
          }
        />

        <div className="space-y-2.5">
          {category.account_mappings.map((mapping) => (
            <AccountMappingRow key={mapping.id} mapping={mapping} />
          ))}
        </div>
      </div>
    </div>
  );
}
