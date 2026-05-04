import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Zap,
  LayoutDashboard,
  MessageSquare,
  FileText,
  HardDrive,
  ShoppingBag,
  Fingerprint,
  ChevronRight,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurText from "@/components/ui/BlurTextCom";
import { config } from "@/configs/env";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: "hr",
    name: "Sharp-HR",
    tagline: "Your people, fully managed.",
    icon: Users,
    color: "text-blue-400",
    description:
      "The people operations backbone. Payroll, recruitment, and lifecycle management in one place.",
    link: config.hrAppUrl,
  },
  {
    id: "marketing",
    name: "Sharp-Marketing",
    tagline: "Campaigns that connect.",
    icon: BarChart3,
    color: "text-pink-400",
    description:
      "Growth engine for modern teams. Multi-channel campaigns and CRM that actually works.",
    link: config.marketingAppUrl,
  },
  {
    id: "accounting",
    name: "Sharp-Accounting",
    tagline: "The numbers, always right.",
    icon: Zap,
    color: "text-emerald-400",
    description:
      "Financial operating system. Bookkeeping, invoicing, and real-time reporting.",
    link: config.accountingAppUrl,
  },
  {
    id: "orchestrator",
    name: "Sharp-Orchestrator",
    tagline: "Command everything.",
    icon: LayoutDashboard,
    color: "text-violet-400",
    description:
      "The mission control room. Monitor, configure, and govern your entire fleet of apps.",
    link: config.orchestratorAppUrl,
  },
  {
    id: "cable",
    name: "Sharp-Cable",
    tagline: "Your team, always connected.",
    icon: MessageSquare,
    color: "text-orange-400",
    description:
      "Real-time communication layer. Deeply wired into your HR and project data.",
    link: config.cablesAppUrl,
  },
  {
    id: "folio",
    name: "Sharp-Folio",
    tagline: "Write together. Think together.",
    icon: FileText,
    color: "text-cyan-400",
    description:
      "Collaborative document editor with live data embeds from across the platform.",
    link: config.folioAppUrl,
  },
  {
    id: "silo",
    name: "Sharp-Silo",
    tagline: "Every file. Always there.",
    icon: HardDrive,
    color: "text-slate-400",
    description:
      "Secure, centralized file storage layer for the entire ecosystem.",
    link: config.siloAppUrl,
  },
  {
    id: "marketplace",
    name: "Sharp-Marketplace",
    tagline: "Extend Sharpnr. Your way.",
    icon: ShoppingBag,
    color: "text-yellow-400",
    description:
      "The ecosystem extension layer. Discover and install third-party integrations.",
    link: config.marketplaceAppUrl,
  },
  {
    id: "iam",
    name: "SharpIAM",
    tagline: "One identity. Every door.",
    icon: Fingerprint,
    color: "text-red-400",
    description:
      "Identity and access management backbone. Single sign-on for every product.",
    link: config.iamAppUrl,
  },
];

const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
  const Icon = product.icon;
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group p-6 border border-slate-900 bg-slate-950 hover:border-slate-700 transition-all cursor-pointer relative"
    >
      <div className="flex items-start justify-between mb-8">
        <div className={`p-3 bg-slate-900 rounded-sm ${product.color}`}>
          <Icon size={24} />
        </div>
        <div className="font-mono text-[10px] text-slate-600 tracking-tighter uppercase group-hover:text-slate-400">
          PROT.0{products.indexOf(product) + 1}
        </div>
      </div>
      <h3 className="text-lg font-serif text-slate-50 mb-1">{product.name}</h3>
      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
        {product.tagline}
      </p>
      <p className="text-sm text-slate-400 line-clamp-2 mb-6 font-sans">
        {product.description}
      </p>
      <div className="flex items-center gap-2 text-xs font-mono text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
        VIEW SPEC <ArrowRight size={12} />
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-800 group-hover:border-slate-500 transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-800 group-hover:border-slate-500 transition-colors" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-800 group-hover:border-slate-500 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-800 group-hover:border-slate-500 transition-colors" />
    </motion.div>
  );
};

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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.2em]">
                Protocol V1.0 Live
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

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-50 text-slate-950 font-mono font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group">
                DEPLOY SYSTEM
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 border border-slate-700 text-slate-50 font-mono hover:bg-slate-900 transition-all">
                READ DOCUMENTATION
              </button>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-2/3 opacity-20 pointer-events-none hidden lg:block">
          <div className="absolute inset-0 border-l border-t border-slate-500" />
          <div className="absolute top-10 right-10 w-40 h-40 border border-slate-500 rotate-45" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-slate-500 to-transparent" />
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
      <section id="products" ref={productsRef} className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="section-title text-4xl lg:text-6xl text-slate-50 mb-6">
                The Suite.
              </h2>
              <p className="text-lg text-slate-400 font-sans">
                Nine purpose-built products, one unified ecosystem. Use them
                standalone or experience the power of the complete platform.
              </p>
            </div>
            <div className="font-mono text-xs text-slate-600 uppercase tracking-widest">
              Total modules: 09 / Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => (window.location.href = product.link)}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Visual Section */}
      <section className="py-32 relative overflow-hidden bg-slate-950">
        <div className="container mx-auto px-6 text-center mb-20 relative z-10">
          <h2 className="text-4xl lg:text-6xl text-slate-50 mb-8">
            Deep Connectivity.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-sans">
            Data flows freely between products. When you hire in Sharp-HR,
            they're provisioned in SharpIAM and payroll flows to
            Sharp-Accounting automatically.
          </p>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex justify-center">
          {/* Abstract Visual representation of products connecting */}
          <div className="relative w-full max-w-4xl h-[400px] lg:h-[600px] border border-slate-900 bg-slate-950 flex items-center justify-center p-12">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--color-blue-500)_0,transparent_70%)]" />

            <div className="relative grid grid-cols-3 gap-12 w-full">
              {products.slice(0, 9).map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative z-10 flex flex-col items-center group"
                >
                  <div
                    className={`p-4 bg-slate-900 border border-slate-800 transition-colors group-hover:border-slate-400 ${p.color}`}
                  >
                    <p.icon size={32} />
                  </div>
                  <span className="mt-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    {p.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Connecting Lines (Simulated with CSS) */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full stroke-slate-800" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  d="M 200 200 L 400 300 L 600 200"
                  strokeWidth="1"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  d="M 100 100 L 800 500"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.01)_50%,transparent_100%)] bg-[length:100%_4px] opacity-20" />
      </section>

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
