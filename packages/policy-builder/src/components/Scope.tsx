import type { ReactNode } from "react";
import { cn } from "@sharpnr/utils";
import { Action } from "./Action";
import { Principal } from "./Principal";
import { Resource } from "./Resource";
import { SectionLabel } from "./SectionLabel";

/**
 * Scope section. Renders principal/action/resource by default, but accepts
 * children so consumers can reorder or omit individual constraints.
 */
export function Scope({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <SectionLabel>Scope</SectionLabel>
      {children ?? (
        <>
          <Principal />
          <Action />
          <Resource />
        </>
      )}
    </div>
  );
}
