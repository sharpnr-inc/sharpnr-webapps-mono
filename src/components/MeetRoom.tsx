import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  PhoneOff,
  Users,
  MessageSquare,
  Hand,
  Smile,
  MoreHorizontal,
  Maximize2,
  LayoutGrid,
  Wifi,
  Shield,
} from "lucide-react";
import { useChat } from "@/hooks/useChatStore";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { User } from "../types";

const MEET_PARTICIPANTS = [
  "u_alex",
  "u_sarah",
  "u_theo",
  "u_priya",
  "u_jordan",
];
const SPEAKING_USER = "u_theo";

function VideoTile({
  user,
  isSpeaking,
  isMuted,
  isLarge = false,
}: {
  user: User;
  isSpeaking: boolean;
  isMuted: boolean;
  isCamOff: boolean;
  isLarge?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-xl overflow-hidden flex items-center justify-center",
        isSpeaking
          ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-950"
          : "",
        isLarge ? "aspect-video" : "aspect-video",
      )}
      style={{
        background: `linear-gradient(135deg, ${user.avatarColor}33 0%, ${user.avatarColor}11 100%)`,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Fake video shimmer */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: `linear-gradient(45deg, ${user.avatarColor}40, transparent, ${user.avatarColor}20)`,
          backgroundSize: "200% 200%",
        }}
      />

      {/* Avatar */}
      <div
        className="rounded-full flex items-center justify-center font-bold text-white shadow-xl relative z-10"
        style={{
          background: user.avatarColor,
          width: isLarge ? 72 : 48,
          height: isLarge ? 72 : 48,
          fontSize: isLarge ? 24 : 16,
        }}
      >
        {user.initials}
      </div>

      {/* Speaking indicator */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-2 left-2 flex items-center gap-1 bg-blue-500/90 rounded-md px-1.5 py-0.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
                className="w-0.5 h-3 bg-white rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name tag */}
      <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
        {!isSpeaking && (
          <span className="text-xs font-medium text-white/90 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md truncate max-w-full">
            {user.name}
          </span>
        )}
        {isMuted && (
          <div className="ml-auto bg-red-500/90 rounded-md p-1">
            <MicOff className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ControlBtn({
  icon,
  label,
  active = false,
  danger = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      title={label}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-16",
        danger
          ? "bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-500/30"
          : active
            ? "bg-zinc-700 text-zinc-100"
            : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200",
      )}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </motion.button>
  );
}

function MeetingTimer() {
  const [seconds, setSeconds] = useState(743);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return (
    <span className="font-mono text-sm text-zinc-400">
      {m}:{s.toString().padStart(2, "0")}
    </span>
  );
}

export function MeetRoom() {
  const { users } = useChat();
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenOn, setScreenOn] = useState(false);
  const [layout, setLayout] = useState<"grid" | "spotlight">("grid");
  const [sidePanel, setSidePanel] = useState<null | "chat" | "participants">(
    "participants",
  );

  const participants = users.filter((u) => MEET_PARTICIPANTS.includes(u.id));

  const leave = () =>
    navigate({
      to: "/channels/$channelId",
      params: { channelId: "ch_general" },
    });

  return (
    <div className="flex flex-col flex-1 h-screen bg-zinc-950 overflow-hidden">
      {/* Meet Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-zinc-800/60 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-zinc-200">
              Sharpnr HQ
            </span>
          </div>
          <div className="w-px h-4 bg-zinc-800" />
          <span className="text-sm text-zinc-500">Q2 Planning Sync</span>
          <div className="w-px h-4 bg-zinc-800" />
          <MeetingTimer />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-zinc-800/60 px-2.5 py-1 rounded-lg">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span className="text-xs text-zinc-400">HD</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-800/60 px-2.5 py-1 rounded-lg">
            <Shield className="w-3 h-3 text-blue-400" />
            <span className="text-xs text-zinc-400">E2E Encrypted</span>
          </div>
          <button
            onClick={() =>
              setLayout((l) => (l === "grid" ? "spotlight" : "grid"))
            }
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            {layout === "grid" ? (
              <LayoutGrid className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 p-4 overflow-hidden flex flex-col gap-3">
          {layout === "grid" ? (
            <div
              className={cn(
                "grid gap-3 flex-1",
                participants.length <= 2
                  ? "grid-cols-2"
                  : participants.length <= 4
                    ? "grid-cols-2"
                    : "grid-cols-3",
              )}
            >
              {participants.map((user) => (
                <VideoTile
                  key={user.id}
                  user={user}
                  isSpeaking={user.id === SPEAKING_USER}
                  isMuted={user.id !== "u_sarah" && user.id !== "u_theo"}
                  isCamOff={user.id === "u_jordan"}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 flex-1">
              {/* Spotlight */}
              <div className="flex-1">
                <VideoTile
                  user={participants.find((u) => u.id === SPEAKING_USER)!}
                  isSpeaking
                  isMuted={false}
                  isCamOff={false}
                  isLarge
                />
              </div>
              {/* Strip */}
              <div className="flex gap-2 h-24">
                {participants
                  .filter((u) => u.id !== SPEAKING_USER)
                  .map((user) => (
                    <div key={user.id} className="flex-1">
                      <VideoTile
                        user={user}
                        isSpeaking={false}
                        isMuted={user.id !== "u_sarah"}
                        isCamOff={user.id === "u_jordan"}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <AnimatePresence>
          {sidePanel && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="border-l border-zinc-800 bg-zinc-900 flex flex-col overflow-hidden"
            >
              <div className="flex items-center border-b border-zinc-800 px-3">
                {(["participants", "chat"] as const).map((panel) => (
                  <button
                    key={panel}
                    onClick={() => setSidePanel(panel)}
                    className={cn(
                      "px-3 py-2.5 text-xs font-medium capitalize transition-colors border-b-2",
                      sidePanel === panel
                        ? "text-blue-400 border-blue-500"
                        : "text-zinc-500 border-transparent hover:text-zinc-300",
                    )}
                  >
                    {panel}
                  </button>
                ))}
                <button
                  onClick={() => setSidePanel(null)}
                  className="ml-auto w-6 h-6 rounded flex items-center justify-center text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800 transition-colors text-xs"
                >
                  ✕
                </button>
              </div>

              {sidePanel === "participants" ? (
                <div className="flex-1 overflow-y-auto p-2">
                  <div className="text-[10px] font-semibold tracking-widest text-zinc-600 px-2 py-1 mb-1">
                    IN THIS CALL — {participants.length}
                  </div>
                  {participants.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: user.avatarColor }}
                      >
                        {user.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-zinc-300 truncate">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-zinc-600">
                          {user.title}
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {user.id !== "u_sarah" && user.id !== "u_theo" && (
                          <MicOff className="w-3 h-3 text-red-400" />
                        )}
                        {user.id === SPEAKING_USER && (
                          <motion.div
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-3 h-3 rounded-full bg-blue-500"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col flex-1 overflow-hidden">
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-xs text-zinc-600 text-center px-4">
                      Meeting chat messages will appear here
                    </p>
                  </div>
                  <div className="p-3 border-t border-zinc-800">
                    <input
                      placeholder="Send a message..."
                      className="w-full bg-zinc-800 text-sm text-zinc-300 placeholder:text-zinc-600 px-3 py-2 rounded-lg outline-none border border-zinc-700 focus:border-zinc-600"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls Bar */}
      <div className="h-20 border-t border-zinc-800/60 flex items-center justify-center gap-2 px-6 shrink-0 bg-zinc-950/80 backdrop-blur-sm">
        <ControlBtn
          icon={
            micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />
          }
          label={micOn ? "Mute" : "Unmute"}
          active={!micOn}
          onClick={() => setMicOn((p) => !p)}
        />
        <ControlBtn
          icon={
            camOn ? (
              <Video className="w-5 h-5" />
            ) : (
              <VideoOff className="w-5 h-5" />
            )
          }
          label={camOn ? "Stop Video" : "Start Video"}
          active={!camOn}
          onClick={() => setCamOn((p) => !p)}
        />
        <ControlBtn
          icon={<Monitor className="w-5 h-5" />}
          label="Share Screen"
          active={screenOn}
          onClick={() => setScreenOn((p) => !p)}
        />
        <ControlBtn
          icon={<Hand className="w-5 h-5" />}
          label="Raise Hand"
          onClick={() => {}}
        />
        <ControlBtn
          icon={<Smile className="w-5 h-5" />}
          label="React"
          onClick={() => {}}
        />

        <div className="w-px h-8 bg-zinc-800 mx-1" />

        <ControlBtn
          icon={<Users className="w-5 h-5" />}
          label="Participants"
          active={sidePanel === "participants"}
          onClick={() =>
            setSidePanel((p) => (p === "participants" ? null : "participants"))
          }
        />
        <ControlBtn
          icon={<MessageSquare className="w-5 h-5" />}
          label="Chat"
          active={sidePanel === "chat"}
          onClick={() => setSidePanel((p) => (p === "chat" ? null : "chat"))}
        />
        <ControlBtn
          icon={<MoreHorizontal className="w-5 h-5" />}
          label="More"
          onClick={() => {}}
        />

        <div className="w-px h-8 bg-zinc-800 mx-1" />

        <ControlBtn
          icon={<PhoneOff className="w-5 h-5" />}
          label="Leave"
          danger
          onClick={leave}
        />
      </div>
    </div>
  );
}
