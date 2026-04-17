import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarRange,
  Percent,
  FileDigit,
  Landmark,
  BookOpen,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Info,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  IndianRupee,
  Receipt,
  ShoppingCart,
  CreditCard,
  Wallet,
  Building2,
  Hash,
  ArrowUpDown,
  Globe,
  BadgePercent,
  FileText,
  RotateCcw,
} from "lucide-react";

// ── Animation Variants ───────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const cardVariant = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
};

// ── Shared UI helpers ────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div variants={cardVariant} className="flex items-start gap-3 mb-6">
      <div className="mt-0.5 rounded-lg bg-muted p-2 text-muted-foreground">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

function FieldRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={cardVariant} className="grid gap-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </motion.div>
  );
}

function InfoBanner({ text }: { text: string }) {
  return (
    <motion.div
      variants={cardVariant}
      className="flex items-start gap-2.5 rounded-lg border border-sky-200 bg-sky-50 p-3 dark:border-sky-900 dark:bg-sky-950/40"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
      <p className="text-xs leading-relaxed text-sky-700 dark:text-sky-300">
        {text}
      </p>
    </motion.div>
  );
}

function SaveBar({
  onSave,
  onReset,
}: {
  onSave: () => void;
  onReset: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const handle = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };
  return (
    <motion.div
      variants={cardVariant}
      className="flex items-center justify-between rounded-xl border bg-muted/40 px-4 py-3 mt-2"
    >
      <p className="text-xs text-muted-foreground">
        Changes apply to the current financial period.
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="gap-1.5 text-muted-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </Button>
        <Button size="sm" onClick={handle} className="gap-1.5">
          {saved ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" /> Saved!
            </>
          ) : (
            <>
              <Save className="h-3.5 w-3.5" /> Save Changes
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

// ── Tab: Fiscal Year ─────────────────────────────────────────────────────────

function FiscalYearTab() {
  const [fyStart, setFyStart] = useState("april");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [autoClose, setAutoClose] = useState(true);
  const [reminder, setReminder] = useState(true);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-5"
    >
      <SectionHeader
        icon={<CalendarRange className="h-4 w-4" />}
        title="Fiscal Year Configuration"
        description="Define your financial year start, timezone, and year-end behaviour."
      />

      <motion.div variants={cardVariant}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              Year Boundaries
            </CardTitle>
            <CardDescription className="text-xs">
              Set when your financial year begins and ends.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FieldRow
                label="Fiscal Year Starts"
                hint="Your year will end 12 months later."
              >
                <Select value={fyStart} onValueChange={setFyStart}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m} value={m.toLowerCase()}>
                        {m} 1
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldRow>
              <FieldRow label="Fiscal Year Label">
                <Input
                  readOnly
                  value={`FY ${fyStart === "april" ? "2025–26" : "2025"}`}
                  className="bg-muted text-sm cursor-not-allowed"
                />
              </FieldRow>
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <FieldRow label="Reporting Timezone">
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kolkata">
                      IST — Asia/Kolkata (UTC+5:30)
                    </SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">
                      EST — America/New York
                    </SelectItem>
                    <SelectItem value="Europe/London">
                      GMT — Europe/London
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>
              <FieldRow label="Currency">
                <Select defaultValue="INR">
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">🇮🇳 INR — Indian Rupee</SelectItem>
                    <SelectItem value="USD">🇺🇸 USD — US Dollar</SelectItem>
                    <SelectItem value="EUR">🇪🇺 EUR — Euro</SelectItem>
                    <SelectItem value="GBP">🇬🇧 GBP — British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariant}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              Year-End Automation
            </CardTitle>
            <CardDescription className="text-xs">
              Control automatic period close and reminder notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                id: "autoclose",
                label: "Auto-close periods",
                sub: "Automatically lock completed months after reconciliation.",
                state: autoClose,
                set: setAutoClose,
              },
              {
                id: "reminder",
                label: "Year-end reminders",
                sub: "Send email reminders 30 days before fiscal year close.",
                state: reminder,
                set: setReminder,
              },
            ].map(({ id, label, sub, state, set }) => (
              <div
                key={id}
                className="flex items-center justify-between gap-4 rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
                <Switch checked={state} onCheckedChange={set} />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <InfoBanner text="Changing the fiscal year start affects all historical reports. A journal entry will be created automatically to carry forward retained earnings." />
      <SaveBar
        onSave={() => {}}
        onReset={() => {
          setFyStart("april");
          setAutoClose(true);
          setReminder(true);
        }}
      />
    </motion.div>
  );
}

