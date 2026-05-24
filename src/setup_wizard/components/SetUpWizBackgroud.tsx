// ─── Background (lighter version consistent with welcome page) ───────────────
import { motion } from "framer-motion";
export function Background() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Left glow */}
      <motion.div
        animate={{ opacity: [0.12, 0.2, 0.12], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-10%",
          left: "-15%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,214,255,0.18) 0%, transparent 70%)",
        }}
      />
      {/* Bottom right glow */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.12, 1] }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(120,80,255,0.15) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
