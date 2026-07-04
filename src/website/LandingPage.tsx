import {
  ArrowRight,
  Briefcase,
  Users,
  UserPlus,
  CalendarCheck2,
  BadgeDollarSign,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Employee Management",
    description:
      "Manage employee records, departments, documents, and profiles.",
  },
  {
    icon: BadgeDollarSign,
    title: "Payroll",
    description:
      "Run payroll accurately with salary, tax, and compliance support.",
  },
  {
    icon: CalendarCheck2,
    title: "Leave & Attendance",
    description: "Track attendance, shifts, holidays, and leave approvals.",
  },
  {
    icon: UserPlus,
    title: "Recruitment",
    description:
      "Manage hiring, interviews, onboarding, and candidate pipelines.",
  },
  {
    icon: Briefcase,
    title: "Performance",
    description: "Set goals, conduct reviews, and monitor employee growth.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance",
    description:
      "Stay compliant with audit logs, policies, and statutory reports.",
  },
];

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center">
          <span className="rounded-full border px-4 py-1 text-sm text-muted-foreground">
            Human Resource Management
          </span>

          <h1 className="mt-8 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
            Everything your HR team needs in one place.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Manage employees, payroll, attendance, recruitment, performance, and
            compliance from a modern HR platform built for growing
            organizations.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            <button className="rounded-lg border px-6 py-3 font-medium">
              Learn More
            </button>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 w-full max-w-5xl rounded-2xl border bg-card p-10 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border p-6 text-left">
                <p className="text-sm text-muted-foreground">Employees</p>
                <h3 className="mt-2 text-3xl font-bold">1,248</h3>
              </div>

              <div className="rounded-xl border p-6 text-left">
                <p className="text-sm text-muted-foreground">Open Positions</p>
                <h3 className="mt-2 text-3xl font-bold">24</h3>
              </div>

              <div className="rounded-xl border p-6 text-left">
                <p className="text-sm text-muted-foreground">Attendance</p>
                <h3 className="mt-2 text-3xl font-bold">98.7%</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            HR tools built for modern organizations
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Everything you need to hire, manage, engage, and retain your
            workforce.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border bg-card p-8 transition hover:border-primary/40"
              >
                <div className="mb-5 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-xl font-semibold">{feature.title}</h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-4xl font-bold">Simplify your HR operations.</h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            From onboarding to payroll and performance, SharpHR helps your team
            focus on people instead of paperwork.
          </p>

          <button className="mt-10 inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground">
            Start with SharpHR
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
