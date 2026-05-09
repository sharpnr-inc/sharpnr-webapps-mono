import { useRef } from "react";
import { useStore } from "@tanstack/react-form";
import { useFormContext } from "./form-context";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Loader2, MoveRight } from "lucide-react";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const SubmitButton = ({ children, className }: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  const disabled = isSubmitting || !canSubmit;

  // ── Refs for GSAP targets ─────────────────────────────────────────────────
  const btnRef = useRef<HTMLButtonElement>(null);
  const glintRef = useRef<HTMLSpanElement>(null);

  // ── GSAP magnetic glint on hover ──────────────────────────────────────────
  function handleMouseEnter() {
    if (disabled) return;
    gsap.fromTo(
      glintRef.current,
      { x: "-110%", skewX: -18, opacity: 0.55 },
      { x: "110%", skewX: -18, opacity: 0, duration: 0.55, ease: "power2.out" },
    );
  }

  // ── GSAP elastic snap on click ────────────────────────────────────────────
  function handleClick() {
    if (disabled) return;
    gsap.fromTo(
      btnRef.current,
      { scale: 0.96 },
      { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" },
    );
  }

  return (
    <motion.button
      ref={btnRef}
      type="submit"
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      whileHover={disabled ? {} : { y: -1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(className)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        overflow: "hidden",
        padding: "0.75rem 2rem",
        borderRadius: "8px",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.75rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
        border: `1px solid ${
          disabled ? "rgba(255,255,255,0.06)" : "rgba(99,214,255,0.35)"
        }`,
        background: disabled
          ? "rgba(255,255,255,0.03)"
          : "rgba(99,214,255,0.08)",
        color: disabled ? "rgba(255,255,255,0.25)" : "rgba(99,214,255,0.9)",
        transition:
          "border-color 0.25s, background 0.25s, color 0.25s, box-shadow 0.25s",
        boxShadow: disabled ? "none" : "0 0 20px rgba(99,214,255,0.06)",
      }}
    >
      {/* GSAP glint sweep */}
      <span
        ref={glintRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, transparent 40%, rgba(99,214,255,0.18) 50%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
          transform: "translateX(-110%)",
        }}
      />

      {/* Framer — content swap: spinner ↔ label+arrow */}
      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.span
            key="submitting"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ display: "flex" }}
            >
              <Loader2 size={13} />
            </motion.span>
            Processing…
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {children}
            {!disabled && (
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ display: "flex" }}
              >
                <MoveRight size={13} />
              </motion.span>
            )}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Framer — focus ring pulse */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.85 }}
        whileFocus={{ opacity: 1, scale: 1 }}
        style={{
          position: "absolute",
          inset: "-3px",
          borderRadius: "10px",
          border: "1px solid rgba(99,214,255,0.4)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </motion.button>
  );
};

export default SubmitButton;
