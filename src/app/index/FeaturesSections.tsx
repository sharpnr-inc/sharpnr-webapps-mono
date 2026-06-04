import { gsap, useGSAP } from "@/animations/gsap";
import { useRef } from "react";

const FeaturesCard = [
  {
    id: "fcard1",
    name: "Connects With Other Businesses",
    cardColor: "#EC4999",
    description:
      "Connect with suppliers, vendors, and partner businesses. Purchase orders and invoices sync automatically without manual entry.",
  },
  {
    id: "fcard2",
    name: "Smart Inventory Management",
    cardColor: "#7C3AED",
    description:
      "Track stock levels in real time, receive low-stock alerts, and automate replenishment workflows.",
  },
  {
    id: "fcard3",
    name: "Automated Accounting",
    cardColor: "#2563EB",
    description:
      "Generate invoices, manage payments, reconcile transactions, and maintain accurate financial records effortlessly.",
  },
  {
    id: "fcard4",
    name: "Multi-Branch Operations",
    cardColor: "#0EA5E9",
    description:
      "Manage multiple hotels, restaurants, or business locations from a single centralized dashboard.",
  },
  {
    id: "fcard5",
    name: "Customer Relationship Management",
    cardColor: "#14B8A6",
    description:
      "Store customer profiles, preferences, and booking history to deliver personalized experiences.",
  },
  {
    id: "fcard6",
    name: "Real-Time Analytics",
    cardColor: "#22C55E",
    description:
      "Monitor revenue, occupancy, sales, and operational performance with live business insights.",
  },
  {
    id: "fcard7",
    name: "Employee Management",
    cardColor: "#84CC16",
    description:
      "Handle staff scheduling, attendance, payroll tracking, and role-based permissions from one place.",
  },
  {
    id: "fcard8",
    name: "Cloud Synchronization",
    cardColor: "#F59E0B",
    description:
      "Access your business data securely from anywhere with automatic cloud backup and synchronization.",
  },
  {
    id: "fcard9",
    name: "Reservation & Booking System",
    cardColor: "#F97316",
    description:
      "Manage reservations, room bookings, table bookings, and customer requests through a unified platform.",
  },
  {
    id: "fcard10",
    name: "AI-Powered Insights",
    cardColor: "#EF4444",
    description:
      "Use intelligent recommendations and predictive analytics to improve efficiency and profitability.",
  },
];

const CARD_VW = 66.666;
const GAP = 24;

const FeaturesSections = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const cards = gsap.utils.toArray<HTMLElement>(".featurecard", track);
      const cardPx = (CARD_VW / 100) * window.innerWidth;
      const totalScroll =
        cards.length * (cardPx + GAP) - window.innerWidth + GAP;

      // Set all cards to their initial hidden state immediately
      gsap.set(cards, { x: 80, opacity: 0, scale: 0.93 });

      // ── 1. Pin + horizontal drive ──
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          id: "features-pin",
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          markers: true,
          // ── 2. Reveal cards inside onUpdate — no containerAnimation needed ──
          onUpdate: (self) => {
            const progress = self.progress;
            // How many px has the track moved?
            const trackX = progress * totalScroll;

            cards.forEach((card, i) => {
              // Left edge of this card in track-local coordinates
              const cardLeft = i * (cardPx + GAP);
              // How far past the right viewport edge is this card's left edge?
              // card enters when cardLeft - trackX < window.innerWidth
              const distFromRight =
                cardLeft - trackX - window.innerWidth * 0.85;

              if (distFromRight > 0) {
                // Card hasn't entered yet — keep hidden, offset right
                const enterProgress = Math.max(
                  0,
                  1 - distFromRight / (window.innerWidth * 0.3),
                );
                gsap.set(card, {
                  x: 80 * (1 - enterProgress),
                  opacity: enterProgress,
                  scale: 0.93 + 0.07 * enterProgress,
                });
              } else {
                // Card is in view — fully revealed
                gsap.set(card, { x: 0, opacity: 1, scale: 1 });
              }
            });
          },
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-center h-screen gap-6 px-8 will-change-transform"
        style={{ perspective: "1200px" }}
      >
        {FeaturesCard.map((feature) => (
          <div
            key={feature.id}
            id={feature.id}
            className="featurecard rounded-2xl shadow-2xl p-8 shrink-0 h-[70vh]"
            style={{
              backgroundColor: feature.cardColor,
              width: `${CARD_VW}vw`,
            }}
          >
            <h2 className="text-2xl font-bold text-white">{feature.name}</h2>
            <p className="mt-4 text-base text-white opacity-90">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSections;
