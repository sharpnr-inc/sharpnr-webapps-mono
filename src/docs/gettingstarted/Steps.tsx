// src/docs/components/Steps.tsx
import { ReactNode } from "react";

interface StepsProps {
  children: ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="relative my-8">
      {/* Vertical connector line — sits behind the step bubbles */}
      <div
        className="absolute left-[18px] top-10 bottom-4 w-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0.08) 80%, transparent 100%)",
        }}
      />
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

interface StepProps {
  number: number;
  title: string;
  children: ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="relative flex gap-6 pb-10 last:pb-0">
      {/* Bubble */}
      <div className="relative z-10 flex-shrink-0 w-9 h-9 rounded-full bg-[#0f0f18] border border-violet-500/30 flex items-center justify-center mt-0.5"
        style={{ boxShadow: "0 0 16px rgba(139,92,246,0.12)" }}
      >
        <span className="text-[11px] font-mono font-bold text-violet-400 leading-none">
          {String(number).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-1">
        <h3 className="text-[15px] font-semibold text-white/90 mb-3 leading-snug tracking-tight">
          {title}
        </h3>
        <div className="text-[13.5px] text-white/50 leading-relaxed space-y-3
          [&_a]:text-violet-400 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-violet-300
          [&_strong]:text-white/75 [&_strong]:font-semibold
          [&_p]:text-[13.5px] [&_p]:text-white/50 [&_p]:leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
