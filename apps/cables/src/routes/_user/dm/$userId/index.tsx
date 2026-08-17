import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/TopBar";
import { ChatArea } from "@/components/ChatArea";
import { MessageInput } from "@/components/MessageInput";
import { useChat } from "@/hooks/useChatStore";

export const Route = createFileRoute("/_user/dm/$userId/")({
  component: DMPage,
});

function DMPage() {
  const { userId } = Route.useParams();
  const { setActiveDm, users } = useChat();
  const dmUser = users.find((u) => u.id === userId);

  // DM channel ID pattern: dm_{userId}
  const channelId = `dm_${userId.replace("u_", "")}`;

  useEffect(() => {
    setActiveDm(userId);
  }, [userId, setActiveDm]);

  if (!dmUser)
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-zinc-600">User not found</p>
      </div>
    );

  return (
    <motion.div
      key={userId}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18 }}
      className="flex flex-col h-full overflow-hidden"
    >
      <TopBar type="dm" id={userId} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <ChatArea channelId={channelId} />
        <MessageInput
          channelId={channelId}
          placeholder={`Message ${dmUser.name}`}
        />
      </div>
    </motion.div>
  );
}
