interface WindowFrameProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function WindowFrame({
  children,
  title,
  className = "",
}: WindowFrameProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden border border-white/[0.08]
                  bg-[#0d0b1a] shadow-2xl shadow-black/60 ${className}`}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 h-10 bg-[#0a0814]
                      border-b border-white/[0.06] shrink-0"
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_4px_#ff5f5780]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_4px_#febc2e80]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_4px_#28c84080]" />
        </div>

        {/* Optional title */}
        {title && (
          <span
            className="flex-1 text-center text-[0.7rem] font-medium
                           tracking-wide text-slate-500 select-none pr-10"
          >
            {title}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="w-full">{children}</div>
    </div>
  );
}
