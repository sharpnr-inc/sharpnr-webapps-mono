import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@sharpnr/utils";
import { IvaContext } from "./iva-context";
import { IvaLauncher } from "./IvaLauncher";
import { IvaPanelPresence } from "./IvaPanel";
import { DEFAULT_SUGGESTIONS, cannedReply, greeting } from "./dummy-data";
import type { IvaMessage, IvaPosition } from "./iva.types";

const POSITION_CLASS: Record<IvaPosition, string> = {
  "bottom-right": "bottom-0 right-0 items-end",
  "bottom-left": "bottom-0 left-0 items-start",
  "top-right": "top-0 right-0 items-end",
  "top-left": "top-0 left-0 items-start",
};

/** Panel above the button at the bottom, below it at the top. */
const STACK_CLASS: Record<IvaPosition, string> = {
  "bottom-right": "flex-col",
  "bottom-left": "flex-col",
  "top-right": "flex-col-reverse",
  "top-left": "flex-col-reverse",
};

export interface IvaProviderProps {
  children: ReactNode;
  /** Corner the widget docks to. Defaults to bottom-right. */
  position?: IvaPosition;
  /** Distance from the viewport edges, in pixels. Defaults to 24. */
  offset?: number;
  /** Start with the panel open. */
  defaultOpen?: boolean;
  /**
   * Render the built-in floating button. Set false to place <IvaLauncher />
   * yourself somewhere else -- the panel still mounts from here.
   */
  launcher?: boolean;
  /** Mount nothing at all. Useful for kiosk or print routes. */
  disabled?: boolean;
  assistantName?: string;
  suggestions?: string[];
  /** Stacking context for the docked widget. Defaults to 50. */
  zIndex?: number;
}

let seq = 0;
const nextId = () => `iva-${Date.now().toString(36)}-${(seq += 1)}`;

export function IvaProvider({
  children,
  position = "bottom-right",
  offset = 24,
  defaultOpen = false,
  launcher = true,
  disabled = false,
  assistantName = "Iva",
  suggestions = DEFAULT_SUGGESTIONS,
  zIndex = 50,
}: IvaProviderProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<IvaMessage[]>(() => [
    greeting(assistantName),
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);

  const turn = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Opening the panel acknowledges anything that arrived while it was shut.
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const send = useCallback(
    (text: string) => {
      const clean = text.trim();
      if (!clean) return;

      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "user", text: clean, at: Date.now() },
      ]);
      setIsTyping(true);

      // Stand-in for a real request; swapped out when Iva gets a backend.
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        const reply = cannedReply(clean, turn.current++);
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "assistant", text: reply, at: Date.now() },
        ]);
        setIsTyping(false);
        setUnread((u) => (open ? 0 : u + 1));
      }, 700);
    },
    [open],
  );

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    turn.current = 0;
    setIsTyping(false);
    setUnread(0);
    setMessages([greeting(assistantName)]);
  }, [assistantName]);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      toggle: () => setOpen((o) => !o),
      messages,
      send,
      clear,
      isTyping,
      unread,
      assistantName,
      suggestions,
      position,
    }),
    [open, messages, send, clear, isTyping, unread, assistantName, suggestions, position],
  );

  return (
    <IvaContext.Provider value={value}>
      {children}

      {disabled ? null : (
        <div
          // Docked shell. Only the button and panel take pointer events so the
          // rest of the corner stays clickable.
          className={cn(
            "pointer-events-none fixed flex gap-3",
            POSITION_CLASS[position],
            STACK_CLASS[position],
          )}
          style={{ padding: offset, zIndex }}
        >
          <div className="pointer-events-auto">
            <IvaPanelPresence open={open} />
          </div>
          {launcher ? (
            <div className="pointer-events-auto">
              <IvaLauncher />
            </div>
          ) : null}
        </div>
      )}
    </IvaContext.Provider>
  );
}
