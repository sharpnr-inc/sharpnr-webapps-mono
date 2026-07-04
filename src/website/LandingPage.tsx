import {
  ArrowRight,
  CheckCircle2,
  Users,
  BarChart3,
  Workflow,
  MessageSquare,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Customer Management",
    description:
      "Keep every customer, company, contact, and interaction organized in one unified workspace.",
  },
  {
    icon: Workflow,
    title: "Sales Pipeline",
    description:
      "Track opportunities from lead to closed deal with customizable pipelines and stages.",
  },
  {
    icon: MessageSquare,
    title: "Activity Timeline",
    description:
      "View emails, calls, meetings, notes, and tasks in a complete customer timeline.",
  },
  {
    icon: Target,
    title: "Lead Management",
    description:
      "Capture, qualify, assign, and nurture leads without losing important context.",
  },
  {
    icon: BarChart3,
    title: "Insights & Analytics",
    description:
      "Monitor sales performance, conversion rates, and team productivity with live dashboards.",
  },
  {
    icon: CheckCircle2,
    title: "Automation",
    description:
      "Automate repetitive follow-ups, reminders, assignments, and CRM workflows.",
  },
];

const stats = [
  { value: "360°", label: "Customer View" },
  { value: "24/7", label: "Sales Visibility" },
  { value: "100%", label: "Activity Tracking" },
  { value: "∞", label: "Scalability" },
];

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center lg:px-8">
          <div className="rounded-full border bg-muted/50 px-4 py-1 text-sm font-medium">
            Built for modern sales teams
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Grow customer relationships with{" "}
            <span className="text-primary">SharpCRM</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
            SharpCRM helps your teams manage leads, nurture customers,
            collaborate across departments, and close deals faster with one
            intelligent CRM platform.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            <button className="rounded-lg border px-6 py-3 font-medium transition hover:bg-muted">
              Book Demo
            </button>
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

          <h2 className="mt-4 text-4xl font-bold">Everything your CRM needs</h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Designed to help sales, customer success, and operations teams work
            together from the first interaction to long-term customer success.
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

      {/* Why SharpCRM */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why SharpCRM
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              A CRM that adapts to your business
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Whether you're managing hundreds of customers or millions of
              interactions, SharpCRM gives your teams the tools to stay
              organized, automate workflows, and deliver exceptional customer
              experiences.
            </p>
          </div>

          <div className="space-y-6">
            {[
              "Custom pipelines for every sales process",
              "Centralized customer records",
              "Task and meeting management",
              "Activity history across teams",
              "Powerful reporting dashboards",
              "Built for multi-organization deployments",
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

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-28 text-center">
        <h2 className="text-4xl font-bold">
          Start building stronger customer relationships.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Bring your customers, sales pipeline, and team collaboration together
          with SharpCRM.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90">
            Start Now
          </button>

          <button className="rounded-lg border px-6 py-3 font-medium transition hover:bg-muted">
            Contact Sales
          </button>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
