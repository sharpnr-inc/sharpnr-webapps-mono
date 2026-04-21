import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hash,
  Volume2,
  Megaphone,
  Lock,
  Plus,
  ChevronDown,
  ChevronRight,
  Video,
  Settings,
  Bell,
  Search,
  Zap,
} from "lucide-react";
import { useChat } from "@/hooks/useChatStore";
import { cn } from "@/lib/utils";
import type { Channel, UserStatus } from "../types";

const STATUS_COLOR: Record<UserStatus, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-400",
  busy: "bg-red-500",
  offline: "bg-zinc-600",
};

function ChannelIcon({
  type,
  isPrivate,
}: {
  type: Channel["type"];
  isPrivate: boolean;
}) {
  if (isPrivate) return <Lock className="w-3.5 h-3.5 shrink-0 opacity-70" />;
  if (type === "voice")
    return <Volume2 className="w-3.5 h-3.5 shrink-0 opacity-70" />;
  if (type === "announcement")
    return <Megaphone className="w-3.5 h-3.5 shrink-0 opacity-70" />;
  return <Hash className="w-3.5 h-3.5 shrink-0 opacity-70" />;
}

export function Sidebar() {
  const {
    currentWorkspace,
    workspaces,
    channels,
    channelCategories,
    directMessages,
    users,
    activeChannelId,
    activeDmUserId,
    currentUserId,
    setActiveChannel,
    setActiveDm,
  } = useChat();
  const navigate = useNavigate();
  const [collapsedCats, setCollapsedCats] = useState<Set<string>>(new Set());
  const [collapsedDms, setCollapsedDms] = useState(false);
  const currentUser = users.find((u) => u.id === currentUserId)!;

  const toggleCat = (id: string) =>
    setCollapsedCats((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="flex h-screen w-65 shrink-0 border-r border-zinc-800">
      {/* Workspace Rail */}
      <div className="flex flex-col items-center gap-2 py-3 px-2 w-14 bg-zinc-950 border-r border-zinc-800/60">
        {workspaces.map((ws) => (
          <motion.button
            key={ws.id}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            title={ws.name}
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 transition-all",
              ws.id === currentWorkspace.id
                ? "rounded-[10px] shadow-lg ring-2 ring-white/20"
                : "rounded-2xl opacity-60 hover:opacity-100 hover:rounded-[10px]",
            )}
            style={{ background: ws.color }}
          >
            {ws.initials}
          </motion.button>
        ))}
        <div className="my-1 w-6 border-t border-zinc-700" />
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-2xl hover:rounded-[10px] transition-all bg-zinc-800 hover:bg-emerald-600 flex items-center justify-center text-zinc-400 hover:text-white"
        >
          <Plus className="w-4 h-4" />
        </motion.button>

        {/* Bottom icons */}
        <div className="mt-auto flex flex-col gap-2 items-center">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors">
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Sidebar */}
      <div className="flex flex-col flex-1 bg-zinc-900 overflow-hidden">
        {/* Workspace Header */}
        <div className="px-3 py-3 border-b border-zinc-800">
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors group">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0"
              style={{ background: currentWorkspace.color }}
            >
              {currentWorkspace.initials}
            </div>
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="text-sm font-semibold text-zinc-100 truncate leading-none">
                {currentWorkspace.name}
              </span>
              <span className="text-[10px] text-zinc-500 capitalize mt-0.5">
                {currentWorkspace.plan} plan
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-400 shrink-0" />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-2">
          <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-500 hover:text-zinc-300">
            <Search className="w-3 h-3 shrink-0" />
            <span className="text-xs">Search channels...</span>
            <kbd className="ml-auto text-[10px] bg-zinc-700 px-1.5 py-0.5 rounded text-zinc-500">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Meet CTA */}
        <div className="px-3 pb-2">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate({ to: "/meet" })}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 transition-colors group"
          >
            <div className="w-5 h-5 rounded-md bg-blue-500/30 flex items-center justify-center">
              <Video className="w-3 h-3 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-blue-400">
              Start a Meeting
            </span>
            <Zap className="w-3 h-3 text-blue-500/60 ml-auto" />
          </motion.button>
        </div>

        {/* Channel List */}
        <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1 scrollbar-thin">
          {channelCategories.map((cat) => {
            const catChannels = channels.filter((ch) =>
              cat.channelIds.includes(ch.id),
            );
            const collapsed = collapsedCats.has(cat.id);
            return (
              <div key={cat.id}>
                <button
                  onClick={() => toggleCat(cat.id)}
                  className="flex items-center gap-1 w-full px-2 py-1 rounded hover:bg-zinc-800 transition-colors group"
                >
                  {collapsed ? (
                    <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
                  )}
                  <span className="text-[10px] font-semibold tracking-widest text-zinc-500 group-hover:text-zinc-400">
                    {cat.label}
                  </span>
                  <Plus className="w-3 h-3 ml-auto text-zinc-600 opacity-0 group-hover:opacity-100 hover:text-zinc-300" />
                </button>

                <AnimatePresence>
                  {!collapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      {catChannels.map((ch) => (
                        <ChannelItem
                          key={ch.id}
                          channel={ch}
                          isActive={ch.id === activeChannelId}
                          onClick={() => {
                            setActiveChannel(ch.id);
                            navigate({
                              to: "/channels/$channelId",
                              params: { channelId: ch.id },
                            });
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Direct Messages */}
          <div>
            <button
              onClick={() => setCollapsedDms((p) => !p)}
              className="flex items-center gap-1 w-full px-2 py-1 rounded hover:bg-zinc-800 transition-colors group"
            >
              {collapsedDms ? (
                <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
              ) : (
                <ChevronDown className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
              )}
              <span className="text-[10px] font-semibold tracking-widest text-zinc-500 group-hover:text-zinc-400">
                DIRECT MESSAGES
              </span>
              <Plus className="w-3 h-3 ml-auto text-zinc-600 opacity-0 group-hover:opacity-100 hover:text-zinc-300" />
            </button>

            <AnimatePresence>
              {!collapsedDms && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  {directMessages.map((dm) => {
                    const dmUser = users.find((u) => u.id === dm.userId);
                    if (!dmUser) return null;
                    const isActive = activeDmUserId === dm.userId;
                    return (
                      <motion.button
                        key={dm.id}
                        whileHover={{ x: 2 }}
                        onClick={() => {
                          setActiveDm(dm.userId);
                          navigate({
                            to: "/dm/$userId",
                            params: { userId: dm.userId },
                          });
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors text-left",
                          isActive
                            ? "bg-zinc-700 text-zinc-100"
                            : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200",
                        )}
                      >
                        <div className="relative shrink-0">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                            style={{ background: dmUser.avatarColor }}
                          >
                            {dmUser.initials}
                          </div>
                          <div
                            className={cn(
                              "absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-zinc-900 flex items-center justify-center",
                              STATUS_COLOR[dmUser.status],
                            )}
                          />
                        </div>
                        <span
                          className={cn(
                            "text-sm truncate flex-1",
                            dm.unreadCount ? "font-semibold text-zinc-100" : "",
                          )}
                        >
                          {dmUser.name}
                          {dmUser.isBot && (
                            <span className="ml-1 text-[9px] bg-blue-500/20 text-blue-400 px-1 py-0.5 rounded">
                              APP
                            </span>
                          )}
                        </span>
                        {!!dm.unreadCount && (
                          <span className="text-[10px] bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold shrink-0">
                            {dm.unreadCount}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* User Profile Bar */}
        <div className="px-2 py-2 border-t border-zinc-800 bg-zinc-950/50">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer group">
            <div className="relative shrink-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                style={{ background: currentUser.avatarColor }}
              >
                {currentUser.initials}
              </div>
              <div
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-950",
                  STATUS_COLOR[currentUser.status],
                )}
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-zinc-200 truncate leading-none">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-zinc-500 truncate mt-0.5 capitalize">
                {currentUser.status}
              </span>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-6 h-6 rounded flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700 transition-colors">
                <Bell className="w-3 h-3" />
              </button>
              <button className="w-6 h-6 rounded flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700 transition-colors">
                <Settings className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelItem({
  channel,
  isActive,
  onClick,
}: {
  channel: Channel;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ x: 2 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors text-left",
        isActive
          ? "bg-zinc-700 text-zinc-100"
          : channel.unreadCount
            ? "text-zinc-200 hover:bg-zinc-800"
            : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300",
      )}
    >
      <ChannelIcon type={channel.type} isPrivate={channel.isPrivate} />
      <span
        className={cn(
          "text-sm truncate flex-1",
          channel.unreadCount ? "font-semibold" : "font-normal",
        )}
      >
        {channel.name}
      </span>
      {!!channel.unreadCount && (
        <span
          className={cn(
            "text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shrink-0",
            channel.unreadCount > 9 ? "px-1.5 w-auto" : "",
            isActive ? "bg-zinc-600 text-zinc-300" : "bg-blue-500 text-white",
          )}
        >
          {channel.unreadCount > 99 ? "99+" : channel.unreadCount}
        </span>
      )}
    </motion.button>
  );
}
