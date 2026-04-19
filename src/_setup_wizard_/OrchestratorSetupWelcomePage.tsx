// *This is landing page for the New organization
import { motion, type Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

// A more reusable component for word-by-word animation
const AnimatedWords = ({
  text,
  variants,
  stagger,
}: {
  text: string;
  variants: Variants;
  stagger: number;
}) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger },
    },
  };

  return (
    <motion.span variants={container} initial="hidden" animate="visible">
      {words.map((word, index) => (
        <motion.span
          variants={variants}
          key={index}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export function OrchestratorSetupWizardWelcomePage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 10, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", damping: 10, stiffness: 100 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-2xl overflow-hidden border-0">
        <motion.div
          className="p-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <CardHeader>
              <CardTitle className="text-4xl font-bold">
                <AnimatedWords
                  text="Welcome to Sharpnr!"
                  variants={wordVariants}
                  stagger={0.05}
                />
              </CardTitle>
              <CardDescription className="text-xl mt-4">
                We're so excited to have you. Let's get you set up.
              </CardDescription>
            </CardHeader>
          </motion.div>

          <motion.div variants={itemVariants}>
            <CardContent className="text-muted-foreground text-lg mt-6">
              <p>To begin, we need to configure the main Orchestrator.</p>
              <p className="mt-2">
                This is the core of your Sharpnr experience, allowing you to
                manage everything seamlessly.
              </p>
            </CardContent>
          </motion.div>

          <motion.div variants={itemVariants}>
            <CardFooter className="flex justify-center mt-8">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button size={"lg"} asChild className="text-lg px-10 py-4">
                  <Link to="/home">
                    Continue to Setup
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              </motion.div>
            </CardFooter>
          </motion.div>
        </motion.div>
      </Card>
    </div>
  );
}
