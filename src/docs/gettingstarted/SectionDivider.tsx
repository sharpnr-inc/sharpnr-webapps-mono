// src/docs/components/SectionDivider.tsx

interface SectionDividerProps {
  label?: string;
}

export function SectionDivider({ label }: SectionDividerProps) {
  if (!label) {
    return <div className="h-px bg-white/[0.06] my-10" />;
  }

  return (
    <div className="flex items-center gap-4 my-10">
      <div className="flex-1 h-px bg-white/[0.06]" />
      <span className="text-[10px] font-mono font-bold text-white/20 tracking-[0.18em] uppercase shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}
