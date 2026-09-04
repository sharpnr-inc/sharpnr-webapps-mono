/**
 * Wire shapes for the cables workspace API.
 *
 * A trimmed copy of what the cables app itself uses — only the parts a docked
 * DM window needs. Channels, threads, calls and meetings are deliberately
 * absent: this widget is not a second cables client, and every field it carries
 * is one more thing to keep in step with the backend.
 */

export type CablesMember = {
  id: string;
  employeeId?: string;
  type: "EMPLOYEE" | "BOT" | "GUEST";
  displayName: string;
  avatarUrl?: string;
  presence: "ONLINE" | "AWAY" | "DND" | "OFFLINE";
};

export type CablesConversation = {
  id: string;
  type: "CHANNEL" | "DIRECT" | "GROUP" | "MEETING";
  channelId?: string;
  name?: string;
  slug?: string;
  otherMemberId?: string;
  lastSeq: number;
  lastMessageAt?: string;
  lastMessageBrief?: string;
  unreadCount: number;
  unreadMentions: number;
  isMuted: boolean;
  isPinned: boolean;
  memberCount: number;
};

export type CablesMessage = {
  id: string;
  conversationId: string;
  seq: number;
  senderMemberId?: string;
  type: "TEXT" | "FILE" | "SYSTEM" | "CALL";
  body: string;
  clientMessageId?: string;
  isEdited: boolean;
  isDeleted: boolean;
  createdAt: string;
};

export type CablesBootstrap = {
  me: CablesMember;
  account: { isStarted: boolean; isActive: boolean };
  conversations: CablesConversation[];
  members: CablesMember[];
};

export type CablesMessagePage = {
  messages: CablesMessage[];
  hasMore: boolean;
  nextCursor?: number;
};

/** The server's frame envelope. */
export type CablesSocketFrame =
  | { t: "subbed"; topics: string[] }
  | { t: "pong" }
  | { t: "err"; topic?: string; code: string; reason: string }
  | { t: "event"; topic: string; event: string; data: unknown };
