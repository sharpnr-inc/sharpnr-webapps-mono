import { cn } from "@sharpnr/utils";
import { pwRules } from "./types";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

export function PasswordStrength({ password }: { password: string }) {
  const passed = pwRules.filter((r) => r.test(password)).length;
  const pct = (passed / pwRules.length) * 100;

  const color =
    passed <= 1
      ? "var(--destructive)"
      : passed === 2
        ? "var(--muted-foreground)"
        : passed === 3
          ? "color-mix(in oklch, var(--foreground) 60%, transparent)"
          : "var(--foreground)";

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-2 space-y-2 overflow-hidden"
    >
      {/* Bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          animate={{ width: `${pct}%`, backgroundColor: color }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full rounded-full"
        />
      </div>
      {/* Rules */}
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {pwRules.map((r) => {
          const ok = r.test(password);
          return (
            <div
              key={r.label}
              className={cn(
                "flex items-center gap-1 text-[11px] transition-colors duration-300",
                ok ? "text-foreground/70" : "text-muted-foreground/50",
              )}
            >
              {ok ? (
                <CheckCircle2 className="h-3 w-3 text-foreground/60" />
              ) : (
                <Circle className="h-3 w-3" />
              )}
              {r.label}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
