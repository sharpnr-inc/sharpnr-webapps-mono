import { useState, useLayoutEffect, useRef } from "react";

export function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setWidth(entry.contentRect.width);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []); // ✅ no need to include width in deps
  

  return [ref, width] as const;
}
