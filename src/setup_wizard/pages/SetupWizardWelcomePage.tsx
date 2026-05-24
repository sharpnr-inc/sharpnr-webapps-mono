import { useEffect, useState, useRef } from "react";
import { Route } from "@/routes/setup_wizard/route";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { MoveRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { resolveSetupWizardRedirect } from "../resolver/step_resolver";

// ─── Floating Orbs Background ───────────────────────────────────────────────
function BackgroundOrbs() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Noise grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.6,
          zIndex: 1,
        }}
      />

      {/* Soft grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          zIndex: 1,
        }}
      />

      {/* Primary glow — top center */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,214,255,0.22) 0%, rgba(99,214,255,0) 70%)",
          zIndex: 2,
        }}
      />

      {/* Secondary glow — bottom left */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.2, 0.12],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(120,80,255,0.2) 0%, rgba(120,80,255,0) 70%)",
          zIndex: 2,
        }}
      />

      {/* Tertiary glow — right */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.18, 0.1],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        style={{
          position: "absolute",
          top: "30%",
          right: "-15%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,180,0.14) 0%, rgba(0,255,180,0) 70%)",
          zIndex: 2,
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -p.travel, 0],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            zIndex: 2,
          }}
        />
      ))}
    </div>
  );
}

// ─── Splash Screen ───────────────────────────────────────────────────────────
function SplashScreen() {
  return (
    <motion.div
      key="splash"
      variants={{
        initial: {
          opacity: 0,
          scale: 0.85,
        },
        animate: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
        exit: {
          opacity: 0,
          scale: 4.5,
          filter: "blur(24px)",
          transition: {
            duration: 0.65,
            ease: [0.4, 0, 1, 1] as const,
          },
        },
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: "relative",
        zIndex: 10,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        userSelect: "none",
      }}
    >
      {/* Thin top label */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.4em" }}
        animate={{ opacity: 0.4, letterSpacing: "0.55em" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          fontSize: "0.65rem",
          fontFamily: "'IBM Plex Mono', monospace",
          textTransform: "uppercase",
          color: "#63d6ff",
          margin: 0,
        }}
      >
        Setup Wizard
      </motion.p>

      {/* Big brand word */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          margin: 0,
          fontSize: "clamp(3.5rem, 12vw, 8rem)",
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          background:
            "linear-gradient(135deg, #ffffff 0%, rgba(99,214,255,0.9) 50%, #ffffff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
        }}
      >
        SHARPNR
      </motion.h1>

      {/* Pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: "-24px",
          borderRadius: "16px",
          border: "1px solid rgba(99,214,255,0.35)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

// ─── Main Content ────────────────────────────────────────────────────────────
interface MainContentProps {
  onContinue: () => void;
  disabled: boolean;
}
function MainContent({ onContinue, disabled }: MainContentProps) {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const btnRef = useRef<HTMLButtonElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }

  const stagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      style={{
        position: "relative",
        zIndex: 10,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0",
        maxWidth: "640px",
        padding: "0 2rem",
      }}
    >
      {/* Eyebrow */}
      <motion.p
        variants={fadeUp}
        style={{
          margin: "0 0 1rem",
          fontSize: "0.65rem",
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "#63d6ff",
          opacity: 0.7,
        }}
      >
        Welcome to
      </motion.p>

      {/* Hero wordmark */}
      <motion.h1
        variants={fadeUp}
        style={{
          margin: "0 0 0.25rem",
          fontSize: "clamp(3rem, 10vw, 6.5rem)",
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          background:
            "linear-gradient(135deg, #ffffff 30%, rgba(99,214,255,0.85) 65%, #ffffff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        SHARPNR
      </motion.h1>

      {/* Underline accent */}
      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          show: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        style={{
          width: "100%",
          height: "1px",
          margin: "1.25rem 0 2rem",
          background:
            "linear-gradient(90deg, transparent, rgba(99,214,255,0.5), transparent)",
          transformOrigin: "center",
        }}
      />

      {/* Headline */}
      <motion.h2
        variants={fadeUp}
        style={{
          margin: "0 0 1rem",
          fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          lineHeight: 1.35,
          color: "rgba(255,255,255,0.92)",
        }}
      >
        You&apos;ve made a great choice.
        <br />
        <span style={{ color: "rgba(99,214,255,0.85)" }}>
          Let&apos;s get you set up.
        </span>
      </motion.h2>

      {/* Body */}
      <motion.p
        variants={fadeUp}
        style={{
          margin: "0 0 2.5rem",
          fontSize: "0.82rem",
          fontFamily: "'IBM Plex Mono', monospace",
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.38)",
          maxWidth: "440px",
        }}
      >
        This setup wizard will walk you through a few quick steps to configure
        your workspace. It only takes a couple of minutes — we promise.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        ref={btnRef}
        variants={fadeUp}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={onContinue}
        disabled={disabled}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: "0.85rem 2.2rem",
          background: hovered
            ? "rgba(99,214,255,0.12)"
            : "rgba(255,255,255,0.04)",
          color: hovered ? "#63d6ff" : "rgba(255,255,255,0.75)",
          border: `1px solid ${hovered ? "rgba(99,214,255,0.55)" : "rgba(255,255,255,0.12)"}`,
          borderRadius: "6px",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.8rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          outline: "none",
          overflow: "hidden",
          transition:
            "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
        }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Magnetic glint */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(99,214,255,0.15), transparent 70%)",
            x: useTransform(springX, [-80, 80], ["-30%", "30%"]),
            y: useTransform(springY, [-40, 40], ["-30%", "30%"]),
            opacity: hovered ? 1 : 0,
            pointerEvents: "none",
            transition: "opacity 0.3s",
          }}
        />

        <span style={{ position: "relative", zIndex: 1 }}>Continue</span>
        <motion.span
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ position: "relative", zIndex: 1, display: "flex" }}
        >
          <MoveRight size={15} />
        </motion.span>
      </motion.button>

      {/* Footnote */}
      <motion.p
        variants={fadeUp}
        style={{
          margin: "1.5rem 0 0",
          fontSize: "0.65rem",
          fontFamily: "'IBM Plex Mono', monospace",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.05em",
        }}
      >
        Step 1 of 4 &nbsp;·&nbsp; ~2 min to complete
      </motion.p>
    </motion.div>
  );
}

