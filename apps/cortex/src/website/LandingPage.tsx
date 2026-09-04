import { config } from "@sharpnr/env";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  KeyRound,
  Laptop,
  ScrollText,
  ShieldCheck,
  Boxes,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Role-Based Access Control",
    description:
      "Grant permissions to roles instead of people one at a time. A model defined once in Cortex holds across every Sharpnr app.",
  },
  {
    icon: Laptop,
    title: "Device Management",
    description:
      "Enroll and manage the hardware your organization issues, tied to the person responsible for it and to its compliance state.",
  },
  {
    icon: Boxes,
    title: "Resource Permissions",
    description:
      "Databases, storage, APIs and services each carry their own permission set, managed centrally rather than inside every app.",
  },
  {
    icon: KeyRound,
    title: "Keys & Secrets",
    description:
      "Issue, scope, rotate and revoke API keys, service accounts and secrets from one governed place.",
  },
  {
    icon: ScrollText,
    title: "Audit Logs",
    description:
      "Every access event and administrative action recorded: who reached which resource, what changed, and when.",
  },
  {
    icon: ClipboardCheck,
    title: "Policies & Compliance",
    description:
      "Express your security posture centrally, run access reviews on a schedule, and produce the evidence auditors ask for.",
  },
];

const stats = [
  { value: "RBAC", label: "Access Model" },
  { value: "3", label: "Database Access Levels" },
  { value: "100%", label: "Access Audited" },
  { value: "Multi-org", label: "Administration" },
];

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center lg:px-8">
          <div className="rounded-full border bg-muted/50 px-4 py-1 text-sm font-medium">
            Built for IT and security teams
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Control who reaches what with{" "}
            <span className="text-primary">Cortex</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
            Cortex is the IT control plane for the Sharpnr platform. Manage the
            devices you issue, the roles people hold, and the databases, APIs
            and secrets they can reach — from one place, with every change on
            the record.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* External app URLs are plain anchors, never router links. */}
            <a
              href={`${config.authAppUrl}/signup`}
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>

            <a
              href={`${config.docsAppUrl}/cortex`}
              className="rounded-lg border px-6 py-3 font-medium transition hover:bg-muted"
            >
              Read the Docs
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-14 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border bg-card p-6 text-center"
            >
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Features
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            One control plane for IT
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Where Orchestrator decides which services run, Cortex decides who
            and what can reach the resources behind them — and keeps the record
            of every decision.
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

      {/* Why Cortex */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why Cortex
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              Access that is scoped, reviewed, and revocable
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Access spread across a dozen admin panels is access nobody can
              answer questions about. Cortex puts the whole model in one place,
              so granting, reviewing and removing it is a single, audited
              motion.
            </p>
          </div>

          <div className="space-y-6">
            {[
              "Read, Write and Admin grants on Silo databases",
              "Devices enrolled, assigned, and remotely lockable",
              "API keys and service accounts issued and revoked centrally",
              "Secrets stored once, never scattered across config files",
              "Time-bound access that expires without anyone remembering",
              "Offboarding that removes every grant in one action",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-xl border bg-background p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-28 text-center">
        <h2 className="text-4xl font-bold">
          Bring your IT controls into one place.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Devices, roles, resources, credentials and the audit trail that ties
          them together.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={`${config.authAppUrl}/signup`}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Start Now
          </a>

          <a
            href={config.authAppUrl}
            className="rounded-lg border px-6 py-3 font-medium transition hover:bg-muted"
          >
            Sign In
          </a>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
