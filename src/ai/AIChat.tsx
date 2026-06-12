"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { askAI } from "@/ai/ai";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Quiz Steps ───────────────────────────────────────────────────────────────
interface Step {
  id: string;
  question: string;
  subtext?: string;
  options: { label: string; icon: string; value: string }[];
}

const STEPS: Step[] = [
  {
    id: "role",
    question: "What describes you best?",
    subtext: "So I can speak your language",
    options: [
      { label: "Founder / CEO", icon: "⚡", value: "a founder or CEO" },
      { label: "Operations Lead", icon: "⚙️", value: "an operations lead" },
      {
        label: "Product / Tech",
        icon: "🛠",
        value: "a product or tech person",
      },
      {
        label: "Sales / Marketing",
        icon: "📈",
        value: "someone in sales or marketing",
      },
    ],
  },
  {
    id: "problem",
    question: "What's your biggest pain right now?",
    subtext: "Pick the one that keeps you up at night",
    options: [
      {
        label: "Too many disconnected tools",
        icon: "🔗",
        value: "too many disconnected tools",
      },
      {
        label: "Manual, repetitive work",
        icon: "🔁",
        value: "manual repetitive work",
      },
      {
        label: "No visibility across teams",
        icon: "👁",
        value: "no visibility across teams",
      },
      {
        label: "Scaling operations is hard",
        icon: "📦",
        value: "scaling operations",
      },
    ],
  },
  {
    id: "size",
    question: "How big is your team?",
    subtext: "Helps me recommend the right fit",
    options: [
      { label: "Just me", icon: "🙋", value: "a solo operator" },
      { label: "2 – 10 people", icon: "👥", value: "a small team of 2–10" },
      { label: "11 – 50 people", icon: "🏢", value: "a growing team of 11–50" },
      { label: "50+ people", icon: "🏗", value: "a larger org of 50+" },
    ],
  },
];

