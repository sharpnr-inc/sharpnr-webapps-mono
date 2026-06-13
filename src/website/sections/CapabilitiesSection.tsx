import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CornerBrackets } from "../components/Decor";
import { Icon } from "../components/icons";
import { CAPABILITIES, CAPABILITY_LIST, type Capability } from "../data/landing";

/* ------------------------------- Capability card ------------------------------ */

function CapabilityCard({ capability, index }: { capability: Capability; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
    >
      <div className="relative border border-border bg-card/50 backdrop-blur-sm p-5 overflow-hidden transition-all duration-300 group-hover:border-primary/40">
        <CornerBrackets />

        {/* Hover glow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklch,var(--color-primary)_7%,transparent),transparent_70%)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        <div className="relative flex items-center gap-2.5 mb-4">
          <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
            {capability.icon}
          </div>
          <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
            {capability.sub}
          </p>
        </div>

        <h3 className="relative font-semibold text-foreground text-sm tracking-tight mb-2">
          {capability.label}
        </h3>
        <p className="relative text-muted-foreground text-sm leading-relaxed">{capability.body}</p>

        {/* Bottom bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-primary"
          initial={{ width: "0%" }}
          animate={hovered ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

/* --------------------------------- Section ---------------------------------- */

export function CapabilitiesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
          Capabilities
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Command the whole platform
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CAPABILITIES.map((c, i) => (
          <CapabilityCard key={c.id} capability={c} index={i} />
        ))}
      </div>

      {/* Full capability set */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4">
          Full administrative capability set
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {CAPABILITY_LIST.map((item) => (
            <div
              key={item}
              className="bg-background px-4 py-3 flex items-center gap-2.5 group hover:bg-muted/40 transition-colors"
            >
              <span className="text-muted-foreground/60 group-hover:text-primary transition-colors">
                {Icon.arrowRight}
              </span>
              <span className="text-xs font-mono text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
