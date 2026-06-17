import { motion } from "framer-motion";
import { PulseDot } from "../components/Decor";
import { BRAND } from "../data/landing";

/** Status strip. Honest, non-metric: announces the alpha + a few capability tags. */
const TAGS = ["Service Control", "Health Monitoring", "Workflows", "Access Control", "Audit Logs"];

export function AlphaBar() {
  return (
    <motion.div
      className="border-b border-border/60 bg-muted/30 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-8 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <PulseDot status="nominal" />
          <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
            {BRAND.alpha}
          </span>
        </div>
        <div className="w-px h-4 bg-border shrink-0" />
        {TAGS.map((tag, i) => (
          <div key={tag} className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-muted-foreground tracking-wide">{tag}</span>
            {i < TAGS.length - 1 && <span className="text-border ml-2">·</span>}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
