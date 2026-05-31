// src/docs/components/CodeBlock.tsx
"use client";
import { useState, ReactNode } from "react";
import { Check, Copy, Terminal, FileCode } from "lucide-react";

interface CodeBlockProps {
  children: string | ReactNode;
  lang?: string;
  filename?: string;
  /** "terminal" shows a $ prompt style header; "file" shows a filename tab */
  variant?: "terminal" | "file";
}

export function CodeBlock({
  children,
  lang = "bash",
  filename,
  variant,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const rawText =
    typeof children === "string" ? children.trim() : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isTerminal = variant === "terminal" || lang === "bash" || lang === "sh";
  const Icon = isTerminal ? Terminal : FileCode;

  return (
    <div className="relative group rounded-xl border border-white/[0.08] bg-[#0d0d16] overflow-hidden my-5">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
          </div>
          <div className="w-px h-3.5 bg-white/[0.06] mx-1" />
          <Icon className="w-3 h-3 text-white/20" />
          {filename ? (
            <span className="text-[11px] font-mono text-white/30">{filename}</span>
          ) : (
            <span className="text-[11px] font-mono text-white/20 uppercase tracking-widest">
              {lang}
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all duration-150
            text-white/25 hover:text-white/60 hover:bg-white/[0.05] active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="px-5 py-4 overflow-x-auto">
        {isTerminal && (
          <span className="text-violet-500/60 font-mono text-[13px] select-none mr-2">$</span>
        )}
        <code className="text-[13px] font-mono text-white/65 leading-[1.8] whitespace-pre">
          {rawText}
        </code>
      </div>
    </div>
  );
}
