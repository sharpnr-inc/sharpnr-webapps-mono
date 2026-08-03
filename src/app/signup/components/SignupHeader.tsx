import { motion } from "framer-motion";

export function SignupHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-1"
    >
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-foreground/5">
          <img
            src="https://cdn.sharpnr.com/shicon.svg"
            alt=""
            className="h-5.5 w-5.5"
          />
        </div>
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Sharpnr Account
        </span>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight">
        Create your Sharpnr Account
      </h1>
      <p className="text-sm text-muted-foreground">
        Get started — it only takes a minute.
      </p>
    </motion.div>
  );
}
