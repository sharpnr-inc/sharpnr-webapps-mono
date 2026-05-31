// src/docs/components/PageHeader.tsx

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  readTime?: string;
}

export function PageHeader({ badge, title, subtitle, readTime }: PageHeaderProps) {
  return (
    <div className="mb-12 pb-10 border-b border-white/[0.06]">
      {/* Top meta row */}
      <div className="flex items-center gap-3 mb-6">
        {badge && (
          <span className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/25 rounded-md px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shrink-0" />
            <span className="text-[10px] font-mono font-bold text-violet-400 tracking-[0.14em] uppercase">
              {badge}
            </span>
          </span>
        )}
        {readTime && (
          <span className="text-[11px] font-mono text-white/20">{readTime}</span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-[2.6rem] font-bold text-white tracking-tight leading-[1.1] mb-5">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-[15px] text-white/45 leading-[1.75] max-w-[560px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
