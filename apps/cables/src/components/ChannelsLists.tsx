import { Hash, Lock, MessageSquare, Plus, Volume2 } from "lucide-react";
import type { CablesConversation, CablesMember } from "@/api/types";

/**
 * The left rail: channels and DMs in one list, because they are one thing
 * server-side. A channel renders its own name; a DM has none and resolves the
 * other person out of the roster the client already holds.
 */

type Props = {
  conversations: CablesConversation[];
  members: CablesMember[];
  me: CablesMember | null;
  activeId: string | null;
  socketStatus: "connecting" | "open" | "closed";
  onSelect: (conversationId: string) => void;
  onCreateChannel: () => void;
  onStartDirect: (memberId: string) => void;
};

function channelIcon(type?: string) {
  if (type === "AUDIO" || type === "VIDEO") {
    return <Volume2 className="h-3.5 w-3.5 shrink-0 text-paper-muted" />;
  }
  return <Hash className="h-3.5 w-3.5 shrink-0 text-paper-muted" />;
}

export function ChannelsLists({
  conversations,
  members,
  me,
  activeId,
  socketStatus,
  onSelect,
  onCreateChannel,
  onStartDirect,
}: Props) {
  const byId = new Map(members.map((m) => [m.id, m]));

  const channels = conversations.filter((c) => c.type === "CHANNEL");
  const directs = conversations.filter((c) => c.type === "DIRECT");

  // Anyone without an open DM yet, so a first conversation can be started.
  const directMemberIds = new Set(directs.map((d) => d.otherMemberId));
  const startable = members.filter(
    (m) => m.id !== me?.id && !directMemberIds.has(m.id),
  );

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-ink-line bg-ink-sunken">
      <header className="flex items-center justify-between border-b border-ink-line px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-paper">Cables</p>
          <p className="truncate text-[11px] text-paper-muted">
            {me?.displayName ?? "…"}
          </p>
        </div>
        {/* The socket is best-effort, so its state is surfaced rather than
            hidden: a closed dot explains why a conversation looks quiet. */}
        <span
          title={`realtime: ${socketStatus}`}
          className={`h-2 w-2 shrink-0 rounded-full ${
            socketStatus === "open"
              ? "bg-signal-bright"
              : socketStatus === "connecting"
                ? "bg-patch"
                : "bg-port"
          }`}
        />
      </header>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        <div className="mb-1 flex items-center justify-between px-2">
          <span className="text-[11px] font-medium tracking-wide text-paper-muted uppercase">
            Channels
          </span>
          <button
            onClick={onCreateChannel}
            title="Create a channel"
            className="rounded p-0.5 text-paper-muted transition-colors hover:bg-ink-raised hover:text-paper"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        {channels.length === 0 && (
          <p className="px-2 py-1 text-xs text-paper-muted">No channels yet</p>
        )}

        {channels.map((c) => (
          <Row
            key={c.id}
            active={c.id === activeId}
            unread={c.unreadCount}
            onClick={() => onSelect(c.id)}
            icon={channelIcon(c.channelType)}
            label={c.name ?? c.slug ?? "channel"}
          />
        ))}

        <div className="mt-5 mb-1 px-2">
          <span className="text-[11px] font-medium tracking-wide text-paper-muted uppercase">
            Direct messages
          </span>
        </div>

        {directs.map((c) => (
          <Row
            key={c.id}
            active={c.id === activeId}
            unread={c.unreadCount}
            onClick={() => onSelect(c.id)}
            icon={
              <MessageSquare className="h-3.5 w-3.5 shrink-0 text-paper-muted" />
            }
            label={
              (c.otherMemberId && byId.get(c.otherMemberId)?.displayName) ??
              "Direct message"
            }
          />
        ))}

        {startable.length > 0 && (
          <div className="mt-3 border-t border-ink-line pt-3">
            <p className="px-2 pb-1 text-[11px] text-paper-muted">
              Start a conversation
            </p>
            {startable.map((m) => (
              <button
                key={m.id}
                onClick={() => onStartDirect(m.id)}
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm text-paper-dim transition-colors hover:bg-ink-raised hover:text-paper"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-port text-[10px] font-medium text-paper">
                  {m.displayName.charAt(0).toUpperCase()}
                </span>
                <span className="truncate">{m.displayName}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

function Row({
  active,
  unread,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  unread: number;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm transition-colors ${
        active
          ? "bg-ink-raised text-paper"
          : "text-paper-dim hover:bg-ink-raised hover:text-paper"
      }`}
    >
      {icon}
      <span className="flex-1 truncate">{label}</span>
      {unread > 0 && (
        <span className="rounded-full bg-patch px-1.5 py-0.5 text-[10px] font-semibold text-ink">
          {unread > 99 ? "99+" : unread}
        </span>
      )}
    </button>
  );
}

export { Lock };
