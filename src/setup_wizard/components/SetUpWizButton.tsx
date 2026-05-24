import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MoveRight } from "lucide-react";
import { useState } from "react";

// ─── Continue Button ──────────────────────────────────────────────────────────
export function ContinueButton({
  onClick,
  submitted,
}: {
  onClick: () => void;
  submitted: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.6rem",
        padding: "0.9rem 2rem",
        background: submitted
          ? "rgba(74,222,128,0.1)"
          : hovered
            ? "rgba(99,214,255,0.1)"
            : "rgba(255,255,255,0.04)",
        border: `1px solid ${
          submitted
            ? "rgba(74,222,128,0.4)"
            : hovered
              ? "rgba(99,214,255,0.45)"
              : "rgba(255,255,255,0.1)"
        }`,
        borderRadius: "8px",
        color: submitted
          ? "#4ade80"
          : hovered
            ? "#63d6ff"
            : "rgba(255,255,255,0.7)",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.75rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        cursor: "pointer",
        outline: "none",
        transition: "all 0.25s ease",
        boxShadow: hovered ? "0 0 24px rgba(99,214,255,0.08)" : "none",
      }}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.span
            key="done"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <CheckCircle2 size={14} />
            Saved — Continuing
          </motion.span>
        ) : (
          <motion.span
            key="cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            Save & Continue
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex" }}
            >
              <MoveRight size={14} />
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
