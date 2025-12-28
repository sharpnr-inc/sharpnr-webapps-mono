import { useEffect } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Free Forever",
    price: "$0",
    period: "",
    features: [
      "Core operational workflows",
      "Essential modules",
      "Single organization",
      "No forced upgrades",
    ],
    cta: "Start for Free",
  },
  {
    name: "Paid When You Grow",
    price: "Custom",
    period: "",
    features: [
      "Multiple properties",
      "Advanced reports",
      "AI-powered insights",
      "Custom integrations",
      "Priority support",
    ],
    cta: "Contact Sales",
    popular: true,
  },
];

export function Pricing() {
    useEffect(() => {
        gsap.fromTo(
          ".pricing-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".pricing-grid",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }, []);

  return (
    <section className="py-24 px-4 bg-transparent">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">
            Pay only when you scale.
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Sharpnr is free to start and scales only when you do. No dark patterns. No forced upgrades.
          </p>
        </div>
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card rounded-lg p-8 flex flex-col transition-transform duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm ${
                plan.popular ? "shadow-2xl shadow-primary/20 border-2 border-primary" : "shadow-lg border border-border"
              }`}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-primary text-primary-foreground text-sm font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground text-center">
                {plan.name}
              </h3>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </div>
              <ul className="mt-8 space-y-4 text-muted-foreground flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

