import { Badge, Card, CardContent } from "@sharpnr/ui";
import {
  Calculator,
  BookOpen,
  Scale,
  ReceiptText,
  Banknote,
  CalendarRange,
  BarChart3,
  CheckCircle2,
  Building2,
  Link2,
} from "lucide-react";
import { useAccountingAccountStatus } from "../api/queries";

const CAPABILITIES = [
  {
    icon: BookOpen,
    title: "Books per Legal Entity",
    desc: "Each legal entity gets its own book and chart of accounts, so entities never share a ledger.",
  },
  {
    icon: Scale,
    title: "Double-Entry Journals",
    desc: "Every posting balances. Corrections are further entries, not silent edits — the audit trail stays intact.",
  },
  {
    icon: ReceiptText,
    title: "Purchase Invoices",
    desc: "Supplier bills recorded against the entity that owes them, feeding the ledger without re-keying.",
  },
  {
    icon: Banknote,
    title: "Payments",
    desc: "Payment orders and settlements posted from the payment engine straight into the books.",
  },
  {
    icon: CalendarRange,
    title: "Fiscal Years",
    desc: "Open, post into, and close periods — with closing handled deliberately rather than by editing history.",
  },
  {
    icon: BarChart3,
    title: "Reports",
    desc: "Profit and loss, account balances, and ledgers built from the entries rather than from a parallel store.",
  },
];

const PRINCIPLES = [
  {
    icon: Building2,
    title: "Entity-scoped by design",
    desc: "The org takes the service once; each legal entity gets its own book underneath, with access scoped per entity.",
  },
  {
    icon: Link2,
    title: "Fed by the rest of the platform",
    desc: "Invoices, payments, suppliers, and inventory post into the books directly, so the ledger isn't a re-entry exercise.",
  },
];

function AccountingServiceIndexPage() {
  const { data } = useAccountingAccountStatus();
  const isActive = data?.data?.isActive ?? false;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <Calculator size={20} className="text-indigo-500" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">
              Sharp Accounting
            </h1>
            {isActive && (
              <Badge
                variant="outline"
                className="text-emerald-500 border-emerald-500/30 bg-emerald-500/8 text-[11px] font-semibold tracking-wide gap-1"
              >
                <CheckCircle2 size={10} />
                Active
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Books, ledgers, and financial reporting for your organisation
          </p>
        </div>
      </div>

      {/* Service Status */}
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 flex items-center gap-4">
        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            Accounting Service is Active
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            The service is running for your organisation. Each legal entity's
            book is set up from that entity's page.
          </p>
        </div>
      </div>

      {/* What is it */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          What is Sharp Accounting?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Sharp Accounting is the double-entry ledger built into the
          orchestrator. Your organisation takes the service once; each legal
          entity then gets its own book, fed by the invoices, payments, and
          purchases the rest of the platform already records — so the ledger
          reflects what happened rather than what someone remembered to re-enter.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {PRINCIPLES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-lg border border-border/50 bg-muted/30 p-4 flex gap-3 items-start"
            >
              <Icon size={16} className="text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          What Accounting Gives Your Org
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CAPABILITIES.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="border-border/50 bg-muted/30">
              <CardContent className="p-4 flex gap-3 items-start">
                <div className="p-1.5 rounded-md bg-muted border border-border/50 shrink-0">
                  <Icon size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccountingServiceIndexPage;
