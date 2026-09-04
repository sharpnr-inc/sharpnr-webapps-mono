import { useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  MessageSquare,
  Minus,
  Send,
  X,
} from "lucide-react";
import { config } from "@sharpnr/env";
import { useCablesDirects } from "./useCablesDirects";

/**
 * The docked cables window: direct messages, available from anywhere in the
 * suite.
 *
 * Mount it once per app, inside the authenticated layout. It renders a launcher
 * pinned to the corner and nothing else until opened.
 *
 * ─── IT MUST NEVER BREAK ITS HOST ─────────────────────────────────────────────
 * This is the rule everything here follows. It is mounted on top of products
 * that have nothing to do with messaging, so:
 *
 *   - it renders null unless cables is live for the org and the session is good
 *   - every request failure is swallowed, never surfaced to the host
 *   - it needs no provider, no store and no router from the host app
 *   - it is fixed-positioned and self-contained, so it cannot disturb layout
 *
 * ─── SCOPE ────────────────────────────────────────────────────────────────────
 * Direct messages only. Channels, threads and calls stay in the cables app —
 * the "Open Cables" link is how someone gets to them. A docked window that
 * grows into a second full client is a second client to maintain.
 */

export type CablesWindowProps = {
  /** Corner to dock into. Defaults to bottom-right. */
  align?: "left" | "right";

  /** Distance from the docked edge, in px. */
  inset?: number;

  /**
   * Distance from the bottom, in px. Separate from `inset` so the window can be
   * stacked above another docked widget without also being pushed sideways —
   * which is exactly the case in the apps that already run IVA in this corner.
   *
   * IVA docks at a 24px padding with a 48px launcher, so it occupies 24–72px
   * from the bottom; `STACKED_ABOVE_IVA` clears it.
   */
  bottom?: number;
};

/**
 * Bottom offset that clears an IVA launcher in the same corner: its 24px
 * padding, plus its 48px launcher, plus a 12px gap between the two buttons.
 */
export const STACKED_ABOVE_IVA = 84;

