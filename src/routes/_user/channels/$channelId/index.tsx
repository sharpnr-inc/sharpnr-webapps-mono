import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/TopBar";
import { ChatArea } from "@/components/ChatArea";
import { MessageInput } from "@/components/MessageInput";
import { MembersPanel } from "@/components/MembersPanel";
import { useChat } from "@/hooks/useChatStore";

export const Route = createFileRoute("/_user/channels/$channelId/")({
  component: ChannelPage,
});

function ChannelPage() {
  const { channelId } = Route.useParams();
  const { setActiveChannel, channels } = useChat();
  const navigate = useNavigate();

  const channel = channels.find((c) => c.id === channelId);

  useEffect(() => {
    if (channel) setActiveChannel(channelId);
    else
      navigate({
        to: "/channels/$channelId",
        params: { channelId: "ch_general" },
      });
  }, [channelId]);

  if (!channel) return null;

  return (
    <motion.div
      key={channelId}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18 }}
      className="flex flex-col h-full overflow-hidden"
    >
      <TopBar type="channel" id={channelId} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden">
          <ChatArea channelId={channelId} />
          <MessageInput channelId={channelId} />
        </div>
        <MembersPanel channelId={channelId} />
      </div>
    </motion.div>
  );
}
