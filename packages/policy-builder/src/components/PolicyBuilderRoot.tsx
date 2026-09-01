import { useEffect, useMemo, type ReactNode } from "react";
import { Separator } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { PolicyBuilderContext } from "../context";
import { useCedarReady } from "../hooks/useCedarReady";
import { usePolicyBuilderStore } from "../store/usePolicyBuilderStore";
import { buildPolicyText } from "../utils/buildPolicyText";
import { verifyPolicy } from "../utils/verifyPolicy";
import { Conditions } from "./Conditions";
import { Metadata } from "./Metadata";
import { Scope } from "./Scope";

export interface PolicyBuilderProps {
  /** Fired whenever the draft changes, with the generated Cedar text and validity. */
  onChange?: (result: {
    text: string;
    valid: boolean;
    /** False until the Cedar engine has loaded and actually checked the text. */
    engineReady: boolean;
  }) => void;
  /**
   * Compose the builder from its sub-components. When omitted, the default
   * layout (metadata → scope → conditions) is rendered.
   */
  children?: ReactNode;
  className?: string;
}

export function PolicyBuilderRoot({
  onChange,
  children,
  className,
}: PolicyBuilderProps) {
  const state = usePolicyBuilderStore();
  const cedarReady = useCedarReady();
  const { name, description, effect, principal, action, resource, conditions } =
    state;

  // Generate + validate the Cedar policy behind the scenes. This is recomputed
  // whenever any part of the draft changes and shared via context.
  const result = useMemo(() => {
    const text = buildPolicyText(state);
    const verification = verifyPolicy(text);
    return {
      text: verification.formatted,
      valid: verification.ok,
      engineReady: verification.engineReady,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, effect, principal, action, resource, conditions, cedarReady]);

  // Report the latest draft up to the parent ("is the policy ready to save?").
  useEffect(() => {
    onChange?.(result);
  }, [result, onChange]);

  return (
    <PolicyBuilderContext.Provider value={result}>
      <div className={cn("mx-auto max-w-2xl space-y-5", className)}>
        {children ?? (
          <>
            <Metadata />
            <Separator />
            <Scope />
            <Separator />
            <Conditions />
          </>
        )}
      </div>
    </PolicyBuilderContext.Provider>
  );
}
