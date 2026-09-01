import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { useIva } from "./iva-context";

export interface IvaLauncherProps {
  className?: string;
}

/**
 * The floating action button. Exported on its own so an app can drop it
 * somewhere else (a header slot, a sidebar) instead of the default corner --
 * pass `launcher={false}` to IvaProvider and render this where you want it.
 */
export function IvaLauncher({ className }: IvaLauncherProps) {
  const { open, toggle, unread, assistantName } = useIva();

  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className={cn("relative", className)}
    >
      <Button
        type="button"
        size="icon"
        onClick={toggle}
        aria-label={open ? `Close ${assistantName}` : `Open ${assistantName}`}
        aria-expanded={open}
        className="h-12 w-12 rounded-full shadow-lg"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </Button>

      {!open && unread > 0 ? (
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">
          {unread > 9 ? "9+" : unread}
        </span>
      ) : null}
    </motion.div>
  );
}
