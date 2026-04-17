import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium font-[Poppins] transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",

        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90",

        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",

        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",

        ghost: "hover:bg-accent hover:text-accent-foreground",

        link: "text-primary underline-offset-4 hover:underline",

        sharpnr:
          "relative overflow-hidden text-white bg-gradient-to-r from-[#0B1F3A] via-[#102A4C] to-[#0B1F3A] shadow-md hover:shadow-lg before:absolute before:inset-0 before:bg-white/10 before:opacity-0 before:transition-opacity hover:before:opacity-100 focus-visible:ring-[#1E3A8A]/40",

        sharpnrSecondary:
          "border border-[#102A4C] text-[#102A4C] hover:bg-[#102A4C]/10",

        sharpnrGhost: "text-[#102A4C] hover:bg-[#102A4C]/10",

        sharpnrDanger:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500/30",
      },

      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",

        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",

        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",

        icon: "size-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const isSharpnrVariant = variant?.startsWith("sharpnr");

  const Comp = asChild ? Slot : "button";

  const content = (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  );

  if (!isSharpnrVariant || asChild) return content;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="inline-block"
    >
      {content}
    </motion.div>
  );
}

export { Button, buttonVariants };
