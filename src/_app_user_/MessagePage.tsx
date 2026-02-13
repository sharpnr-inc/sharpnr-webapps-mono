import React from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const channels = [
  { id: 1, name: "General", lastMessage: "Meeting at 5 PM" },
  { id: 2, name: "Development", lastMessage: "API deployed" },
  { id: 3, name: "Support", lastMessage: "Ticket #342 resolved" },
  { id: 4, name: "Marketing", lastMessage: "Campaign live 🚀" },
]

const messages = [
  { id: 1, sender: "John", content: "Hey, is the deployment done?", mine: false },
  { id: 2, sender: "Me", content: "Yes, production is updated.", mine: true },
  { id: 3, sender: "John", content: "Perfect 👍", mine: false },
]

const MessagePage = () => {
  return (
    <div className="flex h-[90vh] bg-muted/40 p-4 gap-4">
      
      {/* Message Section (Left - Main) */}
      <Card className="flex-1 flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">General</h2>
          <span className="text-sm text-muted-foreground">3 Members</span>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-2 max-w-[60%] ${
                    msg.mine ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {msg.sender.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`rounded-2xl px-4 py-2 text-sm ${
                      msg.mine
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input placeholder="Type your message..." />
            <Button>Send</Button>
          </div>
        </div>
      </Card>

      {/* Channels Section (Right Sidebar) */}
      <Card className="w-[300px] flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Channels</h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="p-3 rounded-xl hover:bg-muted cursor-pointer transition"
              >
                <p className="font-medium">{channel.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {channel.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

    </div>
  )
}

export default MessagePage
