import { Link } from "@tanstack/react-router";
import { Button } from "@sharpnr/ui";
import { ArrowRight } from "lucide-react";
import { SIGN_IN_HREF } from "../data/navigation";

const CallToAction = () => {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground px-6 py-14 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-background sm:text-4xl font-heading">
            Bring your whole workforce into one workspace
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-background/70">
            Sign in to SharpIAM and give every employee and manager secure,
            self-service access — from anywhere.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link to={SIGN_IN_HREF}>
                Open portal
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              asChild
              className="text-background hover:bg-background/10 hover:text-background"
            >
              <a href="#features">See all features</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
