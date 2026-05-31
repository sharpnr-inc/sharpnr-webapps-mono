// src/docs/components/Callout.tsx
import { ReactNode } from "react";
import { Info, AlertTriangle, Lightbulb, XCircle } from "lucide-react";

type CalloutType = "info" | "warning" | "tip" | "danger";

const variants: Record<
  CalloutType,
  { icon: typeof Info; label: string; classes: string; labelClass: string; iconClass: string }
> = {
  info: {
    icon: Info,
    label: "Note",
    classes: "bg-blue-500/[0.06] border-blue-500/20",
    labelClass: "text-blue-400",
    iconClass: "text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    classes: "bg-amber-500/[0.06] border-amber-500/20",
    labelClass: "text-amber-400",
    iconClass: "text-amber-400",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    classes: "bg-emerald-500/[0.06] border-emerald-500/20",
    labelClass: "text-emerald-400",
    iconClass: "text-emerald-400",
  },
  danger: {
    icon: XCircle,
    label: "Danger",
    classes: "bg-red-500/[0.06] border-red-500/20",
    labelClass: "text-red-400",
    iconClass: "text-red-400",
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const v = variants[type];
  const Icon = v.icon;

  return (
    <div className={`flex gap-3.5 rounded-xl border px-4 py-4 my-5 ${v.classes}`}>
      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${v.iconClass}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-[10px] font-mono font-bold tracking-[0.13em] uppercase mb-1.5 ${v.labelClass}`}>
          {title ?? v.label}
        </p>
        <div className="text-[13px] text-white/50 leading-relaxed
          [&_a]:text-violet-400 [&_a]:underline [&_a:hover]:text-violet-300
          [&_code]:text-[12px] [&_code]:bg-white/[0.08] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono">
          {children}
        </div>
      </div>
    </div>
  );
}
