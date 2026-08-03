import { motion, type Variants } from "framer-motion";

/** Staggered rise-in; `index` sets each field's place in the cascade. */
const fieldVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface AnimatedFieldProps {
  index: number;
  className?: string;
  children: React.ReactNode;
}

export function AnimatedField({
  index,
  className,
  children,
}: AnimatedFieldProps) {
  return (
    <motion.div
      custom={index}
      variants={fieldVariant}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}
