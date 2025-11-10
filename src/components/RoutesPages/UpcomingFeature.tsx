"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";
import { motion } from "framer-motion";

export default function UpcomingFeature() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-lg backdrop-blur-md border border-muted-foreground/20 shadow-lg bg-background/60">
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
            {/* Animated Icon Section */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-full bg-primary/10 blur-md animate-pulse" />
              <div className="p-4 rounded-full bg-primary/10 relative z-10">
                <Wrench className="w-10 h-10 text-primary" />
              </div>
            </motion.div>

            {/* Text Section */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                We’re Working On It 🚧
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                This feature is currently under development. We’re crafting
                something exciting — stay tuned!
              </p>
            </div>

            {/* Optional Button */}
            <Button
              variant="outline"
              className="rounded-full mt-2"
              onClick={() => alert("Thanks for your interest! Coming soon!")}
            >
              Notify Me
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
