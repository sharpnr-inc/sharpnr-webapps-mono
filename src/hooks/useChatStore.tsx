import React, { createContext, useContext, useState, useCallback } from 'react'
import { CURRENT_USER_ID, MESSAGES, CHANNEL_CATEGORIES, CHANNELS, DIRECT_MESSAGES, USERS, WORKSPACES } from '@/types/dummyData'
import type { Message, Workspace } from '@/types'


interface ChatState {
  currentUserId: string
  currentWorkspace: Workspace
  workspaces: typeof WORKSPACES
  users: typeof USERS
  channels: typeof CHANNELS
  channelCategories: typeof CHANNEL_CATEGORIES
  directMessages: typeof DIRECT_MESSAGES
  messages: Record<string, Message[]>
  activeChannelId: string | null
  activeDmUserId: string | null
  membersOpen: boolean
}

interface ChatActions {
  setActiveChannel: (id: string) => void
  setActiveDm: (userId: string) => void
  sendMessage: (channelId: string, content: string) => void
  toggleReaction: (channelId: string, messageId: string, emoji: string) => void
  toggleMembers: () => void
  markChannelRead: (channelId: string) => void
}

const ChatContext = createContext<(ChatState & ChatActions) | null>(null)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Record<string, Message[]>>(MESSAGES)
  const [channels, setChannels] = useState(CHANNELS)
  const [activeChannelId, setActiveChannelId] = useState<string | null>('ch_general')
  const [activeDmUserId, setActiveDmUserId] = useState<string | null>(null)
  const [membersOpen, setMembersOpen] = useState(true)

  const sendMessage = useCallback((channelId: string, content: string) => {
    if (!content.trim()) return
    const newMsg: Message = {
      id: `m_${Date.now()}`,
      channelId,
      authorId: CURRENT_USER_ID,
      content,
      timestamp: new Date(),
      type: 'text',
    }
    setMessages(prev => ({
      ...prev,
      [channelId]: [...(prev[channelId] ?? []), newMsg],
    }))
  }, [])

  const toggleReaction = useCallback((channelId: string, messageId: string, emoji: string) => {
    setMessages(prev => ({
      ...prev,
      [channelId]: prev[channelId].map(msg => {
        if (msg.id !== messageId) return msg
        const existing = msg.reactions?.find(r => r.emoji === emoji)
        if (existing) {
          return {
            ...msg,
            reactions: msg.reactions?.map(r =>
              r.emoji === emoji
                ? { ...r, count: r.reactedByMe ? r.count - 1 : r.count + 1, reactedByMe: !r.reactedByMe }
                : r
            ).filter(r => r.count > 0),
          }
        }
        return {
          ...msg,
          reactions: [...(msg.reactions ?? []), { emoji, count: 1, reactedByMe: true }],
        }
      }),
    }))
  }, [])

  const setActiveChannel = useCallback((id: string) => {
    setActiveChannelId(id)
    setActiveDmUserId(null)
    setChannels(prev => prev.map(ch => ch.id === id ? { ...ch, unreadCount: 0 } : ch))
  }, [])

  const setActiveDm = useCallback((userId: string) => {
    setActiveDmUserId(userId)
    setActiveChannelId(null)
  }, [])

  const markChannelRead = useCallback((id: string) => {
    setChannels(prev => prev.map(ch => ch.id === id ? { ...ch, unreadCount: 0 } : ch))
  }, [])

  const toggleMembers = useCallback(() => setMembersOpen(p => !p), [])

  const value: ChatState & ChatActions = {
    currentUserId: CURRENT_USER_ID,
    currentWorkspace: WORKSPACES[0],
    workspaces: WORKSPACES,
    users: USERS,
    channels,
    channelCategories: CHANNEL_CATEGORIES,
    directMessages: DIRECT_MESSAGES,
    messages,
    activeChannelId,
    activeDmUserId,
    membersOpen,
    sendMessage,
    toggleReaction,
    setActiveChannel,
    setActiveDm,
    markChannelRead,
    toggleMembers,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}

export function useUser(id: string) {
  const { users } = useChat()
  return users.find(u => u.id === id)
}

export function useChannel(id: string | null) {
  const { channels } = useChat()
  if (!id) return null
  return channels.find(c => c.id === id) ?? null
}

export function useMessages(channelId: string | null) {
  const { messages } = useChat()
  if (!channelId) return []
  return messages[channelId] ?? []
}