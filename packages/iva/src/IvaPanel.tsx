import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, Trash2 } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  ScrollArea,
  Separator,
  Textarea,
} from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { useIva } from "./iva-context";

function Bubble({ mine, text }: { mine: boolean; text: string }) {
  return (
    <div className={cn("flex w-full", mine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
          mine
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-muted text-foreground",
        )}
      >
        {text}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-3 py-2.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

export function IvaPanel() {
  const { messages, send, clear, isTyping, assistantName, suggestions, setOpen } =
    useIva();
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    // Optional-called: jsdom (and other non-browser envs) do not implement it.
    endRef.current?.scrollIntoView?.({ block: "end" });
  }, [messages.length, isTyping]);

  // Escape closes the panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    send(text);
    setDraft("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      role="dialog"
      aria-label={assistantName}
      className="flex h-[30rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-border/60 bg-muted/40 px-3.5 py-2.5">
        <Avatar className="h-8 w-8 border border-border">
          <AvatarFallback className="bg-primary text-xs font-bold text-primary-foreground">
            {assistantName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold">{assistantName}</span>
          <span className="text-[11px] text-muted-foreground">
            {isTyping ? "Typing…" : "Online"}
          </span>
        </div>

        <Badge variant="secondary" className="ml-auto h-5 gap-1 px-1.5 text-[10px]">
          <Sparkles className="h-3 w-3" />
          Preview
        </Badge>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={clear}
          aria-label="Clear conversation"
          className="h-7 w-7"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2.5 p-3.5">
          {messages.map((m) => (
            <Bubble key={m.id} mine={m.role === "user"} text={m.text} />
          ))}
          {isTyping ? <TypingDots /> : null}
          <div ref={endRef} />
        </div>
      </ScrollArea>

      {/* Suggestions */}
      {messages.length <= 1 && suggestions.length > 0 ? (
        <>
          <Separator />
          <div className="flex flex-wrap gap-1.5 p-2.5">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </>
      ) : null}

      {/* Composer */}
      <Separator />
      <div className="flex items-end gap-2 p-2.5">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          placeholder={`Message ${assistantName}…`}
          aria-label={`Message ${assistantName}`}
          className="max-h-28 min-h-9 resize-none py-2 text-sm"
        />
        <Button
          type="button"
          size="icon"
          onClick={submit}
          disabled={!draft.trim()}
          aria-label="Send message"
          className="h-9 w-9 shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

export function IvaPanelPresence({ open }: { open: boolean }) {
  return <AnimatePresence>{open ? <IvaPanel /> : null}</AnimatePresence>;
}
