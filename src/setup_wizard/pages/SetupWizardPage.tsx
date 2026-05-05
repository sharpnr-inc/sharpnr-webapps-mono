import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useJoyride } from "react-joyride";
import { steps as joysteps } from "@/lib/tour_steps";
import { Button } from "@/components/ui/button";

// ─── tiny sub-components ────────────────────────────────────────────────────

function SharpDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, originX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      style={{
        height: "1px",
        background:
          "linear-gradient(90deg, #00f5c8 0%, rgba(0,245,200,0.15) 60%, transparent 100%)",
        marginBottom: "3rem",
        transformOrigin: "left center",
      }}
    />
  );
}

// ─── Noise / grain overlay (pure CSS, no texture file needed) ───────────────
const noiseStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
  backgroundRepeat: "repeat",
  backgroundSize: "256px 256px",
  opacity: 0.03,
  pointerEvents: "none",
  zIndex: 1,
};

// ─── Geometric accent lines ──────────────────────────────────────────────────
function GeometricAccent() {
  return (
    <svg
      viewBox="0 0 600 600"
      style={{
        position: "absolute",
        top: "-80px",
        right: "-120px",
        width: "600px",
        height: "600px",
        opacity: 0.07,
        pointerEvents: "none",
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.polygon
        points="300,20 580,460 20,460"
        stroke="#00f5c8"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
      />
      <motion.polygon
        points="300,80 520,430 80,430"
        stroke="#00f5c8"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
      />
      <motion.circle
        cx="300"
        cy="300"
        r="250"
        stroke="#00f5c8"
        strokeWidth="0.5"
        strokeDasharray="4 8"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          opacity: { duration: 1, delay: 0.4 },
        }}
      />
    </svg>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

interface WelcomePageProps {
  onContinue?: () => void;
}

export function WelcomePage({ onContinue }: WelcomePageProps) {
  const [hovered, setHovered] = useState(false);

  // stagger config
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#080a0c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grain */}
      <div style={noiseStyle} />

      {/* Radial glow behind content */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(0,245,200,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Geometric SVG accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <GeometricAccent />
      </div>

      {/* Bottom-left decorative line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        style={{
          position: "fixed",
          bottom: 0,
          left: "4rem",
          width: "1px",
          height: "140px",
          background:
            "linear-gradient(to top, rgba(0,245,200,0.5), transparent)",
          transformOrigin: "bottom center",
          zIndex: 1,
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1 }}
        style={{
          position: "fixed",
          bottom: 0,
          left: "4rem",
          width: "80px",
          height: "1px",
          background:
            "linear-gradient(to right, rgba(0,245,200,0.5), transparent)",
          transformOrigin: "left center",
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "640px",
          width: "100%",
        }}
      >
        {/* Badge */}
        <motion.div variants={item} style={{ marginBottom: "2rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0.3rem 0.8rem",
              border: "1px solid rgba(0,245,200,0.3)",
              borderRadius: "2px",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#00f5c8",
              background: "rgba(0,245,200,0.06)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#00f5c8",
                boxShadow: "0 0 8px #00f5c8",
              }}
            />
            System Ready
          </span>
        </motion.div>

        {/* Logo / Wordmark */}
        <motion.div variants={item} style={{ marginBottom: "0.5rem" }}>
          <h1
            style={{
              fontSize: "clamp(3.5rem, 10vw, 6.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              margin: 0,
              color: "#ffffff",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            sharp
            <span style={{ color: "#00f5c8", position: "relative" }}>
              nr
              {/* Underline accent */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  display: "block",
                  position: "absolute",
                  bottom: "0.1em",
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "#00f5c8",
                  transformOrigin: "left center",
                }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Version tag */}
        <motion.div variants={item} style={{ marginBottom: "2.5rem" }}>
          <span
            style={{
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            v1.0.0 — Initializing workspace
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div variants={item}>
          <SharpDivider />
        </motion.div>

        {/* Tagline */}
        <motion.div variants={item} style={{ marginBottom: "1.2rem" }}>
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.55,
              margin: 0,
              fontFamily: "'IBM Plex Sans', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            Precision-built tooling for teams that move fast.
            <br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>
              Let's get your workspace configured.
            </span>
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={item}>
          <motion.button
            onClick={onContinue}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.975 }}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "0.9rem 2rem",
              background: hovered ? "rgba(0,245,200,0.12)" : "transparent",
              border: "1px solid rgba(0,245,200,0.5)",
              borderRadius: "2px",
              color: "#00f5c8",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.25s ease",
              fontFamily: "'IBM Plex Mono', monospace",
              overflow: "hidden",
            }}
          >
            {/* Shimmer sweep */}
            <motion.span
              animate={hovered ? { x: ["−100%", "200%"] } : {}}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "60%",
                background:
                  "linear-gradient(90deg, transparent, rgba(0,245,200,0.15), transparent)",
                pointerEvents: "none",
              }}
            />
            Continue to Setup
            {/* Arrow icon */}
            <motion.span
              animate={hovered ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </motion.button>

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            style={{
              marginTop: "1rem",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.05em",
            }}
          >
            Setup takes about 2 minutes
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── SetupWizardPage (wires WelcomePage → wizard) ───────────────────────────

export function SetupWizardPage() {
  const { controls, on, Tour } = useJoyride({
    continuous: true,
    steps: joysteps,
  });
  const [step, setStep] = useState<"welcome" | "wizard">("welcome");

  if (step === "welcome") {
    return <WelcomePage onContinue={() => setStep("wizard")} />;
  }

  useEffect(() => {
    return on("tour:end", () => {
      console.log("Tour finished!");
    });
  }, [on]);

  // Replace the div below with your actual SetupWizard component
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080a0c",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          textAlign: "center",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#00f5c8",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Step 1 of 4
        </span>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>
          Setup Wizard
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", margin: 0 }}>
          Your wizard content goes here.
        </p>
        <div>
          <Button onClick={() => controls.start()}>Start Tour</Button>
          {Tour}
          {/* your app content */}
        </div>
      </motion.div>
    </div>
  );
}
