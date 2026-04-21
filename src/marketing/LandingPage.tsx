import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Hash,
  Zap,
  Shield,
  Layers,
  Command,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-zinc-800 selection:text-zinc-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold tracking-tighter">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-foreground text-background">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="text-xl">Sharpnr Cables</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Infrastructure
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Docs
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm" className="rounded-full">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col items-center text-center space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="secondary"
                className="px-3 py-1 rounded-full border border-border"
              >
                v1.0.0-alpha is now live
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl"
            >
              The Orchestration of <br />
              <span className="text-muted-foreground">Human Connection.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-175 text-lg text-muted-foreground md:text-xl"
            >
              A high-bandwidth chat application bridging the gap between
              structured enterprise workspace and fluid community interaction.
              Built for speed, logic, and scale.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="h-12 px-8 text-base rounded-full">
                Download for Desktop <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base rounded-full"
              >
                Open in Browser
              </Button>
            </motion.div>

            {/* Product Mockup Animation */}
            <motion.div
              variants={fadeInUp}
              className="relative mt-16 w-full max-w-5xl overflow-hidden rounded-xl border border-border bg-zinc-950 p-2 shadow-2xl"
            >
              <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-zinc-700" />
                  <div className="h-3 w-3 rounded-full bg-zinc-700" />
                  <div className="h-3 w-3 rounded-full bg-zinc-700" />
                </div>
                <div className="mx-auto text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                  sharpnr-cables-terminal
                </div>
              </div>
              <div className="aspect-16/10 bg-zinc-950 flex">
                {/* Sidebar Mockup */}
                <div className="w-16 border-r border-zinc-900 flex flex-col items-center py-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800"
                    />
                  ))}
                </div>
                {/* Content Mockup */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="h-4 w-1/4 bg-zinc-900 rounded" />
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 bg-zinc-900/50 rounded" />
                    <div className="h-3 w-1/2 bg-zinc-900/50 rounded" />
                  </div>
                  <div className="mt-8 flex gap-4">
                    <div className="h-10 w-10 rounded bg-zinc-900" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-24 bg-zinc-800 rounded" />
                      <div className="h-3 w-full bg-zinc-900/50 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="border-t border-border bg-zinc-50/5 dark:bg-zinc-950/50 py-24">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Engineered for Momentum
              </h2>
              <p className="mt-4 text-muted-foreground">
                Everything you need from Slack, with the energy of Discord.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Hash className="w-5 h-5" />}
                title="Structured Channels"
                description="Organize conversations by topic, project, or department with granular permission controls."
              />
              <FeatureCard
                icon={<MessageSquare className="w-5 h-5" />}
                title="Threaded Clarity"
                description="Keep discussions focused with deep threading that doesn't clutter the main feed."
              />
              <FeatureCard
                icon={<Layers className="w-5 h-5" />}
                title="Multi-tenant Engines"
                description="Seamlessly switch between different organizations and communities in one unified UI."
              />
              <FeatureCard
                icon={<Command className="w-5 h-5" />}
                title="Power-user Driven"
                description="Keyboard-first navigation with a command palette designed for speed."
              />
              <FeatureCard
                icon={<Shield className="w-5 h-5" />}
                title="Secure Orchestration"
                description="Enterprise-grade encryption with a focus on data sovereignty and privacy."
              />
              <FeatureCard
                icon={<Zap className="w-5 h-5" />}
                title="Low Latency"
                description="A protocol built for real-time synchronization across all your modules."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="rounded-3xl border border-border bg-foreground p-12 text-center text-background">
            <h2 className="text-4xl font-bold tracking-tight">
              Ready to plug in?
            </h2>
            <p className="mt-4 text-zinc-400 max-w-lg mx-auto">
              Join the alpha and help us build the future of technical
              communication.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" variant="secondary" className="rounded-full">
                Create Workspace
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-background border-zinc-700 hover:bg-zinc-800 rounded-full"
              ></Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground font-mono">
            © 2026 SHARPNR ORCHESTRATION ENGINE
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Security
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-background border-border hover:border-zinc-500 transition-colors duration-300">
      <CardContent className="pt-6">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-border">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
