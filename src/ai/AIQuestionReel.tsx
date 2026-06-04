import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// ─── Questions from user / client POV ────────────────────────────────────────
const QUESTIONS = [
  "Why do I need 6 different apps just to run my business?",
  "Can I see all my operations in one place?",
  "How do I stop losing time to repetitive tasks?",
  "Is there a platform that actually scales with me?",
  "What if my whole team worked from one dashboard?",
  "Why does every tool feel disconnected from the last?",
  "Can I automate without hiring a developer?",
  "What would 10× efficiency actually look like?",
];

// Split a question into word spans for per-word animation
function WordSpans({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="word-span inline-block mr-[0.28em] overflow-hidden"
          style={{ verticalAlign: "bottom" }}
        >
          <span className="word-inner inline-block">{word}</span>
        </span>
      ))}
    </>
  );
}

export function AIQuestionReel({ onOpen }: { onOpen: (ctx: string) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animate words in on mount / question change
  const animateIn = () => {
    if (!questionRef.current) return;
    const words =
      questionRef.current.querySelectorAll<HTMLElement>(".word-inner");
    if (tlRef.current) tlRef.current.kill();
    const tl = gsap.timeline();
    tl.set(words, { y: "105%", opacity: 0, rotateX: -35 });
    tl.to(words, {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      duration: 0.55,
      stagger: 0.04,
      ease: "expo.out",
    });
    tlRef.current = tl;
  };

  const animateOut = (onComplete: () => void) => {
    if (!questionRef.current) return;
    const words =
      questionRef.current.querySelectorAll<HTMLElement>(".word-inner");
    const tl = gsap.timeline({ onComplete });
    tl.to(words, {
      y: "-105%",
      opacity: 0,
      rotateX: 20,
      duration: 0.35,
      stagger: 0.025,
      ease: "expo.in",
    });
    tlRef.current = tl;
  };

  // Kick off cycling
  useEffect(() => {
    animateIn();

    intervalRef.current = setInterval(() => {
      animateOut(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % QUESTIONS.length;
          setDisplayIndex(next);
          return next;
        });
      });
    }, 3200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (tlRef.current) tlRef.current.kill();
    };
    
  }, []);

  // Re-animate when displayIndex changes
  useEffect(() => {
    animateIn();
    // Pulse counter
    if (counterRef.current) {
      gsap.fromTo(
        counterRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );
    }
  }, [displayIndex]);

  const handleOpen = () => {
    const ctx = `I came from the hero section and have a question: "${QUESTIONS[activeIndex]}" — can Sharpnr solve this for me?`;
    onOpen(ctx);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-start"
      style={{ perspective: "900px" }}
    >
      {/* Top label */}
      <div className="flex items-center gap-2 mb-8">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-70" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-400" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400/70">
          What our customers ask
        </span>
      </div>

      {/* Question stage */}
      <div
        ref={questionRef}
        className="min-h-[8rem] md:min-h-[10rem] mb-10 flex items-start"
        style={{ transformStyle: "preserve-3d" }}
      >
        <p className="text-[28px] md:text-[36px] lg:text-[40px] font-bold leading-[1.18] tracking-tight text-white select-none">
          <WordSpans text={QUESTIONS[displayIndex]} />
        </p>
      </div>

      {/* CTA Button */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex items-center gap-4 px-8 py-4 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          boxShadow:
            "0 0 40px -8px rgba(99,102,241,0.5), 0 20px 40px -15px rgba(0,0,0,0.6)",
        }}
      >
        {/* Shimmer sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPositionX: ["200%", "-200%"] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
        />

        <span className="relative text-[15px] font-bold text-white tracking-tight">
          Find Your Solution
        </span>

        {/* Arrow */}
        <motion.span
          className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-white/10 shrink-0"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </motion.button>

      {/* Subtle hint */}
      <p className="mt-4 text-[11px] text-slate-700 select-none">
        AI-powered · No sign-up required
      </p>

      {/* Decorative vertical rule on the left */}
      <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent hidden lg:block" />
    </div>
  );
}
