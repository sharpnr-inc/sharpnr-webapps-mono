/**
 * Response returned from the identity service
 * when verifying whether a user session is authenticated.
 */
export interface UserAuthenticatedResponse {
  /**
   * Indicates whether the current session is authenticated
   */
  authenticated: boolean;

  /**
   * Unique identifier of the authenticated user (employee ID)
   */
  user_id: string;

  /**
   * Organization identifier the user belongs to
   */
  org_id: string;
}

/* ---------------------------------- <***> --------------------------------- */

export type UserDataResponseDto = {
  email: string;
  firstName: string;
  lastName: string;
  id: string; // UUID
  role: string;
  org_data: OrgData;
};

export type OrgData = {
  org_name: string;
  sharp_id: string;
};

/* ---------------------------------- <***> --------------------------------- */

export type SetupWizOverallSetupStatus =
  "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type SetupWizStepType =
  "SUPER_ADMIN_PROFILE" | "ORGANIZATION_DETAILS_UPDATES" | "OPERATIONS_SETUP";

export type StepWizStepProgressStatus = "IN_PROGRESS" | "COMPLETED" | "SKIPPED";

export type SetupProgressResponseDTO = {
  overall_status: SetupWizOverallSetupStatus;
  current_step?: SetupWizStepType;
  is_completed: boolean;
  steps: SetupStepProgressResponseDTO[];
};

export type SetupStepProgressResponseDTO = {
  id: string;
  step: SetupWizStepType;
  status: StepWizStepProgressStatus;
  version: number;
  started_at: string;
  completed_at?: string;
};

/* ---------------------------------- <***> --------------------------------- */

/**
 * Cables service state for the signed-in user's organisation.
 *
 * The org provisions Cables from the orchestrator, so this app can only read
 * the state — never start it.
 */
export interface CablesServiceResponseDto {
  /** The org has provisioned a Cables account at least once. */
  isStarted: boolean;
  /** The Cables service is currently live for this org. */
  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Cables workspace                              */
/* -------------------------------------------------------------------------- */

/**
 * A cables identity — an employee, a bot, or (later) a meeting guest.
 *
 * Messages address members rather than employees, which is why `employeeId` is
 * optional: a bot posting build results has no employee row. The roster is
 * cached client-side and every author name, DM title and mention is rendered
 * from it, so a message payload only ever carries a `senderMemberId`.
 */
export type CablesMember = {
  id: string;
  employeeId?: string;
  type: "EMPLOYEE" | "BOT" | "GUEST";
  displayName: string;
  avatarUrl?: string;
  presence: "ONLINE" | "AWAY" | "DND" | "OFFLINE";
};

export type CablesConversationType = "CHANNEL" | "DIRECT" | "GROUP" | "MEETING";

/**
 * One row of the sidebar. A channel and a DM are the same shape because they
 * are both conversations — the only difference is that a channel carries its
 * own name and a DM points at the other member for the client to resolve.
 */
export type CablesConversation = {
  id: string;
  type: CablesConversationType;

  channelId?: string;
  name?: string;
  slug?: string;
  channelType?: "TEXT" | "AUDIO" | "VIDEO";

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
  subType?: string;
  body: string;
  clientMessageId?: string;
  isEdited: boolean;
  isDeleted: boolean;
  createdAt: string;
  editedAt?: string;
};

/**
 * One page of history, newest first. `nextCursor` is the seq to pass as
 * `before=` for the page above it, and is absent once the top of the
 * conversation is reached.
 */
export type CablesMessagePage = {
  messages: CablesMessage[];
  hasMore: boolean;
  nextCursor?: number;
};

/**
 * Everything the shell needs to render, in one round trip.
 *
 * Deliberately excludes messages: those load per conversation, so this payload
 * is the same size whether the org has a day of history or a year.
 */
export type CablesBootstrap = {
  me: CablesMember;
  account: CablesServiceResponseDto;
  conversations: CablesConversation[];
  members: CablesMember[];
};

/* -------------------------------------------------------------------------- */
/*                              Realtime frames                               */
/* -------------------------------------------------------------------------- */

/** What the server sends down the socket. */
export type CablesSocketFrame =
  | { t: "subbed"; topics: string[] }
  | { t: "pong" }
  | { t: "err"; topic?: string; code: string; reason: string }
  | { t: "event"; topic: string; event: string; data: unknown };

/** One channel in the browser list. */
export type ChannelResponseDto = {
  id: string;
  conversationId: string;
  name: string;
  slug: string;
  topic?: string;
  description?: string;
  type: "TEXT" | "AUDIO" | "VIDEO";
  visibility: "PUBLIC" | "PRIVATE";
  isDefault: boolean;
  isArchived: boolean;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
};