// ── Tab: Taxes / GST Config ──────────────────────────────────────────────────

interface GSTRate {
  id: number;
  name: string;
  rate: string;
  type: string;
}

function TaxGSTTab() {
  const [gstEnabled, setGstEnabled] = useState(true);
  const [compositeScheme, setCompositeScheme] = useState(false);
  const [gstin, setGstin] = useState("27AABCU9603R1ZX");
  const [rates, setRates] = useState<GSTRate[]>([
    { id: 1, name: "GST 5%", rate: "5", type: "IGST" },
    { id: 2, name: "GST 12%", rate: "12", type: "IGST" },
    { id: 3, name: "GST 18%", rate: "18", type: "IGST" },
    { id: 4, name: "GST 28%", rate: "28", type: "IGST" },
  ]);
  const addRate = () =>
    setRates((r) => [
      ...r,
      { id: Date.now(), name: "Custom GST", rate: "0", type: "IGST" },
    ]);
  const removeRate = (id: number) =>
    setRates((r) => r.filter((x) => x.id !== id));

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-5"
    >
      <SectionHeader
        icon={<Percent className="h-4 w-4" />}
        title="Tax & GST Configuration"
        description="Manage GST registration, tax slabs, and filing preferences."
      />

      <motion.div variants={cardVariant}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">
                  GST Registration
                </CardTitle>
                <CardDescription className="text-xs">
                  Your business GST identity and filing type.
                </CardDescription>
              </div>
              <Switch checked={gstEnabled} onCheckedChange={setGstEnabled} />
            </div>
          </CardHeader>
          {gstEnabled && (
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldRow
                  label="GSTIN"
                  hint="15-character GST Identification Number."
                >
                  <Input
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="font-mono text-sm tracking-wider"
                    maxLength={15}
                  />
                </FieldRow>
                <FieldRow label="GST Filing Frequency">
                  <Select defaultValue="monthly">
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">
                        Monthly (GSTR-1 + 3B)
                      </SelectItem>
                      <SelectItem value="quarterly">
                        Quarterly (QRMP)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FieldRow>
                <FieldRow label="Business Type">
                  <Select defaultValue="regular">
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular Taxpayer</SelectItem>
                      <SelectItem value="sez">SEZ Unit</SelectItem>
                      <SelectItem value="eou">EOU / STP</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldRow>
                <FieldRow label="State of Registration">
                  <Select defaultValue="MH">
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MH">Maharashtra (27)</SelectItem>
                      <SelectItem value="KA">Karnataka (29)</SelectItem>
                      <SelectItem value="DL">Delhi (07)</SelectItem>
                      <SelectItem value="TN">Tamil Nadu (33)</SelectItem>
                      <SelectItem value="UP">Uttar Pradesh (09)</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldRow>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Composite Scheme
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Opt for simplified composite levy (turnover &lt; ₹1.5 Cr).
                  </p>
                </div>
                <Switch
                  checked={compositeScheme}
                  onCheckedChange={setCompositeScheme}
                />
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      <motion.div variants={cardVariant}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">
                  Tax Slabs
                </CardTitle>
                <CardDescription className="text-xs">
                  Define applicable GST rates for your products and services.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addRate}
                className="gap-1.5 text-xs"
              >
                <Plus className="h-3.5 w-3.5" /> Add Rate
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-[1fr_80px_100px_36px] gap-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Name</span>
              <span>Rate %</span>
              <span>Type</span>
              <span />
            </div>
            <AnimatePresence initial={false}>
              {rates.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-[1fr_80px_100px_36px] items-center gap-2"
                >
                  <Input
                    value={r.name}
                    onChange={(e) =>
                      setRates((rs) =>
                        rs.map((x) =>
                          x.id === r.id ? { ...x, name: e.target.value } : x,
                        ),
                      )
                    }
                    className="text-sm h-9"
                  />
                  <Input
                    value={r.rate}
                    onChange={(e) =>
                      setRates((rs) =>
                        rs.map((x) =>
                          x.id === r.id ? { ...x, rate: e.target.value } : x,
                        ),
                      )
                    }
                    className="text-sm h-9"
                    type="number"
                  />
                  <Select
                    value={r.type}
                    onValueChange={(v) =>
                      setRates((rs) =>
                        rs.map((x) => (x.id === r.id ? { ...x, type: v } : x)),
                      )
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IGST">IGST</SelectItem>
                      <SelectItem value="CGST+SGST">CGST+SGST</SelectItem>
                      <SelectItem value="UTGST">UTGST</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-destructive"
                    onClick={() => removeRate(r.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <InfoBanner text="IGST applies to inter-state transactions. CGST + SGST applies to intra-state transactions. Make sure tax type matches the supply type on each invoice." />
      <SaveBar onSave={() => {}} onReset={() => {}} />
    </motion.div>
  );
}

// ── Tab: Document Numbering ──────────────────────────────────────────────────

interface DocSeries {
  id: string;
  label: string;
  icon: React.ReactNode;
  prefix: string;
  next: number;
  padding: number;
  suffix: string;
}

function DocumentNumberingTab() {
  const [series, setSeries] = useState<DocSeries[]>([
    {
      id: "inv",
      label: "Sales Invoice",
      icon: <Receipt className="h-4 w-4" />,
      prefix: "INV-",
      next: 1042,
      padding: 4,
      suffix: "",
    },
    {
      id: "po",
      label: "Purchase Order",
      icon: <ShoppingCart className="h-4 w-4" />,
      prefix: "PO-",
      next: 318,
      padding: 4,
      suffix: "",
    },
    {
      id: "exp",
      label: "Expense Voucher",
      icon: <Wallet className="h-4 w-4" />,
      prefix: "EXP-",
      next: 4401,
      padding: 4,
      suffix: "",
    },
    {
      id: "cr",
      label: "Credit Note",
      icon: <CreditCard className="h-4 w-4" />,
      prefix: "CR-",
      next: 89,
      padding: 4,
      suffix: "",
    },
    {
      id: "jv",
      label: "Journal Entry",
      icon: <ArrowUpDown className="h-4 w-4" />,
      prefix: "JV-",
      next: 207,
      padding: 4,
      suffix: "",
    },
  ]);
  const preview = (s: DocSeries) =>
    `${s.prefix}${String(s.next).padStart(s.padding, "0")}${s.suffix}`;
  const update = (id: string, field: keyof DocSeries, value: string | number) =>
    setSeries((ss) =>
      ss.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-5"
    >
      <SectionHeader
        icon={<FileDigit className="h-4 w-4" />}
        title="Document Numbering Series"
        description="Configure auto-increment prefixes and sequences for all document types."
      />

      <motion.div variants={cardVariant}>
        <InfoBanner text="Document numbers are globally unique and cannot be reused. Changes to the sequence affect only future documents." />
      </motion.div>

      <motion.div variants={cardVariant} className="space-y-3">
        {series.map((s) => (
          <Card key={s.id}>
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-muted p-1.5 text-muted-foreground">
                  {s.icon}
                </div>
                <CardTitle className="text-sm font-semibold">
                  {s.label}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="ml-auto font-mono text-xs"
                >
                  {preview(s)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <FieldRow label="Prefix">
                  <Input
                    value={s.prefix}
                    onChange={(e) => update(s.id, "prefix", e.target.value)}
                    className="font-mono text-sm h-9"
                  />
                </FieldRow>
                <FieldRow label="Next Number">
                  <Input
                    type="number"
                    value={s.next}
                    onChange={(e) =>
                      update(s.id, "next", Number(e.target.value))
                    }
                    className="text-sm h-9"
                    min={1}
                  />
                </FieldRow>
                <FieldRow label="Zero Padding">
                  <Select
                    value={String(s.padding)}
                    onValueChange={(v) => update(s.id, "padding", Number(v))}
                  >
                    <SelectTrigger className="text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[2, 3, 4, 5, 6].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} digits
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldRow>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <SaveBar onSave={() => {}} onReset={() => {}} />
    </motion.div>
  );
}

// ── Tab: Default Accounts ────────────────────────────────────────────────────

function DefaultAccountsTab() {
  const accountGroups = [
    {
      group: "Revenue & Expenses",
      icon: <IndianRupee className="h-4 w-4" />,
      fields: [
        { label: "Default Revenue Account", default: "4000 – Sales Revenue" },
        { label: "Cost of Goods Sold (COGS)", default: "5000 – COGS" },
        {
          label: "Default Expense Account",
          default: "6100 – Operating Expenses",
        },
        { label: "Other Income Account", default: "4500 – Other Income" },
      ],
    },
    {
      group: "Tax & Duties",
      icon: <BadgePercent className="h-4 w-4" />,
      fields: [
        { label: "Output GST Payable", default: "2200 – Output GST" },
        { label: "Input GST Receivable", default: "1300 – Input GST Credit" },
        { label: "TDS Payable", default: "2210 – TDS Payable" },
      ],
    },
    {
      group: "Balance Sheet",
      icon: <Building2 className="h-4 w-4" />,
      fields: [
        {
          label: "Accounts Receivable (AR)",
          default: "1100 – Trade Receivables",
        },
        { label: "Accounts Payable (AP)", default: "2100 – Trade Payables" },
        { label: "Bank / Cash Account", default: "1010 – HDFC Current A/C" },
        { label: "Retained Earnings", default: "3300 – Retained Earnings" },
      ],
    },
    {
      group: "Write-offs & Adjustments",
      icon: <FileText className="h-4 w-4" />,
      fields: [
        { label: "Bad Debt Write-off", default: "6900 – Bad Debt Expense" },
        { label: "Bank Charges Account", default: "6800 – Bank Charges" },
        {
          label: "Rounding Difference Account",
          default: "6999 – Rounding Adjustments",
        },
      ],
    },
  ];

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-5"
    >
      <SectionHeader
        icon={<Landmark className="h-4 w-4" />}
        title="Default Chart of Accounts"
        description="Map system events to the correct ledger accounts in your chart of accounts."
      />

      {accountGroups.map(({ group, icon, fields }) => (
        <motion.div key={group} variants={cardVariant}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-muted p-1.5 text-muted-foreground">
                  {icon}
                </div>
                <CardTitle className="text-sm font-semibold">{group}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                {fields.map(({ label, default: def }) => (
                  <FieldRow key={label} label={label}>
                    <Select defaultValue={def}>
                      <SelectTrigger className="text-sm h-9 font-mono">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={def}>{def}</SelectItem>
                        <SelectItem value="custom">
                          + Add custom account…
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldRow>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <SaveBar onSave={() => {}} onReset={() => {}} />
    </motion.div>
  );
}

// ── Tab: Accounting Books ────────────────────────────────────────────────────

interface Book {
  id: number;
  name: string;
  currency: string;
  basis: string;
  active: boolean;
}

function AccountingBooksTab() {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      name: "Primary Books (IN)",
      currency: "INR",
      basis: "Accrual",
      active: true,
    },
    {
      id: 2,
      name: "Management Accounts",
      currency: "USD",
      basis: "Accrual",
      active: true,
    },
    { id: 3, name: "Tax Books", currency: "INR", basis: "Cash", active: false },
  ]);
  const toggle = (id: number) =>
    setBooks((bs) =>
      bs.map((b) => (b.id === id ? { ...b, active: !b.active } : b)),
    );

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-5"
    >
      <SectionHeader
        icon={<BookOpen className="h-4 w-4" />}
        title="Accounting Books"
        description="Manage parallel accounting books for multi-GAAP or multi-currency reporting."
      />

      <motion.div variants={cardVariant}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">
                  Active Books
                </CardTitle>
                <CardDescription className="text-xs">
                  Each book maintains a separate set of ledgers and reports.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Plus className="h-3.5 w-3.5" /> New Book
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-[1fr_80px_100px_64px_36px] gap-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Book Name</span>
              <span>Currency</span>
              <span>Basis</span>
              <span className="text-center">Active</span>
              <span />
            </div>
            <AnimatePresence>
              {books.map((b) => (
                <motion.div
                  key={b.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-[1fr_80px_100px_64px_36px] items-center gap-2"
                >
                  <Input defaultValue={b.name} className="text-sm h-9" />
                  <Select defaultValue={b.currency}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue={b.basis}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Accrual">Accrual</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex justify-center">
                    <Switch
                      checked={b.active}
                      onCheckedChange={() => toggle(b.id)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariant}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              Inter-Book Settings
            </CardTitle>
            <CardDescription className="text-xs">
              Control how transactions flow between books.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                label: "Auto-post to all active books",
                sub: "Every transaction is mirrored across all enabled books.",
              },
              {
                label: "Enable currency revaluation",
                sub: "Automatically revalue foreign-currency balances at period end.",
              },
              {
                label: "Consolidation eliminations",
                sub: "Remove intercompany transactions during roll-up reports.",
              },
            ].map(({ label, sub }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
                <Switch />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <InfoBanner text="At least one book must remain active at all times. Deactivating a book hides it from reports but retains all historical data." />
      <SaveBar onSave={() => {}} onReset={() => {}} />
    </motion.div>
  );
}

// ── Tab meta ─────────────────────────────────────────────────────────────────

const TABS = [
  {
    value: "fiscal",
    label: "Fiscal Year",
    icon: <CalendarRange className="h-4 w-4" />,
    content: <FiscalYearTab />,
  },
  {
    value: "tax",
    label: "Taxes / GST",
    icon: <Percent className="h-4 w-4" />,
    content: <TaxGSTTab />,
  },
  {
    value: "docs",
    label: "Doc Numbering",
    icon: <FileDigit className="h-4 w-4" />,
    content: <DocumentNumberingTab />,
  },
  {
    value: "defaults",
    label: "Default Accounts",
    icon: <Landmark className="h-4 w-4" />,
    content: <DefaultAccountsTab />,
  },
  {
    value: "books",
    label: "Accounting Books",
    icon: <BookOpen className="h-4 w-4" />,
    content: <AccountingBooksTab />,
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AccountingSettingsPage() {
  const [active, setActive] = useState("fiscal");

  return (
    <div className=" p-4 lg:p-8">
      <div className="mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span>Settings</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Accounting</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Accounting Settings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure fiscal rules, taxes, document series, and ledger defaults.
          </p>
        </motion.div>

        <Tabs value={active} onValueChange={setActive} className="w-full">
          {/* Tab List */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
          >
            <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/60 p-1 mb-6 rounded-xl">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  <motion.span
                    animate={{
                      color:
                        active === tab.value
                          ? "hsl(var(--foreground))"
                          : "hsl(var(--muted-foreground))",
                    }}
                    className="flex items-center gap-1.5"
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </motion.span>
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {/* Tab Contents */}
          {TABS.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              forceMount
              className={active !== tab.value ? "hidden" : ""}
            >
              <AnimatePresence mode="wait">
                {active === tab.value && (
                  <motion.div key={tab.value} {...fadeSlide}>
                    {tab.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
