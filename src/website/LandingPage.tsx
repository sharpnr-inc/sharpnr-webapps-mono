import {
  ArrowRight,
  BarChart3,
  Building2,
  Calculator,
  CheckCircle2,
  CreditCard,
  FileSpreadsheet,
  Receipt,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Double-Entry Accounting",
    description:
      "Maintain accurate financial records with a complete double-entry accounting system.",
  },
  {
    icon: Receipt,
    title: "Invoices & Bills",
    description:
      "Create invoices, manage vendor bills, track payments, and monitor outstanding balances.",
  },
  {
    icon: Wallet,
    title: "Cash Flow",
    description:
      "Monitor cash inflows and outflows with real-time financial visibility.",
  },
  {
    icon: CreditCard,
    title: "Bank Reconciliation",
    description:
      "Reconcile bank statements quickly and ensure every transaction is accounted for.",
  },
  {
    icon: FileSpreadsheet,
    title: "Financial Reports",
    description:
      "Generate balance sheets, profit & loss statements, trial balances, and more.",
  },
  {
    icon: Building2,
    title: "Multi-Entity Accounting",
    description:
      "Manage multiple companies, branches, or organizations from a unified platform.",
  },
];

const stats = [
  {
    value: "100%",
    label: "Financial Visibility",
  },
  {
    value: "24/7",
    label: "Real-Time Reports",
  },
  {
    value: "∞",
    label: "Scalable Ledgers",
  },
  {
    value: "AI",
    label: "Smart Insights",
  },
];

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
          <div className="rounded-full border bg-muted/50 px-4 py-1 text-sm font-medium">
            Modern Accounting Platform
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Accounting built for growing businesses with{" "}
            <span className="text-primary">Sharp-Accounting</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">
            Automate bookkeeping, simplify financial operations, generate
            powerful reports, and gain complete control over your business
            finances—all from a single accounting platform.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            <button className="rounded-lg border px-6 py-3 font-medium">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-16 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border bg-card p-6 text-center"
            >
              <div className="text-3xl font-bold">{item.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Features
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Everything you need to manage your finances
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            From bookkeeping to financial reporting, Sharp-Accounting provides
            every tool required to run modern accounting operations efficiently.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border bg-card p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why Sharp-Accounting
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              Built for accountants, finance teams, and growing businesses
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Whether you're managing a single business or multiple legal
              entities, Sharp-Accounting keeps your books accurate, your reports
              reliable, and your finances always under control.
            </p>
          </div>

          <div className="space-y-5">
            {[
              "General Ledger & Journal Entries",
              "Accounts Payable & Receivable",
              "Multi-Currency Support",
              "Budgeting & Cost Centers",
              "Tax & Compliance Ready",
              "Real-Time Financial Dashboards",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-xl border bg-background p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 py-28 text-center">
        <BarChart3 className="mx-auto mb-6 h-14 w-14 text-primary" />

        <h2 className="text-4xl font-bold">
          Gain complete confidence in your finances.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Simplify bookkeeping, automate financial workflows, and make better
          business decisions with Sharp-Accounting.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground">
            Start Managing Finances
          </button>

          <button className="rounded-lg border px-6 py-3 font-medium">
            Learn More
          </button>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
