import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Hotel, Soup, Book, Cpu, Boxes } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Modular Architecture",
    description:
      "Activate only what you need, when you need it. Sharpnr is built around independent yet connected modules.",
    icon: <Layers size={40} className="text-primary" />,
  },
  {
    title: "Hospitality Operations",
    description:
      "Room bookings, guest management, charges, and billing. Designed for real hotel workflows.",
    icon: <Hotel size={40} className="text-primary" />,
  },
  {
    title: "Kitchen & Order Orchestration",
    description:
      "A unified kitchen for multiple outlets. Track orders from the hotel, restaurant, and bar seamlessly.",
    icon: <Soup size={40} className="text-primary" />,
  },
  {
    title: "Accounting That Matches Reality",
    description:
      "Event-driven journal entries and transparent, auditable records that reflect what actually happened.",
    icon: <Book size={40} className="text-primary" />,
  },
  {
    title: "AI & Insights (Planned)",
    description:
      "Smart operational summaries, trend analysis, and anomaly detection. AI as an assistant, not a black box.",
    icon: <Cpu size={40} className="text-primary" />,
  },
  {
    title: "Inventory Module (Planned)",
    description:
      "Manage stock levels across multiple locations with real-time inventory tracking and control.",
    icon: <Boxes size={40} className="text-primary" />,
  },
];

const FeatureCard = ({ feature }: { feature: (typeof features)[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { top, left, width, height } = (
        currentTarget as HTMLElement
      ).getBoundingClientRect();

      const x = gsap.utils.mapRange(0, width, -10, 10, clientX - left);
      const y = gsap.utils.mapRange(0, height, -10, 10, clientY - top);

      gsap.to(card, {
        rotationX: -y,
        rotationY: x,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="
        relative overflow-hidden
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        p-8
        flex flex-col items-center text-center
        transition-all duration-300
        hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)]
        hover:border-white/20
      "
      style={{ willChange: "transform" }}
    >
      {/* subtle glass reflection */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      <div className="mb-4 relative z-10">{feature.icon}</div>

      <h3 className="text-2xl font-bold text-foreground mb-2 relative z-10">
        {feature.title}
      </h3>

      <p className="text-muted-foreground relative z-10">
        {feature.description}
      </p>
    </div>
  );
};

export function Features() {
  useEffect(() => {
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  return (
    <section className="py-24 px-4 bg-transparent">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">
            A better way to run your operations.
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Sharpnr is a modular orchestration platform designed for real-world
            hospitality businesses.
          </p>
        </div>
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