// ─── Root Component ──────────────────────────────────────────────────────────
export function SetupWizardWelcomePage() {
  const [phase, setPhase] = useState<"splash" | "main">("splash");
  const navigate = useNavigate();
  const { setupProgress } = Route.useLoaderData();

  const resolved = resolveSetupWizardRedirect(setupProgress);
  
  console.log(resolved);

  const target =
    resolved.type === "NOT_STARTED" || resolved.type === "IN_PROGRESS"
      ? resolved.target
      : null;

  useEffect(() => {
    const t = setTimeout(() => setPhase("main"), 2200);
    return () => clearTimeout(t);
  }, []);

  function handleContinue() {
    if (!target) return;
    navigate({ to: target.to, params: target.params });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060809",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'IBM Plex Mono', monospace",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <BackgroundOrbs />

      <AnimatePresence mode="wait">
        {phase === "splash" ? (
          <SplashScreen key="splash" />
        ) : (
          <MainContent
            key="main"
            onContinue={handleContinue}
            disabled={!target}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const PARTICLES: {
  id: number;
  x: number;
  y: number;
  size: number;
  travel: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}[] = [
  {
    id: 0,
    x: 12,
    y: 80,
    size: 2,
    travel: 80,
    opacity: 0.45,
    duration: 7,
    delay: 0,
    color: "#63d6ff",
  },
  {
    id: 1,
    x: 28,
    y: 65,
    size: 1.5,
    travel: 60,
    opacity: 0.3,
    duration: 9,
    delay: 1.2,
    color: "#ffffff",
  },
  {
    id: 2,
    x: 45,
    y: 90,
    size: 2.5,
    travel: 100,
    opacity: 0.35,
    duration: 11,
    delay: 0.5,
    color: "#63d6ff",
  },
  {
    id: 3,
    x: 60,
    y: 75,
    size: 1,
    travel: 50,
    opacity: 0.25,
    duration: 8,
    delay: 2.1,
    color: "#7850ff",
  },
  {
    id: 4,
    x: 75,
    y: 85,
    size: 2,
    travel: 70,
    opacity: 0.4,
    duration: 10,
    delay: 0.8,
    color: "#ffffff",
  },
  {
    id: 5,
    x: 88,
    y: 60,
    size: 1.5,
    travel: 90,
    opacity: 0.3,
    duration: 12,
    delay: 1.7,
    color: "#63d6ff",
  },
  {
    id: 6,
    x: 5,
    y: 40,
    size: 1,
    travel: 55,
    opacity: 0.2,
    duration: 7,
    delay: 3.2,
    color: "#00ffb4",
  },
  {
    id: 7,
    x: 92,
    y: 30,
    size: 2,
    travel: 75,
    opacity: 0.35,
    duration: 9,
    delay: 2.5,
    color: "#7850ff",
  },
  {
    id: 8,
    x: 35,
    y: 20,
    size: 1.5,
    travel: 65,
    opacity: 0.25,
    duration: 13,
    delay: 0.3,
    color: "#ffffff",
  },
  {
    id: 9,
    x: 68,
    y: 15,
    size: 1,
    travel: 45,
    opacity: 0.2,
    duration: 8,
    delay: 4.0,
    color: "#63d6ff",
  },
  {
    id: 10,
    x: 50,
    y: 55,
    size: 3,
    travel: 85,
    opacity: 0.15,
    duration: 15,
    delay: 1.0,
    color: "#00ffb4",
  },
  {
    id: 11,
    x: 20,
    y: 10,
    size: 1,
    travel: 60,
    opacity: 0.3,
    duration: 10,
    delay: 2.8,
    color: "#7850ff",
  },
];
