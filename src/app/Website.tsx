import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurText from "@/components/ui/BlurTextCom";
import { DeepConnectivitySection } from "./DeepconectivitySection";
import { ProductsSection } from "./ProductCard";

gsap.registerPlugin(ScrollTrigger);

export function Website() {
  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".product-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".section-title", {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 85%",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden"
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
              Deeply integrated operations for organizations that refuse to
              stitch together disconnected tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-slate-950/50 border-y border-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-1px bg-slate-900 border border-slate-900">
            <div className="p-12 bg-slate-950">
              <div className="font-mono text-[10px] text-blue-500 mb-6 uppercase tracking-widest">
                01 / Architecture
              </div>
              <h3 className="text-2xl font-serif text-slate-50 mb-4">
                Unified Data Layer
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                All apps share a common data backbone. No duplicate entries, no
                sync errors, just pure synchronization.
              </p>
            </div>
            <div className="p-12 bg-slate-950">
              <div className="font-mono text-[10px] text-purple-500 mb-6 uppercase tracking-widest">
                02 / Security
              </div>
              <h3 className="text-2xl font-serif text-slate-50 mb-4">
                Single Identity
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                SharpIAM governs access across the entire platform. One login,
                one permission model, zero friction.
              </p>
            </div>
            <div className="p-12 bg-slate-950">
              <div className="font-mono text-[10px] text-emerald-500 mb-6 uppercase tracking-widest">
                03 / Control
              </div>
              <h3 className="text-2xl font-serif text-slate-50 mb-4">
                Operator-First
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Built for teams who want control. Orchestrator HQ gives you a
                single command plane for everything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <ProductsSection />

      <DeepConnectivitySection />

      {/* CTA Section */}
      <section className="py-40 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="relative border border-slate-800 p-12 lg:p-24 text-center overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3b82f6_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl lg:text-7xl mb-8 leading-tight">
                Ready to command?
              </h2>
              <p className="text-xl text-slate-400 mb-12 font-sans">
                Deploy the Sharpnr Protocol across your organization today. One
                vendor, one contract, one support line.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="w-full sm:w-auto px-12 py-5 bg-slate-50 text-slate-950 font-mono font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                  GET STARTED NOW
                  <ChevronRight size={20} />
                </button>
                <button className="w-full sm:w-auto px-12 py-5 border border-slate-700 text-slate-50 font-mono hover:bg-slate-900 transition-all">
                  BOOK A DEMO
                </button>
              </div>
            </div>

            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-slate-700" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-slate-700" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-slate-700" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-slate-700" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
