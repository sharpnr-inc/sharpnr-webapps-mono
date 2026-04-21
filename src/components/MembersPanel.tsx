import { motion } from "framer-motion";
import { UserPlus, Crown, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import type { User, UserStatus } from "../types";
import { useChat } from "@/hooks/useChatStore";

const STATUS_COLOR: Record<UserStatus, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-400",
  busy: "bg-red-500",
  offline: "bg-zinc-600",
};

const STATUS_LABEL: Record<UserStatus, string> = {
  online: "Online",
  away: "Away",
  busy: "Do not disturb",
  offline: "Offline",
};

function MemberItem({ user }: { user: User }) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-zinc-800/60 transition-colors cursor-pointer group"
    >
      <div className="relative shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: user.avatarColor }}
        >
          {user.initials}
        </div>
        <div
          className={cn(
            "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-900",
            STATUS_COLOR[user.status],
          )}
        />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-zinc-300 truncate group-hover:text-zinc-100">
            {user.name}
          </span>
          {user.role === "admin" && (
            <Crown className="w-2.5 h-2.5 text-amber-400 shrink-0" />
          )}
          {user.isBot && <Bot className="w-2.5 h-2.5 text-blue-400 shrink-0" />}
        </div>
        {user.title && (
          <span className="text-[11px] text-zinc-600 truncate">
            {user.title}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function MemberGroup({ label, members }: { label: string; members: User[] }) {
  if (!members.length) return null;
  return (
    <div className="mb-3">
      <div className="px-3 py-1 mb-1">
        <span className="text-[10px] font-semibold tracking-widest text-zinc-600 uppercase">
          {label} — {members.length}
        </span>
      </div>
      {members.map((u) => (
        <MemberItem key={u.id} user={u} />
      ))}
    </div>
  );
}

export function MembersPanel({ channelId }: { channelId: string }) {
  const { channels, users, membersOpen } = useChat();
  const channel = channels.find((c) => c.id === channelId);
  if (!membersOpen || !channel) return null;

  const members = users.filter((u) => channel.memberIds.includes(u.id));

  const admins = members.filter(
    (u) => u.role === "admin" && u.status !== "offline",
  );
  const online = members.filter(
    (u) => u.role !== "admin" && u.status === "online",
  );
  const away = members.filter(
    (u) => u.status === "away" || u.status === "busy",
  );
  const offline = members.filter((u) => u.status === "offline");
  const bots = members.filter((u) => u.isBot);

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 240, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-60 shrink-0 border-l border-zinc-800 bg-zinc-900 overflow-hidden"
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-300">Members</span>
          <button className="w-6 h-6 rounded flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors">
            <UserPlus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
          {admins.length > 0 && <MemberGroup label="Admins" members={admins} />}
          {online.length > 0 && <MemberGroup label="Online" members={online} />}
          {away.length > 0 && <MemberGroup label="Away" members={away} />}
          {bots.length > 0 && <MemberGroup label="Apps" members={bots} />}
          {offline.length > 0 && (
            <MemberGroup label="Offline" members={offline} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
