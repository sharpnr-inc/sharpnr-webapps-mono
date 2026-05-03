import { InitialSignupForm } from "./InitialSignupForm";
import { VerifyOtpForm } from "./VerifyOtpFrom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import gsap from "gsap";

// ─── Animated Right Panel ────────────────────────────────────────────────────

function AnimatedPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resolve shadcn CSS variables at runtime
    const style = getComputedStyle(document.documentElement);
    const fgRaw = style.getPropertyValue("--foreground").trim();

    // ── Helper to safely apply alpha to either OKLCH strings or raw HSL values
    const applyAlpha = (color: string, alpha: number) => {
      if (color.includes("(")) {
        // Appends the alpha channel in standard modern CSS color notation (e.g. oklch(... / alpha))
        return color.replace(/\)$/, ` / ${alpha})`);
      }
      // Fallback for older Tailwind HSL raw triplets (e.g. "210 40% 98%")
      return `hsla(${color}, ${alpha})`;
    };

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Orb data
    const orbs: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
    }[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 40 + Math.random() * 120,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: 0.03 + Math.random() * 0.07,
    }));

    // ── Grid nodes
    const COLS = 10,
      ROWS = 14;
    interface Node {
      x: number;
      y: number;
      pulse: number;
      speed: number;
    }
    const nodes: Node[] = [];
    for (let c = 0; c <= COLS; c++) {
      for (let r = 0; r <= ROWS; r++) {
        nodes.push({
          x: (c / COLS) * canvas.width,
          y: (r / ROWS) * canvas.height,
          pulse: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.02,
        });
      }
    }

    // ── Particles
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: 0.1 + Math.random() * 0.3,
      size: 1 + Math.random() * 2,
    }));

    let frame: number;
    let tick = 0;

    const draw = () => {
      tick++;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // ── Recalc node positions on resize
      nodes.forEach((n, i) => {
        const c = i % (COLS + 1);
        const r = Math.floor(i / (COLS + 1));
        n.x = (c / COLS) * W;
        n.y = (r / ROWS) * H;
      });

      // ── Grid lines
      ctx.lineWidth = 0.4;
      for (let c = 0; c <= COLS; c++) {
        for (let r = 0; r <= ROWS; r++) {
          const idx = r * (COLS + 1) + c;
          const n = nodes[idx];

          ctx.strokeStyle = applyAlpha(
            fgRaw,
            0.04 + 0.03 * Math.sin(n.pulse + tick * n.speed),
          );

          if (c < COLS) {
            const next = nodes[idx + 1];
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
          }
          if (r < ROWS) {
            const next = nodes[idx + COLS + 1];
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
          }
        }
      }

      // ── Node dots
      nodes.forEach((n) => {
        n.pulse += n.speed;
        const a = 0.08 + 0.1 * Math.abs(Math.sin(n.pulse));
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = applyAlpha(fgRaw, a);
        ctx.fill();
      });

      // ── Floating orbs
      orbs.forEach((o) => {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.r) o.x = W + o.r;
        if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r;
        if (o.y > H + o.r) o.y = -o.r;

        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grad.addColorStop(0, applyAlpha(fgRaw, o.alpha));
        grad.addColorStop(1, applyAlpha(fgRaw, 0));
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // ── Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = applyAlpha(fgRaw, p.alpha * 0.5);
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    draw();

    // ── GSAP: animate floating badge elements
    const gsapCtx = gsap.context(() => {
      gsap.to(".panel-badge", {
        y: -12,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.8, from: "random" },
      });
      gsap.fromTo(
        ".panel-headline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.4 },
      );
      gsap.fromTo(
        ".panel-badge",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: 0.15,
          delay: 0.9,
        },
      );
    }, containerRef);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      gsapCtx.revert();
    };
  }, []);

  const badges = [
    { label: "Bank-grade encryption", icon: "🔒", pos: "top-[18%] left-[10%]" },
    { label: "99.9% uptime", icon: "⚡", pos: "top-[38%] right-[8%]" },
    { label: "SOC 2 certified", icon: "✦", pos: "bottom-[28%] left-[8%]" },
    { label: "24/7 support", icon: "●", pos: "bottom-[14%] right-[12%]" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-muted"
    >
      {/* Canvas layer */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-background/40 via-transparent to-background/20" />

      {/* Center headline */}
      <div className="panel-headline absolute inset-0 flex flex-col items-center justify-center gap-4 px-10 text-center opacity-0">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/10 px-3 py-1 text-xs font-medium text-foreground/60 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-pulse" />
          Trusted by 10,000+ organizations
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground/90 leading-tight">
          Everything your team
          <br />
          needs, unified.
        </h2>
        <p className="max-w-xs text-sm text-foreground/50 leading-relaxed">
          A single platform to manage workflows, collaborate in real time, and
          scale without limits.
        </p>
      </div>

      {/* Floating badges */}
      {badges.map((b, i) => (
        <div
          key={i}
          className={`panel-badge absolute ${b.pos} opacity-0 flex items-center gap-2 rounded-xl border border-border/30 bg-background/10 px-3 py-2 text-xs text-foreground/60 backdrop-blur-md shadow-lg`}
        >
          <span className="text-base leading-none">{b.icon}</span>
          {b.label}
        </div>
      ))}

      {/* Corner decoration lines */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="0"
          x2="60"
          y2="0"
          stroke="hsl(var(--foreground))"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="60"
          stroke="hsl(var(--foreground))"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        <line
          x1="100%"
          y1="100%"
          x2="calc(100% - 60px)"
          y2="100%"
          stroke="hsl(var(--foreground))"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        <line
          x1="100%"
          y1="100%"
          x2="100%"
          y2="calc(100% - 60px)"
          stroke="hsl(var(--foreground))"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

// ─── Page variants ────────────────────────────────────────────────────────────

const formVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 40,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -30,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  }),
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export function InitialSignupPage() {
  const [showOtp, setShowOtp] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* ── Left: Form panel ── */}
      <div className="relative flex flex-col gap-4 overflow-hidden p-6 md:p-10">
        {/* Subtle background texture */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--muted)/0.4),transparent_60%)]" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex items-center gap-2"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7L6 11L12 3"
                stroke="hsl(var(--background))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground/80">
            Sharpnr
          </span>
        </motion.div>

        {/* Step indicator */}
        <motion.div
          className="relative flex items-center gap-2 self-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {["Account", "Verify"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{
                    backgroundColor:
                      (i === 0 && !showOtp) || (i === 1 && showOtp)
                        ? "hsl(var(--foreground))"
                        : i < (showOtp ? 1 : 0)
                          ? "hsl(var(--foreground)/0.4)"
                          : "hsl(var(--muted-foreground)/0.2)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-1.5 w-1.5 rounded-full"
                />
                <span
                  className={`text-xs transition-colors duration-300 ${
                    (i === 0 && !showOtp) || (i === 1 && showOtp)
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < 1 && <div className="h-px w-6 bg-border/60" />}
            </div>
          ))}
        </motion.div>

        {/* Form area */}
        <div className="relative flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait" custom={showOtp ? 1 : -1}>
            {!showOtp ? (
              <motion.div
                key="signup"
                custom={-1}
                variants={formVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-lg"
              >
                <InitialSignupForm
                  setShowOtp={setShowOtp}
                  setUserEmail={setUserEmail}
                />
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                custom={1}
                variants={formVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-sm"
              >
                <VerifyOtpForm setShowOtp={setShowOtp} email={userEmail} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative text-center text-[11px] text-muted-foreground/60"
        >
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Terms
          </a>{" "}
          &amp;{" "}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
        </motion.p>
      </div>

      {/* ── Right: Animated panel ── */}
      <div className="relative hidden lg:block">
        <AnimatedPanel />
      </div>
    </div>
  );
}
