import Aurora from "@/components/ui/aurora-backgound";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const features = [
  "One identity for every SharpNR product",
  "Enterprise-grade security, on by default",
  "Single sign-on across your whole workspace",
];

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh w-full lg:grid-cols-[1.05fr_1fr]">
      {/* ── Left: brand panel ── */}
      <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-border/60 p-10 lg:flex xl:p-14">
        {/* Aurora glow */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Aurora
            colorStops={["#1e1b4b", "#5227FF", "#1e1b4b"]}
            amplitude={1.1}
            blend={0.6}
          />
        </div>
        {/* Legibility veil over the aurora */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-background via-background/45 to-background/10" />

        {/* Logo */}
        <motion.a
          href="https://sharpnr.com"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 flex w-fit items-center gap-2.5"
        >
          <img
            src="https://cdn.sharpnr.com/shicon.svg"
            alt="SharpNR"
            className="h-8 w-8 rounded-md"
          />
          <span className="text-2xl font-semibold tracking-tight">Sharpnr</span>
        </motion.a>

        {/* Tagline + value props */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="relative z-10 max-w-md"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            SharpNR Account
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight xl:text-4xl">
            One login for your entire workspace.
          </h2>
          <ul className="mt-8 space-y-3.5">
            {features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 text-sm text-foreground/70"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border bg-foreground/5">
                  <Check className="h-3 w-3 text-foreground/80" />
                </span>
                {f}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </aside>

      {/* ── Right: form surface ── */}
      <main className="relative flex flex-col bg-background">
        {/* Subtle top glow for depth */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent)]" />

        {/* Mobile brand header */}
        <div className="relative z-10 flex items-center gap-2 p-6 lg:hidden">
          <img
            src="https://cdn.sharpnr.com/shicon.svg"
            alt="SharpNR"
            className="h-7 w-7 rounded-md"
          />
          <span className="text-xl font-semibold tracking-tight">Sharpnr</span>
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center px-6 pb-12 lg:p-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </div>
  );
}
