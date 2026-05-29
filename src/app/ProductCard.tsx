"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";

// ─── Types ────────────────────────────────────────────────────────────────────
type Product = (typeof products)[0];

// ─── Accent colors per product id ─────────────────────────────────────────────
const ACCENT: Record<string, string> = {
  hr: "#60a5fa", // blue-400
  marketing: "#f472b6", // pink-400
  accounting: "#34d399", // emerald-400
  orchestrator: "#a78bfa", // violet-400
  cable: "#fb923c", // orange-400
  folio: "#22d3ee", // cyan-400
  silo: "#94a3b8", // slate-400
  marketplace: "#facc15", // yellow-400
  iam: "#f87171", // red-400
};

// ─── Single Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: Product; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = product.icon;
  const accent = ACCENT[product.id] ?? "#94a3b8";

  // Magnetic tilt
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 260, damping: 28 };
  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [6, -6]),
    springCfg,
  );
  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-6, 6]),
    springCfg,
  );

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current!.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.07,
      }}
      onClick={() => (window.location.href = product.link)}
      className="group relative cursor-pointer select-none"
    >
      {/* Glow on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-none opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, transparent 70%)`,
        }}
      />

      {/* Main card surface */}
      <div
        className="relative flex h-full flex-col border border-slate-800/60 bg-slate-950 p-7
                   transition-colors duration-300 group-hover:border-slate-700/80"
      >
        {/* Animated top border line */}
        <motion.div
          className="absolute left-0 top-0 h-[1px] w-0 group-hover:w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ width: "100%" }}
          initial={{ width: 0 }}
        />

        {/* Corner brackets */}
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ].map((cls, i) => (
          <span
            key={i}
            className={`absolute h-3 w-3 ${cls} border-slate-700
                        transition-colors duration-300 group-hover:border-slate-400`}
            style={{ transitionDelay: `${i * 30}ms` }}
          />
        ))}

        {/* Header row */}
        <div className="mb-9 flex items-start justify-between">
          {/* Icon */}
          <motion.div
            className="relative flex h-11 w-11 items-center justify-center bg-slate-900"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Icon size={20} style={{ color: accent }} strokeWidth={1.5} />
            {/* icon glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `${accent}22`,
                boxShadow: `inset 0 0 12px ${accent}33`,
              }}
            />
          </motion.div>

          {/* Index badge */}
          <span
            className="font-mono text-[9px] tracking-[0.22em] text-slate-700 uppercase
                          transition-colors duration-300 group-hover:text-slate-500"
          >
            PROT.{String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Text */}
        <h3 className="mb-1 font-serif text-xl leading-tight text-slate-50 tracking-tight">
          {product.name}
        </h3>
        <p
          className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600
                      transition-colors duration-300 group-hover:text-slate-500"
        >
          {product.tagline}
        </p>
        <p
          className="mb-8 line-clamp-2 flex-1 font-sans text-[13px] leading-relaxed text-slate-500
                      transition-colors duration-300 group-hover:text-slate-400"
        >
          {product.description}
        </p>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em]"
          style={{ color: accent }}
          initial={{ opacity: 0, x: -6 }}
          whileHover={{ opacity: 1, x: 0 }}
          animate={{ opacity: 0 }}
          // override via group-hover via the wrapper below
        >
          <span
            className="opacity-0 transition-all duration-300 group-hover:opacity-100
                          -translate-x-2 group-hover:translate-x-0"
          >
            View Spec
          </span>
          <motion.span
            className="opacity-0 transition-all duration-300 group-hover:opacity-100
                       -translate-x-2 group-hover:translate-x-0"
            style={{ transitionDelay: "40ms" }}
          >
            <ArrowUpRight size={12} strokeWidth={1.5} />
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ProductsSection() {
  return (
    <section id="products" className="py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-slate-700" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">
                Product Suite
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="section-title mb-6 font-serif text-5xl leading-[0.92] text-slate-50 lg:text-7xl"
            >
              The Suite.
            </motion.h2>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="mb-6 h-px origin-left bg-gradient-to-r from-slate-700 via-slate-800 to-transparent"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-sans text-base leading-relaxed text-slate-400"
            >
              Nine purpose-built products, one unified ecosystem. Use them
              standalone or experience the power of the complete platform.
            </motion.p>
          </div>

          {/* Right meta */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-700"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
              style={{ boxShadow: "0 0 6px #10b981" }}
            />
            Total modules: 09 / Active
          </motion.div>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 gap-px bg-slate-800/30 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1200px" }}
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
