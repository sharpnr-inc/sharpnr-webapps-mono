export type UserStatus = "online" | "away" | "busy" | "offline";
export type UserRole = "admin" | "member" | "guest" | "bot";
export type ChannelType = "text" | "voice" | "announcement";
export type WorkspacePlan = "free" | "pro" | "enterprise";
export type MessageType = "text" | "system";

export interface User {
  id: string;
  name: string;
  username: string;
  initials: string;
  avatarColor: string;
  status: UserStatus;
  role: UserRole;
  title?: string;
  isBot?: boolean;
}

export interface Reaction {
  emoji: string;
  count: number;
  reactedByMe: boolean;
}

export interface Message {
  id: string;
  content: string;
  authorId: string;
  channelId: string;
  timestamp: Date;
  isEdited?: boolean;
  reactions?: Reaction[];
  replyToId?: string;
  type: MessageType;
  isPinned?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: ChannelType;
  category: string;
  isPrivate: boolean;
  memberIds: string[];
  unreadCount?: number;
  isMuted?: boolean;
  topic?: string;
}

export interface ChannelCategory {
  id: string;
  label: string;
  channelIds: string[];
}

export interface DirectMessage {
  id: string;
  userId: string;
  unreadCount?: number;
}

export interface Workspace {
  id: string;
  name: string;
  initials: string;
  color: string;
  plan: WorkspacePlan;
  memberCount: number;
}
