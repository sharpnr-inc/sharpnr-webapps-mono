const STATS = [
  { value: "20+", label: "Built-in workforce tools" },
  { value: "1", label: "Secure sign-in for everything" },
  { value: "8", label: "Connected Sharpnr services" },
  { value: "24/7", label: "Access from anywhere" },
];

const Stats = () => {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-border border-x border-border md:grid-cols-4 md:divide-y-0">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-6 py-8 text-center">
            <div className="text-3xl font-semibold text-foreground sm:text-4xl font-heading">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
