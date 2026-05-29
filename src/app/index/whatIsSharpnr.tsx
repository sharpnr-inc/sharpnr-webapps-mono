export function SharpnrIntroductionSection() {
  return (
    <section className="min-h-screen  py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="space-y-16">
          <div className="space-y-6">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Introduction
            </span>

            <h1 className="max-w-4xl text-5xl font-bold tracking-tight lg:text-7xl">
              Sharpnr is a unified platform for managing modern businesses and
              organizations.
            </h1>

            <p className="max-w-4xl text-lg leading-8 text-muted-foreground">
              Most businesses rely on dozens of disconnected applications to
              handle accounting, customer management, reservations, inventory,
              human resources, communication, analytics, and daily operations.
              This creates data silos, duplicated work, inconsistent reporting,
              and unnecessary complexity.
            </p>

            <p className="max-w-4xl text-lg leading-8 text-muted-foreground">
              Sharpnr brings these critical business functions together into a
              single interconnected ecosystem. Instead of managing multiple
              subscriptions, integrating unrelated software, and manually
              transferring information between systems, organizations can
              operate from one platform where data flows naturally between
              applications.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border p-8">
              <h2 className="mb-4 text-2xl font-semibold">
                Built Around Real Operations
              </h2>

              <p className="leading-8 text-muted-foreground">
                Sharpnr is designed around how businesses actually work.
                Departments are connected. Accounting depends on sales.
                Inventory depends on purchasing. Human resources affects payroll
                and scheduling. Customer interactions influence operations and
                decision making.
              </p>

              <p className="mt-4 leading-8 text-muted-foreground">
                Every application within the Sharpnr ecosystem is designed to
                share information intelligently, reducing repetitive work and
                improving operational visibility across the organization.
              </p>
            </div>

            <div className="rounded-xl border p-8">
              <h2 className="mb-4 text-2xl font-semibold">
                One Platform, Multiple Solutions
              </h2>

              <p className="leading-8 text-muted-foreground">
                Whether you operate a restaurant, hotel, school, healthcare
                facility, retail business, logistics company, non-profit, or a
                growing enterprise, Sharpnr provides specialized applications
                tailored to your industry while maintaining a consistent
                experience throughout the platform.
              </p>

              <p className="mt-4 leading-8 text-muted-foreground">
                Teams gain access to purpose-built tools without sacrificing
                integration, reporting, security, or maintainability.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-10">
            <h2 className="mb-6 text-3xl font-bold">The Sharpnr Ecosystem</h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="mb-3 font-semibold">Business Operations</h3>
                <p className="text-muted-foreground">
                  Accounting, invoicing, inventory management, purchasing,
                  payroll, reporting, workflow automation, and operational
                  analytics.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Customer Experience</h3>
                <p className="text-muted-foreground">
                  CRM, reservations, hospitality management, customer support,
                  communication tools, engagement tracking, and service
                  management.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Organization Management</h3>
                <p className="text-muted-foreground">
                  Human resources, staff scheduling, attendance, permissions,
                  internal collaboration, and organizational oversight.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Designed for Scale</h2>

            <p className="max-w-4xl text-lg leading-8 text-muted-foreground">
              Sharpnr is designed to support organizations from small teams to
              large enterprises. As businesses grow, their operational
              requirements become increasingly complex. The platform is built to
              adapt to that growth while maintaining simplicity for everyday
              users.
            </p>

            <p className="max-w-4xl text-lg leading-8 text-muted-foreground">
              Our vision is to create a complete business operating system where
              organizations can manage every aspect of their operations through
              a single, integrated platform. By reducing complexity and
              increasing visibility, Sharpnr helps teams focus on growth,
              service quality, and long-term success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
