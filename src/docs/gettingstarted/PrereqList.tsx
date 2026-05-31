// src/docs/components/PrereqList.tsx

interface PrereqListProps {
  items: { label: string; note?: string }[];
}

export function PrereqList({ items }: PrereqListProps) {
  return (
    <div className="flex flex-wrap gap-2 my-5">
      {items.map((item) => (
        <div
          key={item.label}
          className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08]
            bg-white/[0.04] px-3.5 py-2 transition-colors duration-150"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400/50 shrink-0" />
          <span className="text-[12px] font-mono text-white/55 font-medium">{item.label}</span>
          {item.note && (
            <span className="text-[11px] font-mono text-white/25">{item.note}</span>
          )}
        </div>
      ))}
    </div>
  );
}
