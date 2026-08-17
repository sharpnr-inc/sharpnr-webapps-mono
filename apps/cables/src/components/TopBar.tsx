import {
  Hash,
  Volume2,
  Megaphone,
  Lock,
  Users,
  Bell,
  Pin,
  Search,
  Settings,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@sharpnr/utils";
import type { Channel } from "../types";
import { useChat } from "@/hooks/useChatStore";

// Icon for the Channel Type and this the 
function ChannelTypeIcon({
  type,
  isPrivate,
}: {
  type: Channel["type"];
  isPrivate: boolean;
}) {
  const cls = "w-4 h-4 text-zinc-400";
  if (isPrivate) return <Lock className={cls} />;
  if (type === "voice") return <Volume2 className={cls} />;
  if (type === "announcement") return <Megaphone className={cls} />;
  return <Hash className={cls} />;
}

interface TopBarProps {
  type: "channel" | "dm";
  id: string;
}

export function TopBar({ type, id }: TopBarProps) {
  const { channels, users, membersOpen, toggleMembers } = useChat();

  if (type === "dm") {
    const dmUser = users.find((u) => u.id === id);
    if (!dmUser) return null;

    const statusLabels = {
      online: "Active now",
      away: "Away",
      busy: "Do not disturb",
      offline: "Offline",
    };

    return (
      <div className="h-12 border-b border-zinc-800 flex items-center px-4 gap-3 shrink-0 bg-zinc-900">
        <div className="relative shrink-0">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: dmUser.avatarColor }}
          >
            {dmUser.initials}
          </div>
          <div
            className={cn(
              "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-900",
              dmUser.status === "online"
                ? "bg-emerald-500"
                : dmUser.status === "away"
                  ? "bg-amber-400"
                  : dmUser.status === "busy"
                    ? "bg-red-500"
                    : "bg-zinc-600",
            )}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-zinc-100 leading-none">
            {dmUser.name}
          </span>
          <span className="text-[11px] text-zinc-500 mt-0.5">
            {statusLabels[dmUser.status]}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <TopBarAction icon={<Search className="w-4 h-4" />} label="Search" />
          <TopBarAction icon={<Info className="w-4 h-4" />} label="Profile" />
        </div>
      </div>
    );
  }

  const channel = channels.find((c) => c.id === id);
  if (!channel) return null;

  const memberCount = channel.memberIds.length;

  return (
    <div className="h-12 border-b border-zinc-800 flex items-center px-4 gap-3 shrink-0 bg-zinc-900">
      <div className="flex items-center gap-1.5 min-w-0">
        <ChannelTypeIcon type={channel.type} isPrivate={channel.isPrivate} />
        <span className="text-sm font-semibold text-zinc-100 truncate">
          {channel.name}
        </span>
        {channel.isPrivate && (
          <span className="text-[10px] bg-zinc-700 text-zinc-400 px-1.5 py-0.5 rounded font-medium shrink-0">
            PRIVATE
          </span>
        )}
      </div>

      {channel.topic && (
        <>
          <div className="w-px h-4 bg-zinc-700 shrink-0" />
          <p className="text-xs text-zinc-500 truncate max-w-xs">
            {channel.topic}
          </p>
        </>
      )}

      <div className="ml-auto flex items-center gap-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMembers}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
            membersOpen
              ? "bg-zinc-700 text-zinc-200"
              : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300",
          )}
        >
          <Users className="w-3.5 h-3.5" />
          <span>{memberCount}</span>
        </motion.button>
        <TopBarAction
          icon={<Bell className="w-4 h-4" />}
          label="Notifications"
        />
        <TopBarAction
          icon={<Pin className="w-4 h-4" />}
          label="Pinned messages"
        />
        <TopBarAction
          icon={<Search className="w-4 h-4" />}
          label="Search in channel"
        />
        <TopBarAction
          icon={<Settings className="w-4 h-4" />}
          label="Channel settings"
        />
      </div>
    </div>
  );
}

function TopBarAction({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={label}
      className="w-8 h-8 rounded-md flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
    >
      {icon}
    </motion.button>
  );
}