export function CablesWindow({
  align = "right",
  inset = 24,
  bottom = 24,
}: CablesWindowProps) {
  const [open, setOpen] = useState(false);
  const [picking, setPicking] = useState(false);

  const {
    available,
    me,
    members,
    membersById,
    directs,
    unreadTotal,
    activeId,
    messages,
    loadingThread,
    socketStatus,
    openConversation,
    startDirect,
    send,
    closeConversation,
  } = useCablesDirects();

  // Cables is off for this org, or the session is not usable. Say nothing.
  if (!available || !me) return null;

  const side = align === "right" ? { right: inset } : { left: inset };
  const active = directs.find((c) => c.id === activeId) ?? null;

  const titleFor = (otherMemberId?: string) =>
    (otherMemberId && membersById.get(otherMemberId)?.displayName) ??
    "Direct message";

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{ position: "fixed", bottom, ...side, zIndex: 60 }}
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#0b0a09] text-[#ede8e1] shadow-lg ring-1 ring-[#241f1b] transition-transform hover:scale-105"
        title="Cables messages"
      >
        <MessageSquare className="h-5 w-5" />
        {unreadTotal > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d9762f] px-1 text-[10px] font-bold text-[#0b0a09]">
            {unreadTotal > 99 ? "99+" : unreadTotal}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      style={{ position: "fixed", bottom, ...side, zIndex: 60 }}
      className="flex h-[30rem] w-80 flex-col overflow-hidden rounded-xl bg-[#0b0a09] text-[#ede8e1] shadow-2xl ring-1 ring-[#241f1b]"
    >
      <header className="flex items-center gap-2 border-b border-[#241f1b] px-3 py-2.5">
        {active ? (
          <button
            onClick={closeConversation}
            className="rounded p-1 text-[#7e766c] hover:bg-[#141311] hover:text-[#ede8e1]"
            title="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        ) : (
          <span
            title={`realtime: ${socketStatus}`}
            className="ml-1 h-2 w-2 shrink-0 rounded-full"
            style={{
              backgroundColor:
                socketStatus === "open"
                  ? "#429b87"
                  : socketStatus === "connecting"
                    ? "#d9762f"
                    : "#3f3a34",
            }}
          />
        )}

        <p className="flex-1 truncate text-sm font-semibold">
          {active ? titleFor(active.otherMemberId) : "Messages"}
        </p>

        <a
          href={config.cablesAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Cables"
          className="rounded p-1 text-[#7e766c] hover:bg-[#141311] hover:text-[#ede8e1]"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <button
          onClick={() => setOpen(false)}
          title="Minimise"
          className="rounded p-1 text-[#7e766c] hover:bg-[#141311] hover:text-[#ede8e1]"
        >
          <Minus className="h-4 w-4" />
        </button>
      </header>

      {active ? (
        <Thread
          key={active.id}
          messages={messages}
          loading={loadingThread}
          meId={me.id}
          nameFor={(id) => membersById.get(id ?? "")?.displayName ?? "Unknown"}
          onSend={send}
        />
      ) : (
        <ConversationList
          directs={directs}
          picking={picking}
          setPicking={setPicking}
          titleFor={titleFor}
          members={members.filter((m) => m.id !== me.id)}
          onOpen={openConversation}
          onStartDirect={(memberId) => {
            setPicking(false);
            void startDirect(memberId);
          }}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function ConversationList({
  directs,
  picking,
  setPicking,
  titleFor,
  members,
  onOpen,
  onStartDirect,
}: {
  directs: ReturnType<typeof useCablesDirects>["directs"];
  picking: boolean;
  setPicking: (value: boolean) => void;
  titleFor: (otherMemberId?: string) => string;
  members: ReturnType<typeof useCablesDirects>["members"];
  onOpen: (id: string) => void;
  onStartDirect: (memberId: string) => void;
}) {
  if (picking) {
    return (
      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex items-center justify-between px-2 pb-2">
          <span className="text-[11px] tracking-wide text-[#7e766c] uppercase">
            Start a conversation
          </span>
          <button
            onClick={() => setPicking(false)}
            className="rounded p-0.5 text-[#7e766c] hover:text-[#ede8e1]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        {members.map((m) => (
          <button
            key={m.id}
            onClick={() => onStartDirect(m.id)}
            className="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm text-[#c3bcb1] hover:bg-[#141311] hover:text-[#ede8e1]"
          >
            <Avatar name={m.displayName} />
            <span className="truncate">{m.displayName}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-2">
        {directs.length === 0 && (
          <p className="px-2 py-3 text-xs text-[#7e766c]">
            No direct messages yet.
          </p>
        )}

        {directs.map((c) => (
          <button
            key={c.id}
            onClick={() => onOpen(c.id)}
            className="flex w-full items-center gap-2 rounded px-2 py-2 text-left hover:bg-[#141311]"
          >
            <Avatar name={titleFor(c.otherMemberId)} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm text-[#ede8e1]">
                {titleFor(c.otherMemberId)}
              </span>
              {c.lastMessageBrief && (
                <span className="block truncate text-[11px] text-[#7e766c]">
                  {c.lastMessageBrief}
                </span>
              )}
            </span>
            {c.unreadCount > 0 && (
              <span className="rounded-full bg-[#d9762f] px-1.5 py-0.5 text-[10px] font-bold text-[#0b0a09]">
                {c.unreadCount > 99 ? "99+" : c.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => setPicking(true)}
        className="border-t border-[#241f1b] px-3 py-2 text-left text-xs text-[#429b87] hover:bg-[#141311]"
      >
        + New message
      </button>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function Thread({
  messages,
  loading,
  meId,
  nameFor,
  onSend,
}: {
  messages: ReturnType<typeof useCablesDirects>["messages"];
  loading: boolean;
  meId: string;
  nameFor: (memberId?: string) => string;
  onSend: (body: string) => void;
}) {
  const [draft, setDraft] = useState("");

  const submit = () => {
    const body = draft.trim();
    if (!body) return;
    setDraft("");
    void onSend(body);
  };

  return (
    <>
      <div className="flex flex-1 flex-col-reverse overflow-y-auto px-3 py-3">
        {/* Reversed column: the newest message sits at the scroll origin, so a
            new one appears without any scroll bookkeeping. */}
        <div className="space-y-2">
          {loading && <p className="text-xs text-[#7e766c]">Loading…</p>}

          {!loading && messages.length === 0 && (
            <p className="text-xs text-[#7e766c]">No messages yet.</p>
          )}

          {messages.map((m) => {
            const mine = m.senderMemberId === meId;
            return (
              <div
                key={m.id}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-2.5 py-1.5 ${
                    mine ? "bg-[#2b6a5c]" : "bg-[#141311]"
                  } ${m.id.startsWith("pending-") ? "opacity-50" : ""}`}
                >
                  {!mine && (
                    <p className="text-[10px] font-semibold text-[#c3bcb1]">
                      {nameFor(m.senderMemberId)}
                    </p>
                  )}
                  <p className="text-sm break-words whitespace-pre-wrap text-[#ede8e1]">
                    {m.isDeleted ? "This message was deleted" : m.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-end gap-2 border-t border-[#241f1b] p-2">
        <textarea
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Message…"
          className="max-h-24 flex-1 resize-none rounded bg-[#141311] px-2.5 py-1.5 text-sm text-[#ede8e1] placeholder:text-[#7e766c] focus:outline-none"
        />
        <button
          onClick={submit}
          disabled={!draft.trim()}
          className="rounded p-1.5 text-[#429b87] hover:bg-[#141311] disabled:text-[#3f3a34]"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3f3a34] text-[11px] font-semibold text-[#ede8e1]">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
