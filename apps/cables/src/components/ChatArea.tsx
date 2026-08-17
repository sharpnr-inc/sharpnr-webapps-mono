import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, SmilePlus, Reply, Pin, Hash } from "lucide-react";
import { cn } from "@sharpnr/utils";
import type { Message } from "../types";
import { useChat, useMessages } from "@/hooks/useChatStore";

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDay(date: Date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function parseContent(content: string) {
  // Bold **text**
  const parts = content.split(/(\*\*[^*]+\*\*|\n|@\w+\.\w+|https?:\/\/[^\s]+)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-zinc-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part === "\n") return <br key={i} />;
    if (part.startsWith("@")) {
      return (
        <span
          key={i}
          className="text-blue-400 bg-blue-500/10 px-0.5 rounded font-medium"
        >
          {part}
        </span>
      );
    }
    if (part.startsWith("http")) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:underline"
        >
          {part}
        </a>
      );
    }
    if (part.startsWith("•")) {
      return (
        <span key={i} className="block pl-2">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const QUICK_EMOJIS = ["👍", "❤️", "😂", "🔥", "🙌", "✅"];

function MessageHoverActions({
  onReact,
  onReply,
}: {
  onReact: (e: string) => void;
  onReply: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className="absolute -top-3 right-3 flex items-center gap-0.5 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl px-1 py-0.5 z-10"
    >
      {QUICK_EMOJIS.map((e) => (
        <button
          key={e}
          onClick={() => onReact(e)}
          className="w-7 h-7 rounded hover:bg-zinc-700 flex items-center justify-center text-base transition-colors"
        >
          {e}
        </button>
      ))}
      <div className="w-px h-4 bg-zinc-700 mx-0.5" />
      <ActionBtn
        icon={<Reply className="w-3.5 h-3.5" />}
        label="Reply"
        onClick={onReply}
      />
      <ActionBtn
        icon={<Pin className="w-3.5 h-3.5" />}
        label="Pin"
        onClick={() => {}}
      />
      <ActionBtn
        icon={<MoreHorizontal className="w-3.5 h-3.5" />}
        label="More"
        onClick={() => {}}
      />
    </motion.div>
  );
}

function ActionBtn({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      title={label}
      onClick={onClick}
      className="w-7 h-7 rounded flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
    >
      {icon}
    </button>
  );
}

function MessageRow({
  msg,
  isGrouped,
  channelId,
}: {
  msg: Message;
  isGrouped: boolean;
  channelId: string;
}) {
  const { toggleReaction, users } = useChat();
  const [hovered, setHovered] = useState(false);
  const author = users.find((u) => u.id === msg.authorId)!;

  if (msg.type === "system") {
    return (
      <div className="flex items-center gap-3 px-4 py-1.5 group">
        <div className="flex-1 border-t border-zinc-800/60" />
        <div className="flex items-center gap-1.5 shrink-0">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: author?.avatarColor ?? "#4F8EF7" }}
          >
            <Hash className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-xs text-zinc-500">
            {parseContent(msg.content)}
          </span>
        </div>
        <div className="flex-1 border-t border-zinc-800/60" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative group flex gap-3 px-4 transition-colors rounded-sm",
        isGrouped ? "pt-0.5 pb-0.5" : "pt-3 pb-0.5",
        hovered ? "bg-zinc-800/50" : "",
      )}
    >
      {/* Avatar or spacer */}
      <div className="w-9 shrink-0 flex items-start justify-center">
        {isGrouped ? (
          <span className="text-[10px] text-zinc-600 group-hover:text-zinc-500 opacity-0 group-hover:opacity-100 leading-5 mt-0.5 select-none w-full text-right pr-1">
            {formatTime(msg.timestamp).replace(" AM", "").replace(" PM", "")}
          </span>
        ) : (
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 cursor-pointer"
            style={{ background: author.avatarColor }}
          >
            {author.initials}
          </motion.div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        {!isGrouped && (
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="text-sm font-semibold text-zinc-200 hover:underline cursor-pointer">
              {author.name}
            </span>
            {author.isBot && (
              <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1 py-0.5 rounded font-medium">
                BOT
              </span>
            )}
            {author.role === "admin" && (
              <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1 py-0.5 rounded font-medium">
                ADMIN
              </span>
            )}
            <span className="text-[11px] text-zinc-600">
              {formatTime(msg.timestamp)}
            </span>
            {msg.isEdited && (
              <span className="text-[10px] text-zinc-600 italic">(edited)</span>
            )}
          </div>
        )}
        <p className="text-sm text-zinc-300 leading-relaxed wrap-break-word whitespace-pre-wrap">
          {parseContent(msg.content)}
        </p>

        {/* Reactions */}
        {msg.reactions && msg.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {msg.reactions.map((r) => (
              <button
                key={r.emoji}
                onClick={() => toggleReaction(channelId, msg.id, r.emoji)}
                className={cn(
                  "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border transition-colors",
                  r.reactedByMe
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                    : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300",
                )}
              >
                <span>{r.emoji}</span>
                <span className="font-medium">{r.count}</span>
              </button>
            ))}
            <button
              onClick={() => {}}
              className="flex items-center px-2 py-0.5 rounded-full text-xs border border-zinc-700/50 bg-zinc-800/50 text-zinc-600 hover:border-zinc-600 hover:text-zinc-400 transition-colors"
            >
              <SmilePlus className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Hover actions */}
      <AnimatePresence>
        {hovered && (
          <MessageHoverActions
            onReact={(e) => toggleReaction(channelId, msg.id, e)}
            onReply={() => {}}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DaySeparator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex-1 border-t border-zinc-800" />
      <span className="text-xs text-zinc-500 font-medium px-2 py-0.5 rounded-full border border-zinc-800 bg-zinc-900 shrink-0">
        {label}
      </span>
      <div className="flex-1 border-t border-zinc-800" />
    </div>
  );
}

export function ChatArea({ channelId }: { channelId: string }) {
  const messages = useMessages(channelId);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Group messages by day and by consecutive author
  const grouped: Array<
    | { type: "day"; label: string }
    | { type: "msg"; msg: Message; isGrouped: boolean }
  > = [];
  let lastDay = "";
  let lastAuthor = "";
  let lastTime = 0;

  for (const msg of messages) {
    const day = formatDay(msg.timestamp);
    if (day !== lastDay) {
      grouped.push({ type: "day", label: day });
      lastDay = day;
      lastAuthor = "";
    }
    const shouldGroup =
      msg.authorId === lastAuthor &&
      msg.type !== "system" &&
      msg.timestamp.getTime() - lastTime < 5 * 60 * 1000;

    grouped.push({
      type: "msg",
      msg,
      isGrouped: shouldGroup && msg.type === "text",
    });
    lastAuthor = msg.type === "system" ? "" : msg.authorId;
    lastTime = msg.timestamp.getTime();
  }

  return (
    <div
      className="flex-1 overflow-y-auto flex flex-col py-2 scrollbar-thin"
      style={{ scrollbarColor: "#3f3f46 transparent" }}
    >
      <div className="mt-auto" />
      {grouped.map((item, i) =>
        item.type === "day" ? (
          <DaySeparator key={`day-${i}`} label={item.label} />
        ) : (
          <MessageRow
            key={item.msg.id}
            msg={item.msg}
            isGrouped={item.isGrouped}
            channelId={channelId}
          />
        ),
      )}
      <div ref={bottomRef} className="h-2" />
    </div>
  );
}
