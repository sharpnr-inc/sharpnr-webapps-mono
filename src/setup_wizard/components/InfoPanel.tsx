import { motion, type Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

// ─── Shared animation variants ───────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface InfoPanelProps {
  step_name: string;
  step_number: string;
}

// ─── Left Info Panel ──────────────────────────────────────────────────────────
export function InfoPanel({ step_number, step_name }: InfoPanelProps) {
  const perks = [
    "Full access to all modules and settings",
    "Manage users, roles and permissions",
    "Configure org-wide policies",
    "Access the Orchestrator dashboard",
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        padding: "3rem 2.5rem 3rem 3rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Step badge */}
      <motion.div
        custom={0}
        variants={fadeUp}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.3rem 0.75rem",
          border: "1px solid rgba(99,214,255,0.2)",
          borderRadius: "99px",
          marginBottom: "2.5rem",
          width: "fit-content",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#63d6ff",
            boxShadow: "0 0 6px #63d6ff",
          }}
        />
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(99,214,255,0.8)",
          }}
        >
          {`Step ${step_number} of 03`}
        </span>
      </motion.div>

      {/* Big step number — decorative */}
      <motion.div
        custom={1}
        variants={fadeUp}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "clamp(5rem, 10vw, 9rem)",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(99,214,255,0.12)",
          userSelect: "none",
          marginBottom: "-0.5rem",
        }}
      >
        {step_number}
      </motion.div>

      {/* Title */}
      <motion.h1
        custom={2}
        variants={fadeUp}
        style={{
          margin: "0 0 0.75rem",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.15,
          background:
            "linear-gradient(135deg, #fff 40%, rgba(99,214,255,0.8) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {step_name}
      </motion.h1>

      {/* Divider */}
      <motion.div
        custom={3}
        variants={fadeUp}
        style={{
          width: "48px",
          height: "2px",
          background: "linear-gradient(90deg, #63d6ff, transparent)",
          borderRadius: "2px",
          marginBottom: "1.25rem",
        }}
      />

      {/* Description */}
      <motion.p
        custom={4}
        variants={fadeUp}
        style={{
          margin: "0 0 2rem",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.78rem",
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.4)",
          maxWidth: "340px",
        }}
      >
        This profile becomes the Super Admin for your organisation. You can
        appoint additional admins later from the Orchestrator.
      </motion.p>

      {/* Perks list */}
      <motion.div
        custom={5}
        variants={fadeUp}
        style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}
      >
        {perks.map((perk, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.5 + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}
          >
            <CheckCircle2
              size={13}
              style={{
                color: "#63d6ff",
                marginTop: "2px",
                flexShrink: 0,
                opacity: 0.75,
              }}
            />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.5,
              }}
            >
              {perk}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Vertical divider */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          right: 0,
          top: "10%",
          bottom: "10%",
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
          transformOrigin: "top",
        }}
      />
    </motion.div>
  );
}