// ─── Thinking Dots ────────────────────────────────────────────────────────────
function ThinkingDots() {
  return (
    <div className="flex items-center gap-[5px] py-1 px-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[6px] h-[6px] rounded-full bg-indigo-400/80"
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.1, 0.8] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-bold select-none
        ${
          isUser
            ? "bg-slate-800 border border-white/[0.08] text-slate-400"
            : "bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25"
        }`}
      >
        {isUser ? (
          "U"
        ) : (
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1.5C4 1.5 2 3.5 2 6c0 1.3.5 2.4 1.3 3.2L3 11l1.8-.8A5 5 0 0 0 7 10.5C10 10.5 12 8.5 12 6s-2-4.5-5-4.5Z"
              fill="white"
            />
          </svg>
        )}
      </div>
      <div
        className={`relative max-w-[75%] px-4 py-3 rounded-2xl text-[13.5px] leading-[1.65]
        ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-[4px] shadow-lg shadow-indigo-500/10"
            : "bg-white/[0.05] border border-white/[0.07] text-slate-200 rounded-bl-[4px]"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
        <span
          className={`block mt-1.5 text-[10px] select-none
          ${isUser ? "text-indigo-300/50 text-right" : "text-slate-700"}`}
        >
          {msg.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Step Progress Bar ────────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="h-[3px] rounded-full overflow-hidden bg-white/[0.07]"
          style={{ flex: 1 }}
        >
          <motion.div
            className="h-full bg-indigo-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: i < current ? "100%" : i === current ? "60%" : "0%",
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Quiz Panel (right side of hero) ─────────────────────────────────────────
export function AIQualifierPanel({
  onOpen,
}: {
  onOpen: (context: string) => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  // 3D tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 7;
    gsap.to(el, {
      rotateY: x,
      rotateX: -y,
      duration: 0.45,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.35)",
    });
  };

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (!selected) return;
    const next = [...answers, selected];
    setAnswers(next);
    setSelected(null);

    if (isLast) {
      setDone(true);
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handleLaunch = () => {
    const [role, problem, size] = answers;
    const ctx = `I'm ${role}, working with ${size}. My biggest challenge is ${problem}. Based on this, does Sharpnr solve my problem?`;
    onOpen(ctx);
  };

  const handleReset = () => {
    setStepIndex(0);
    setAnswers([]);
    setSelected(null);
    setDone(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className="relative w-full max-w-[400px]"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Card */}
      <div
        className="relative rounded-2xl border border-white/[0.08] overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(15,17,32,0.95) 0%, rgba(10,11,22,0.98) 100%)",
          backdropFilter: "blur(32px)",
        }}
      >
        {/* Subtle top edge highlight */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        {/* Card inner */}
        <div className="px-6 pt-6 pb-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/25">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1.5C4 1.5 2 3.5 2 6c0 1.3.5 2.4 1.3 3.2L3 11l1.8-.8A5 5 0 0 0 7 10.5C10 10.5 12 8.5 12 6s-2-4.5-5-4.5Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white leading-none mb-0.5">
                Sharpnr AI
              </p>
              <p className="text-[10px] text-slate-600">
                Let's see if we're a fit
              </p>
            </div>
            {!done && (
              <div className="ml-auto text-[10px] font-mono text-slate-700">
                {stepIndex + 1}/{STEPS.length}
              </div>
            )}
          </div>

          {/* Progress */}
          {!done && (
            <div className="mb-5">
              <ProgressBar current={stepIndex} total={STEPS.length} />
            </div>
          )}

          <AnimatePresence mode="wait">
            {!done ? (
              /* ── Question step ── */
              <motion.div
                key={`step-${stepIndex}`}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Question */}
                <div className="mb-4">
                  <h3 className="text-[15px] font-bold text-white leading-snug mb-1">
                    {step.question}
                  </h3>
                  {step.subtext && (
                    <p className="text-[11px] text-slate-600">{step.subtext}</p>
                  )}
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {step.options.map((opt) => {
                    const isSelected = selected === opt.value;
                    return (
                      <motion.button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        whileTap={{ scale: 0.96 }}
                        className={`relative text-left px-3 py-3 rounded-xl border text-[12px] font-medium transition-all duration-200 group
                          ${
                            isSelected
                              ? "bg-indigo-600/20 border-indigo-500/50 text-white shadow-[0_0_16px_-4px_rgba(99,102,241,0.35)]"
                              : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.05] hover:border-white/[0.12] hover:text-slate-200"
                          }`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="option-bg"
                            className="absolute inset-0 rounded-xl bg-indigo-500/10"
                            transition={{ duration: 0.2 }}
                          />
                        )}
                        <span className="relative block text-base mb-1">
                          {opt.icon}
                        </span>
                        <span className="relative block leading-snug">
                          {opt.label}
                        </span>
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center"
                          >
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 8 8"
                              fill="none"
                            >
                              <path
                                d="M1.5 4l2 2 3-3"
                                stroke="white"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Next button */}
                <motion.button
                  onClick={handleNext}
                  disabled={!selected}
                  whileHover={selected ? { scale: 1.02 } : {}}
                  whileTap={selected ? { scale: 0.97 } : {}}
                  className={`w-full py-3 rounded-xl text-[13px] font-semibold transition-all duration-200
                    ${
                      selected
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                        : "bg-white/[0.03] text-slate-700 border border-white/[0.05] cursor-not-allowed"
                    }`}
                >
                  {isLast ? "See my results →" : "Continue →"}
                </motion.button>
              </motion.div>
            ) : (
              /* ── Done state ── */
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                {/* Result badge */}
                <div className="relative mb-4 mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 border border-emerald-500/20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 blur-lg" />
                  <span className="relative text-2xl">✅</span>
                </div>

                <h3 className="text-[15px] font-bold text-white mb-1.5">
                  Sharpnr can help.
                </h3>
                <p className="text-[12px] text-slate-500 leading-relaxed mb-5 max-w-[260px] mx-auto">
                  Based on your answers, our AI will show you exactly how
                  Sharpnr solves your specific challenges.
                </p>

                {/* Summary chips */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                  {answers.map((a, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium capitalize"
                    >
                      {a.replace("a ", "").replace("an ", "")}
                    </span>
                  ))}
                </div>

                {/* Launch */}
                <motion.button
                  onClick={handleLaunch}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-bold
                    shadow-xl shadow-indigo-500/25 transition-colors mb-2"
                >
                  Talk to Sharpnr AI →
                </motion.button>

                <button
                  onClick={handleReset}
                  className="text-[11px] text-slate-700 hover:text-slate-500 transition-colors"
                >
                  Start over
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom edge shimmer */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>
    </div>
  );
}

// ─── Full Screen Glass Overlay Chat ──────────────────────────────────────────
export function AIChatOverlay({
  isOpen,
  onClose,
  initialContext,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasSentContext = useRef(false);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  // On open: focus + fire the context message automatically
  useEffect(() => {
    if (isOpen) {
      hasSentContext.current = false;
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && initialContext && !hasSentContext.current) {
      hasSentContext.current = true;
      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content: initialContext,
        timestamp: new Date(),
      };
      setMessages([userMsg]);
      setLoading(true);
      askAI(initialContext)
        .then((reply) => {
          setMessages((p) => [
            ...p,
            {
              id: generateId(),
              role: "assistant",
              content: reply,
              timestamp: new Date(),
            },
          ]);
          setLoading(false);
        })
        .catch(() => {
          setMessages((p) => [
            ...p,
            {
              id: generateId(),
              role: "assistant",
              content: "Something went wrong. Please try again.",
              timestamp: new Date(),
            },
          ]);
          setLoading(false);
        });
    }
  }, [isOpen, initialContext]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInput("");
      setLoading(false);
    }
  }, [isOpen]);

  // ESC
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const send = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    const userMsg: Message = {
      id: generateId(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const reply = await askAI(trimmed);
      setMessages((p) => [
        ...p,
        {
          id: generateId(),
          role: "assistant",
          content: reply,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((p) => [
        ...p,
        {
          id: generateId(),
          role: "assistant",
          content: "Something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [input, loading]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-[10px]"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="
              fixed z-50
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[min(780px,95vw)] h-[min(700px,90vh)]
              flex flex-col rounded-3xl overflow-hidden
              border border-white/[0.09]
              shadow-[0_0_100px_-15px_rgba(79,70,229,0.35),0_50px_100px_-25px_rgba(0,0,0,0.85)]
            "
            style={{
              background:
                "linear-gradient(150deg, rgba(12,14,28,0.98) 0%, rgba(9,10,20,0.99) 100%)",
              backdropFilter: "blur(48px) saturate(180%)",
            }}
          >
            {/* Noise texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025] rounded-3xl"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
            {/* Glow accents */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-violet-500/8 blur-3xl" />
            {/* Top edge highlight */}
            <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="shrink-0 flex items-center gap-4 px-7 py-5 border-b border-white/[0.055]">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1.5C4 1.5 2 3.5 2 6c0 1.3.5 2.4 1.3 3.2L3 11l1.8-.8A5 5 0 0 0 7 10.5C10 10.5 12 8.5 12 6s-2-4.5-5-4.5Z"
                    fill="white"
                  />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0c0e1c]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-[15px] font-bold text-white tracking-tight">
                    Sharpnr AI
                  </h2>
                  <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded-full">
                    V1.0
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Powered by DeepSeek
                </p>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 1 && (
                  <button
                    onClick={() => setMessages([])}
                    className="text-[11px] font-medium text-slate-700 hover:text-slate-400 px-3 py-1.5 rounded-xl hover:bg-white/[0.04] transition-all border border-transparent hover:border-white/[0.06]"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.07] flex items-center justify-center text-slate-500 hover:text-slate-300 transition-all"
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 1l10 10M11 1L1 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain px-7 py-6 space-y-5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.06) transparent",
              }}
            >
              {messages.map((msg) => (
                <Bubble key={msg.id} msg={msg} />
              ))}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M7 1.5C4 1.5 2 3.5 2 6c0 1.3.5 2.4 1.3 3.2L3 11l1.8-.8A5 5 0 0 0 7 10.5C10 10.5 12 8.5 12 6s-2-4.5-5-4.5Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-[4px] bg-white/[0.05] border border-white/[0.07]">
                      <ThinkingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="shrink-0 px-7 pb-6 pt-4 border-t border-white/[0.05]">
              <div
                className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-5 py-3.5
                focus-within:border-indigo-500/30 focus-within:bg-indigo-500/[0.02] focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.07)]
                transition-all duration-200"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  disabled={loading}
                  placeholder="Ask a follow-up question…"
                  className="flex-1 bg-transparent text-[13.5px] text-slate-200 placeholder:text-slate-700 outline-none disabled:opacity-40 min-w-0"
                />
                <AnimatePresence>
                  {input.length > 0 && (
                    <motion.span
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      className="text-[10px] text-slate-700 shrink-0 select-none font-mono"
                    >
                      ↵
                    </motion.span>
                  )}
                </AnimatePresence>
                <motion.button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  className="shrink-0 w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-25 disabled:cursor-not-allowed
                    flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M14 8 2 2l3 6-3 6 12-6Z" fill="white" />
                  </svg>
                </motion.button>
              </div>
              <div className="flex items-center justify-between mt-3 px-1">
                <p className="text-[10px] text-slate-800 select-none">
                  Press ESC to close
                </p>
                <p className="text-[10px] text-slate-800 select-none">
                  Sharpnr Engine V1.0
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
