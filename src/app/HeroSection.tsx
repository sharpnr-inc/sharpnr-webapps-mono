import { useRef } from "react";
import { motion } from "framer-motion";
import BlurText from "@/components/ui/BlurTextCom";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  return (
    <section
      ref={heroRef}
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 h-screen"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.2em]">
              sharpnr-engine V1.0 Live
            </span>
          </div>

          <BlurText
            text="One Platform. Every Business."
            className="text-6xl lg:text-8xl mb-8 leading-[1.1]"
            animateBy="words"
          />

          <p className="text-xl lg:text-2xl text-slate-400 font-sans leading-relaxed mb-12 max-w-2xl">
            Deeply integrated operations for organizations that refuse to stitch
            together disconnected tools.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
