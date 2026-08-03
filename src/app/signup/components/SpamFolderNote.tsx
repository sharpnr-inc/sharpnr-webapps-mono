import { Info } from "lucide-react";
import { motion } from "framer-motion";

export function SpamFolderNote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.4 }}
    >
      <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 px-3.5 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Can&apos;t find the email? Please check your spam or junk folder. The
          code is sent from{" "}
          <span className="font-medium text-foreground">
            verifications@sharpnr.com
          </span>
          &nbsp;— adding it to your contacts helps future emails reach your
          inbox.
        </p>
      </div>
    </motion.div>
  );
}
