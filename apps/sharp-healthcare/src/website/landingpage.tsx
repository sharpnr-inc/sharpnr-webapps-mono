import { Button, Card, CardContent, CardHeader, CardTitle } from "@sharpnr/ui";

const features = [
  {
    title: "Patient Records",
    desc: "A single longitudinal record per patient — demographics, history, allergies and encounters in one place.",
  },
  {
    title: "Appointments",
    desc: "Scheduling across departments and practitioners, with room and equipment availability resolved up front.",
  },
  {
    title: "Clinical Workflows",
    desc: "Triage, orders, results and discharge as tracked steps rather than paper handoffs.",
  },
  {
    title: "Billing & Claims",
    desc: "Charge capture wired to the accounting suite, with payer claims and reconciliation built in.",
  },
];

export function LandingPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-muted-foreground mb-4 text-sm tracking-widest uppercase">
          Sharpnr Suite
        </p>
        <h1 className="text-5xl font-semibold tracking-tight text-balance">
          Sharp Healthcare
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-pretty">
          Clinical and administrative operations for hospitals and clinics —
          records, scheduling, workflows and billing on one platform.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button size="lg">Get started</Button>
          <Button size="lg" variant="outline">
            Book a demo
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {feature.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
