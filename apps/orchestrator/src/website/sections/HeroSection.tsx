import { motion, type MotionValue } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { GridBackground, OrbitRing } from "../components/Decor";
import { BRAND } from "../data/landing";

interface HeroSectionProps {
  y: MotionValue<number>;
  opacity: MotionValue<number>;
}

export function HeroSection({ y, opacity }: HeroSectionProps) {
  const nav = useNavigate();

  return (
    <motion.section
      style={{ y, opacity }}
      className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden"
    >
      <GridBackground />

      {/* Radial gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, color-mix(in oklch, var(--color-primary) 6%, transparent), transparent)",
        }}
      />

      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <OrbitRing radius={120} duration={22} />
        <OrbitRing radius={180} duration={34} offset={1} />
        <OrbitRing radius={240} duration={52} offset={2} />
      </div>

      {/* Center logo */}
      <motion.div
        className="relative mb-12 flex items-center justify-center w-28 h-28 md:w-32 md:h-32"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-primary/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 rounded-full border border-primary/10"
        />
        <img
          src={BRAND.logo}
          alt="Orchestrator"
          className="w-16 h-16 md:w-20 md:h-20 dark:invert"
        />
      </motion.div>

      {/* Headline */}
      <div className="relative text-center px-6 max-w-3xl">
        <motion.p
          className="text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Sharpnr Platform · Command Centre
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          The Orchestrator
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          The administrative layer of the Sharpnr Platform — one command plane to control,
          configure, and orchestrate every app, service, and team in your organization.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <motion.button
            className="relative border border-primary/60 bg-primary/10 text-primary font-mono text-xs px-6 py-3 tracking-widest uppercase overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => nav({ to: "/home" })}
          >
            <span className="relative">Enter Control Panel</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll nudge */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-xs font-mono text-muted-foreground/50 tracking-widest">SCROLL</span>
        <motion.div
          className="w-px h-8 bg-border"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.section>
  );
}
