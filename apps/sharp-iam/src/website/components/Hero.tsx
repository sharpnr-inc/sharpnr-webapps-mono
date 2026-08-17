import { Link } from "@tanstack/react-router";
import { Button } from "@sharpnr/ui";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SIGN_IN_HREF } from "../data/navigation";

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* subtle monochrome grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          A Sharpnr product
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl font-heading">
          The self-service portal for your entire workforce
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          SharpIAM gives employees and managers a single, secure place to access
          company resources, manage teams, complete daily tasks and stay
          connected with the organization — from anywhere.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link to={SIGN_IN_HREF}>
              Open portal
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#features">Explore features</a>
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Secure login · Integrated with the entire Sharp platform
        </p>
      </div>
    </section>
  );
};

export default Hero;
