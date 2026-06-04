import { gsap, useGSAP, ScrollTrigger } from "@/animations/gsap";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: "box1",
    tag: "Platform",
    num: "01",
    title: "Sharpnr\nPlatform",
    body: "A unified ecosystem of apps and services, bringing your entire workflow into one seamlessly connected environment.",
  },
  {
    id: "box2",
    tag: "Ecosystem",
    num: "02",
    title: "Unified\nServices",
    body: "Every tool interconnected. Sharpnr's modular architecture lets teams build faster and stay in sync without friction.",
  },
  {
    id: "box3",
    tag: "Vision",
    num: "03",
    title: "Built for\nthe Future",
    body: "Not just another tool — the infrastructure for how modern teams think, collaborate, and ship together.",
  },
];

const SharpnrIntro = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cardEls = gsap.utils.toArray<HTMLElement>(
        ".s-card",
        sectionRef.current,
      );

      cardEls.forEach((card) => {
        const tag = card.querySelector(".s-tag");
        const title = card.querySelector(".s-title");
        const divider = card.querySelector(".s-divider");
        const body = card.querySelector(".s-body");
        const visual = card.querySelector(".s-visual");
        const bar = card.querySelector(".s-bar");

        // Staggered text reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none none",
            scrub: true,
          },
        });

        tl.fromTo(
          tag,
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        )
          .fromTo(
            title,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
            "-=0.2",
          )
          .fromTo(
            divider,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 0.7, ease: "expo.out" },
            "-=0.15",
          )
          .fromTo(body, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.1")
          .fromTo(
            bar,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 1, ease: "expo.out" },
            "-=0.3",
          );

        // Visual slide-in
        gsap.fromTo(
          visual,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            delay: 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );

        // Parallax scrub on image
        gsap.fromTo(
          visual,
          { y: 40 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="m-0 p-0">
      {cards.map((card, i) => (
        <div
          key={card.id}
          id={card.id}
          className="s-card max-w-7xl mx-auto relative grid grid-cols-2 gap-12 items-center min-h-screen px-10 py-20 overflow-hidden"
        >
          {/* Big number */}
          <span className="absolute top-[-16px] right-4 font-serif text-[130px] font-black leading-none text-white/[.04] select-none pointer-events-none">
            {card.num}
          </span>

          {/* Text side */}
          <div className={`relative z-10 ${i % 2 === 1 ? "order-2" : ""}`}>
            <p className="s-tag text-[9px] tracking-[.28em] uppercase text-lime-400 mb-4">
              {card.tag}
            </p>
            <h2 className="s-title font-serif text-4xl font-bold leading-[1.15] mb-5 whitespace-pre-line">
              {card.title}
            </h2>
            <div className="s-divider h-px w-14 bg-lime-400 mb-5 origin-left" />
            <p className="s-body text-xs leading-[1.9] text-white/40 max-w-xs">
              {card.body}
            </p>
          </div>

          {/* Visual side */}
          <div
            className={`s-visual relative z-10 ${i % 2 === 1 ? "order-1" : ""}`}
          >
            <div className="relative w-full aspect-video bg-neutral-900 border border-white/[.06] overflow-hidden">
              <img
                src={`https://dummyimage.com/1280x720/111/222&text=0${i + 1}`}
                alt={card.tag}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="s-bar absolute bottom-0 left-0 h-[1.5px] w-full bg-lime-400 origin-left" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SharpnrIntro;
