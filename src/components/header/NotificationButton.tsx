import React from "react";
import { motion } from "framer-motion";
import { Button } from "@sharpnr/ui";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";

export function NotificationBell({ onClick }: { onClick: () => void }) {
  const [pulse, setPulse] = React.useState(false);

  // Subtle ping every 8s to draw attention
  React.useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "relative h-9 w-9 rounded-xl",
          "border border-transparent",
          "hover:border-border/60 hover:bg-accent/70",
          "transition-colors duration-200",
        )}
        onClick={onClick}
        aria-label="Open notifications"
      >
        <motion.div
          animate={pulse ? { rotate: [0, -18, 18, -12, 12, 0] } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Bell className="h-4.25 w-4.25" />
        </motion.div>

        {/* Badge dot */}
        <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      </Button>
    </motion.div>
  );
}
