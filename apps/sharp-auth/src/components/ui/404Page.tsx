import { motion } from "framer-motion";
import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft } from "lucide-react";

const PARTICLES = [
  { top: "15%", left: "12%", delay: 0 },
  { top: "22%", left: "78%", delay: 1.2 },
  { top: "68%", left: "8%", delay: 2.1 },
  { top: "75%", left: "88%", delay: 0.5 },
  { top: "42%", left: "92%", delay: 3 },
  { top: "85%", left: "45%", delay: 1.8 },
  { top: "10%", left: "55%", delay: 0.9 },
  { top: "55%", left: "4%", delay: 2.5 },
];

function GlitchNumber() {
  return (
    <motion.div
      className="relative leading-none select-none"
      animate={{ y: [0, -18, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6,
      }}
    >
      {/* Ghost fill */}
      <span className="text-[clamp(96px,20vw,160px)] font-black tracking-[-0.06em] text-foreground opacity-[0.06]">
        404
      </span>
      {/* Outline layer */}
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="absolute inset-0 text-[clamp(96px,20vw,160px)] font-black tracking-[-0.06em] text-transparent"
        style={{ WebkitTextStroke: "1px var(--border)" }}
      >
        404
      </motion.span>
      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-border to-transparent"
        animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  );
}

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Grid background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(color-mix(in oklch, var(--border) 15%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in oklch, var(--border) 15%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />
      {/* Vignette over grid */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, var(--background) 100%)",
        }}
      />

      {/* Concentric ring orbs */}
      {[400, 260, 160].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border border-border/20"
          style={{ width: size, height: size }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute h-0.75 w-0.75 rounded-full bg-muted-foreground"
          style={{ top: p.top, left: p.left }}
          animate={{
            x: [0, 6, -4, 0],
            y: [0, -8, 5, 0],
            rotate: [0, 120, 240, 360],
            opacity: [0.06, 0.14, 0.08, 0.06],
          }}
          transition={{
            duration: 9 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/60 px-3 py-1"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Error 404
          </span>
        </motion.div>

        <GlitchNumber />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="-mt-2 space-y-2"
        >
          <h1 className="text-[clamp(18px,4vw,26px)] font-medium tracking-tight">
            You've drifted off course
          </h1>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
            This route doesn't exist or has been moved to another station. Check
            the URL or head back to safety.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            variant="outline"
            className="h-10 px-5 text-sm"
            onClick={() => router.history.back()}
          >
            <ChevronLeft className="mr-1.5 h-3.5 w-3.5" />
            Go back
          </Button>
          <Button asChild className="h-10 px-6 text-sm font-medium">
            <Link to="/">
              <Home className="mr-1.5 h-3.5 w-3.5" />
              Return to dashboard
            </Link>
          </Button>
        </motion.div>

        {/* Code hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 rounded-md border border-border/30 bg-muted/40 px-4 py-2.5 font-mono text-[11px] tracking-wide text-muted-foreground"
        >
          <span className="text-foreground/60">GET</span> /undefined —{" "}
          <span className="text-foreground/60">404</span> Not Found
        </motion.div>
      </div>
    </div>
  );
}
