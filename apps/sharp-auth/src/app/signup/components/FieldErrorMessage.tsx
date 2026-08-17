import { FieldError } from "@/components/ui/field";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Animated slot for a single validation message. Renders nothing when there's
 * no error, so callers can drop it under any field unconditionally.
 */
export function FieldErrorMessage({ message }: { message?: string }) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          role="alert"
        >
          <FieldError>{message}</FieldError>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
