import { motion } from "framer-motion";
import { VALUE_PROPS } from "../data/landing";

export function WhySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
          Why Orchestrator
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Built for the whole stack
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-px bg-border">
        {VALUE_PROPS.map((f, i) => (
          <motion.div
            key={f.title}
            className="bg-background p-8 relative group"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="text-muted-foreground group-hover:text-primary transition-colors mb-4">
              {f.icon}
            </div>
            <h4 className="font-semibold text-foreground mb-2 text-sm">{f.title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
