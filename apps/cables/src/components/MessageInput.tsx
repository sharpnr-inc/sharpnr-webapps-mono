import { useState, useRef, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Plus,
  Smile,
  Paperclip,
  AtSign,
  Bold,
  Italic,
  Link2,
  List,
  Code2,
  Strikethrough,
} from "lucide-react";
import { cn } from "@sharpnr/utils";
import { useChat } from "@/hooks/useChatStore";

interface MessageInputProps {
  channelId: string;
  placeholder?: string;
}

const FORMAT_ACTIONS = [
  { icon: <Bold className="w-3.5 h-3.5" />, label: "Bold", shortcut: "⌘B" },
  { icon: <Italic className="w-3.5 h-3.5" />, label: "Italic", shortcut: "⌘I" },
  { icon: <Strikethrough className="w-3.5 h-3.5" />, label: "Strikethrough" },
  {
    icon: <Code2 className="w-3.5 h-3.5" />,
    label: "Inline code",
    shortcut: "⌘E",
  },
  {
    icon: <Link2 className="w-3.5 h-3.5" />,
    label: "Add link",
    shortcut: "⌘K",
  },
  { icon: <List className="w-3.5 h-3.5" />, label: "Bullet list" },
];

export function MessageInput({ channelId, placeholder }: MessageInputProps) {
  const { sendMessage, channels, users, currentUserId } = useChat();
  const [value, setValue] = useState("");
  const [showFormat, setShowFormat] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const channel = channels.find((c) => c.id === channelId);
  const currentUser = users.find((u) => u.id === currentUserId);

  const handleSend = () => {
    if (!value.trim()) return;
    sendMessage(channelId, value.trim());
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  };

  const defaultPlaceholder = channel
    ? `Message #${channel.name}`
    : (placeholder ?? "Send a message...");

  const isAnnouncement = channel?.type === "announcement";
  const isAdmin = currentUser?.role === "admin";

  if (isAnnouncement && !isAdmin) {
    return (
      <div className="px-4 py-3 border-t border-zinc-800">
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
          <span className="text-sm text-zinc-500">
            Only admins can post in #announcements
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-4 pt-2 shrink-0">
      <div
        className={cn(
          "rounded-xl border transition-colors",
          value
            ? "border-zinc-600 bg-zinc-800"
            : "border-zinc-700/60 bg-zinc-800/80",
        )}
      >
        {/* Format toolbar */}
        <AnimatePresence>
          {showFormat && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-zinc-700/50"
            >
              <div className="flex items-center gap-0.5 px-3 py-1.5">
                {FORMAT_ACTIONS.map((action, i) => (
                  <button
                    key={i}
                    title={
                      action.label +
                      (action.shortcut ? ` (${action.shortcut})` : "")
                    }
                    className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700 transition-colors"
                  >
                    {action.icon}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input area */}
        <div className="flex items-end gap-2 px-3 py-2.5">
          <button className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700 transition-colors shrink-0 mb-0.5">
            <Plus className="w-4 h-4" />
          </button>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={defaultPlaceholder}
            rows={1}
            className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 outline-none resize-none leading-relaxed min-h-6 max-h-50 py-0.5"
          />

          <div className="flex items-center gap-1 shrink-0 mb-0.5">
            <button
              onClick={() => setShowFormat((p) => !p)}
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                showFormat
                  ? "text-blue-400 bg-blue-500/20"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700",
              )}
              title="Formatting"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700 transition-colors"
              title="Emoji"
            >
              <Smile className="w-3.5 h-3.5" />
            </button>
            <button
              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700 transition-colors"
              title="Attach file"
            >
              <Paperclip className="w-3.5 h-3.5" />
            </button>
            <button
              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700 transition-colors"
              title="Mention"
            >
              <AtSign className="w-3.5 h-3.5" />
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleSend}
              disabled={!value.trim()}
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center transition-all ml-1",
                value.trim()
                  ? "bg-blue-500 text-white hover:bg-blue-400 shadow-md shadow-blue-500/30"
                  : "bg-zinc-700 text-zinc-500 cursor-not-allowed",
              )}
            >
              <Send className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Hint */}
        <div className="px-3 pb-1.5 flex items-center gap-2">
          <span className="text-[10px] text-zinc-700">
            <kbd className="font-mono">Enter</kbd> to send ·{" "}
            <kbd className="font-mono">Shift+Enter</kbd> for new line
          </span>
        </div>
      </div>
    </div>
  );
}
