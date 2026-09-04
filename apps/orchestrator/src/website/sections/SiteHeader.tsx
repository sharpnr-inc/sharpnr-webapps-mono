import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { config } from "@sharpnr/env";
import { usePublicCurrentUser } from "@/apis/Queries";
import { BRAND } from "../data/landing";

/** Fixed top navigation. Nav links are placeholders for now. */
export function SiteHeader() {
  const nav = useNavigate();

  // A failed probe just means signed out, so anything but data is anonymous.
  const { data, isPending } = usePublicCurrentUser();
  const user = data?.data;
  const displayName = user?.firstName ?? user?.email;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={BRAND.logo} alt="Orchestrator" className="w-7 h-7 dark:invert" />
          <div>
            <span className="font-bold text-sm tracking-tight text-foreground">{BRAND.name}</span>
            <span className="text-muted-foreground text-sm"> / {BRAND.product}</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {["Products", "Architecture", "Changelog", "Docs"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Held blank until the probe answers, so a signed-in visitor never
            sees the signed-out CTA flash before their own name replaces it. */}
        {isPending ? null : (
          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden sm:inline text-xs font-mono text-muted-foreground tracking-widest uppercase">
                {displayName}
              </span>
            )}
            <motion.button
              className="text-xs font-mono border border-border px-4 py-2 text-foreground hover:bg-muted transition-colors relative overflow-hidden group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (user) nav({ to: "/home" });
                // External app, so a full navigation rather than the router.
                else window.location.href = config.authAppUrl;
              }}
            >
              <span className="relative z-10">
                {user ? "CONTINUE TO CONSOLE →" : "LAUNCH CONSOLE →"}
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.header>
  );
}
