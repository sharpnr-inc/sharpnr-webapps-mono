import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection(): React.JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-center px-4">
      <BackgroundRippleEffect />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="max-w-4xl text-4xl font-bold text-neutral-800 md:text-5xl lg:text-7xl dark:text-neutral-100"
          variants={itemVariants}
        >
          The Ultimate CRM x ERP Platform
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300"
          variants={itemVariants}
        >
          Streamline your operations, boost productivity, and drive growth with a single, unified solution.
        </motion.p>

        <motion.div className="mt-8" variants={itemVariants}>
          <Button size="lg" className="bg-cyan-400 hover:bg-cyan-500 text-white shadow-lg">
            Get Started for Free
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

