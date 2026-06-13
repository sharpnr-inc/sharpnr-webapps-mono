import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

export function CTASection() {
  const nav = useNavigate();

  return (
    <section className="border-t border-border">
      <motion.div
        className="max-w-7xl mx-auto px-6 py-24 text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 50% 100%, color-mix(in oklch, var(--color-primary) 6%, transparent), transparent)",
          }}
        />
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4">
          Your command centre
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
          Command everything.
          <br />
          From one place.
        </h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">
          Orchestrator is the administrative layer of the Sharpnr Platform — every app,
          service, and team under your control.
        </p>
        <motion.button
          className="relative border border-primary/60 bg-primary/10 text-primary font-mono text-xs px-8 py-4 tracking-widest uppercase"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => nav({ to: "/home" })}
        >
          Enter Control Panel →
        </motion.button>
      </motion.div>
    </section>
  );
}
