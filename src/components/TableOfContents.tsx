// src/docs/components/TableOfContents.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AlignLeft } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  /** Pass headings explicitly from the MDX page, or leave empty to auto-scan the DOM */
  items?: TocItem[];
}

export function TableOfContents({ items: propItems }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>(propItems ?? []);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ── Auto-scan DOM for h2/h3 if no items passed ──────────────────────────
  useEffect(() => {
    if (propItems && propItems.length > 0) {
      setItems(propItems);
      return;
    }

    // Wait one tick for MDX to render
    const timer = setTimeout(() => {
      const headings = Array.from(
        document.querySelectorAll<HTMLHeadingElement>("main h2, main h3"),
      );

      const scanned: TocItem[] = headings
        .filter((el) => el.id)
        .map((el) => ({
          id: el.id,
          label: el.textContent?.trim() ?? "",
          level: el.tagName === "H3" ? 3 : 2,
        }));

      setItems(scanned);
    }, 80);

    return () => clearTimeout(timer);
  }, [propItems]);

  // ── Scroll spy via IntersectionObserver ─────────────────────────────────
  useEffect(() => {
    if (items.length === 0) return;

    observerRef.current?.disconnect();

    const headingEls = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    // Keep track of which headings are visible; pick the topmost
    const visibleSet = new Set<string>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSet.add(entry.target.id);
          } else {
            visibleSet.delete(entry.target.id);
          }
        });

        // Prefer the first item in document order that is visible
        for (const { id } of items) {
          if (visibleSet.has(id)) {
            setActiveId(id);
            return;
          }
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      },
    );

    headingEls.forEach((el) => observerRef.current!.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:flex flex-col w-56 shrink-0 sticky top-0 h-screen overflow-y-auto py-10 pl-4 pr-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 px-2">
        <AlignLeft className="w-3.5 h-3.5 text-white/25" />
        <span className="text-[10px] font-mono font-bold text-white/25 tracking-[0.14em] uppercase">
          On this page
        </span>
      </div>

      {/* Items */}
      <nav className="flex flex-col gap-0.5">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                setActiveId(item.id);
              }}
              className={[
                "group relative flex items-center rounded-md py-1.5 no-underline transition-all duration-150",
                item.level === 3 ? "pl-7 pr-2" : "pl-3 pr-2",
                active
                  ? "text-violet-400"
                  : "text-white/35 hover:text-white/70",
              ].join(" ")}
            >
              {/* Active left bar */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-r-full bg-violet-400/70" />
              )}

              <span
                className={[
                  "text-[12px] leading-snug transition-colors duration-150",
                  item.level === 3 ? "font-normal" : "font-medium",
                  active ? "text-violet-400" : "",
                ].join(" ")}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
