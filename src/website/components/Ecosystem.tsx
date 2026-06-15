import { ECOSYSTEM_PRODUCTS } from "../data/products";
import SectionHeading from "./SectionHeading";

const Ecosystem = () => {
  return (
    <section id="platform" className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="One platform"
          title="Part of the Sharpnr ecosystem"
          description="SharpIAM is integrated with the entire Sharp platform, so identity, people, finance and operations all work from the same source of truth."
        />

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
          {ECOSYSTEM_PRODUCTS.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="flex items-center gap-3 bg-background p-5"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border text-foreground">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {product.label}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {product.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
