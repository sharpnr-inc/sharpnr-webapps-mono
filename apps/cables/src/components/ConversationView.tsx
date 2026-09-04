import { useLayoutEffect, useRef, useState } from "react";
import { Hash, MessageSquare, SendHorizontal } from "lucide-react";
import type {
  CablesConversation,
  CablesMember,
  CablesMessage,
} from "@/api/types";

/**
 * The message pane: history above, composer below.
 *
 * Messages arrive here already merged from two sources — the HTTP page load and
 * the socket — so this component only renders. Ordering is by `seq`, never by
 * timestamp: two messages can share a millisecond, and seq is the same cursor
 * the server paginates on.
 */

type Props = {
  conversation: CablesConversation | null;
  messages: CablesMessage[];
  members: CablesMember[];
  me: CablesMember | null;
  isLoading: boolean;
  onSend: (body: string) => void;
};

export function ConversationView({
  conversation,
  messages,
  members,
  me,
  isLoading,
  onSend,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const byId = new Map(members.map((m) => [m.id, m]));

  // Layout effect, not a plain effect: scrolling after paint makes the jump
  // visible on every incoming message.
  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, conversation?.id]);

  if (!conversation) {
    return (
      <div className="flex h-full flex-1 items-center justify-center bg-ink">
        <div className="text-center">
          <MessageSquare className="mx-auto h-8 w-8 text-port" />
          <p className="mt-3 text-sm text-paper-dim">
            Pick a channel or start a direct message
          </p>
        </div>
      </div>
    );
  }

  const title =
    conversation.type === "CHANNEL"
      ? (conversation.name ?? conversation.slug)
      : (conversation.otherMemberId &&
          byId.get(conversation.otherMemberId)?.displayName) ||
        "Direct message";

  return (
    <div className="flex h-full flex-1 flex-col bg-ink">
      <header className="flex items-center gap-2 border-b border-ink-line px-5 py-3">
        {conversation.type === "CHANNEL" ? (
          <Hash className="h-4 w-4 text-paper-muted" />
        ) : (
          <MessageSquare className="h-4 w-4 text-paper-muted" />
        )}
        <h2 className="text-sm font-semibold text-paper">{title}</h2>
        {conversation.type === "CHANNEL" && (
          <span className="text-xs text-paper-muted">
            · {conversation.memberCount}{" "}
            {conversation.memberCount === 1 ? "member" : "members"}
          </span>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {isLoading && <p className="text-xs text-paper-muted">Loading…</p>}

        {!isLoading && messages.length === 0 && (
          <p className="text-xs text-paper-muted">
            No messages yet — say something.
          </p>
        )}

        <ul className="space-y-3">
          {messages.map((message, index) => {
            const author = message.senderMemberId
              ? byId.get(message.senderMemberId)
              : undefined;
            const isMine = message.senderMemberId === me?.id;

            // Consecutive messages from one person read as a block, so the
            // name and avatar are only drawn when the author changes.
            const previous = messages[index - 1];
            const startsBlock =
              !previous || previous.senderMemberId !== message.senderMemberId;

            return (
              <li key={message.id} className="flex gap-3">
                <div className="w-7 shrink-0">
                  {startsBlock && (
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold ${
                        isMine
                          ? "bg-signal text-paper"
                          : "bg-port text-paper-dim"
                      }`}
                    >
                      {(author?.displayName ?? "?").charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  {startsBlock && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-paper">
                        {author?.displayName ?? "Unknown"}
                      </span>
                      <span className="text-[10px] text-paper-muted">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}

                  <p
                    className={`text-sm break-words whitespace-pre-wrap ${
                      message.isDeleted
                        ? "text-paper-muted italic"
                        : "text-paper-dim"
                    } ${message.id.startsWith("pending-") ? "opacity-50" : ""}`}
                  >
                    {message.isDeleted ? "This message was deleted" : message.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div ref={bottomRef} />
      </div>

      {/* Keyed by conversation so switching rooms unmounts the composer and its
          draft goes with it — the alternative is clearing state from an effect,
          which fights React rather than using it. */}
      <Composer
        key={conversation.id}
        placeholder={`Message ${
          conversation.type === "CHANNEL" ? `#${conversation.slug}` : title
        }`}
        onSend={onSend}
      />
    </div>
  );
}

/* ---------------------------------- <***> --------------------------------- */

function Composer({
  placeholder,
  onSend,
}: {
  placeholder: string;
  onSend: (body: string) => void;
}) {
  const [draft, setDraft] = useState("");

  const submit = () => {
    const body = draft.trim();
    if (!body) return;
    setDraft("");
    onSend(body);
  };

  return (
    <div className="border-t border-ink-line p-4">
      <div className="flex items-end gap-2 rounded-lg border border-ink-line bg-ink-raised px-3 py-2 focus-within:border-port">
        <textarea
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            // Enter sends, shift+enter breaks the line — the convention
            // everyone already has in their fingers.
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={placeholder}
          className="max-h-32 flex-1 resize-none bg-transparent text-sm text-paper placeholder:text-paper-muted focus:outline-none"
        />
        <button
          onClick={submit}
          disabled={!draft.trim()}
          className="rounded p-1 text-signal-bright transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:text-port"
        >
          <SendHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
