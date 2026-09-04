import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  fetchBootstrap,
  fetchConversations,
  fetchMessages,
  markRead,
  openDirect,
  postMessage,
} from "./api";
import { useCablesSocket } from "./useCablesSocket";
import type {
  CablesConversation,
  CablesMember,
  CablesMessage,
} from "./types";

/**
 * All the state the docked window needs, with no assumption about the host
 * app's data layer.
 *
 * Deliberately plain React state rather than react-query: this thing gets
 * mounted in apps that may not have a QueryClientProvider anywhere near it, and
 * a widget that crashes an unrelated app because of a missing provider is worse
 * than one that manages a few fetches itself.
 *
 * The same rule governs failure: every request here is allowed to fail
 * silently. An org that never started cables, a signed-out session, a backend
 * that is down — all of them leave `available` false and the widget renders
 * nothing, rather than surfacing an error into an app that is not cables.
 */
export function useCablesDirects() {
  const [available, setAvailable] = useState(false);
  const [me, setMe] = useState<CablesMember | null>(null);
  const [members, setMembers] = useState<CablesMember[]>([]);
  const [conversations, setConversations] = useState<CablesConversation[]>([]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<CablesMessage[]>([]);
  const [loadingThread, setLoadingThread] = useState(false);

  // Read inside callbacks that must not re-create themselves on every change.
  const activeIdRef = useRef<string | null>(null);
  activeIdRef.current = activeId;

  /* ------------------------------ loading ------------------------------ */

  const loadShell = useCallback(async () => {
    try {
      const data = await fetchBootstrap();
      if (!data?.account.isActive) {
        setAvailable(false);
        return;
      }
      setMe(data.me);
      setMembers(data.members);
      setConversations(data.conversations);
      setAvailable(true);
    } catch {
      setAvailable(false);
    }
  }, []);

  const refreshConversations = useCallback(async () => {
    try {
      setConversations(await fetchConversations());
    } catch {
      // Keep whatever is on screen; the next event or reconnect retries.
    }
  }, []);

  useEffect(() => {
    void loadShell();
  }, [loadShell]);

  /* ------------------------------ realtime ----------------------------- */

  // Only two topics, whatever the org's size: this member's own topic, plus the
  // open thread.
  //
  // The member topic is the important one. A DM from somebody you have never
  // spoken to lands on a conversation you have no reason to be subscribed to,
  // so the server mirrors direct messages onto each participant's own topic —
  // that is what lets a DM reach you inside an app that is not cables.
  const topics = useMemo(() => {
    if (!me) return [];
    const list = [`member:${me.id}`];
    if (activeId) list.push(`conv:${activeId}`);
    return list;
  }, [me, activeId]);

  const handleEvent = useCallback(
    (event: string, _topic: string, data: unknown) => {
      if (event !== "message.created") return;

      const message = data as CablesMessage;

      // The same message can arrive twice — once on the conversation topic and
      // once on the member topic — so appending is guarded by id.
      if (message.conversationId === activeIdRef.current) {
        setMessages((current) =>
          current.some(
            (m) =>
              m.id === message.id ||
              (!!message.clientMessageId &&
                m.clientMessageId === message.clientMessageId),
          )
            ? current.map((m) =>
                m.clientMessageId &&
                m.clientMessageId === message.clientMessageId
                  ? message
                  : m,
              )
            : [...current, message],
        );
      }

      // Unread counts and previews live on the conversation list.
      void refreshConversations();
    },
    [refreshConversations],
  );

  const socketStatus = useCablesSocket({
    topics,
    onEvent: handleEvent,
    // The socket guarantees nothing, so a reconnect refetches rather than
    // assuming nothing was missed while it was down.
    onResync: () => {
      void refreshConversations();
      const id = activeIdRef.current;
      if (id) void openConversationRef.current?.(id);
    },
    enabled: available && !!me,
  });

  /* ------------------------------- actions ----------------------------- */

  const openConversation = useCallback(async (conversationId: string) => {
    setActiveId(conversationId);
    setLoadingThread(true);
    try {
      const page = await fetchMessages(conversationId);
      // The API paginates backwards (newest first); the pane reads oldest
      // first. Sorting on seq rather than createdAt, because two messages can
      // share a millisecond.
      setMessages([...page.messages].sort((a, b) => a.seq - b.seq));
    } catch {
      setMessages([]);
    } finally {
      setLoadingThread(false);
    }
  }, []);

  // Held in a ref so onResync can reach the latest version without making the
  // socket re-subscribe every time this callback is re-created.
  const openConversationRef = useRef(openConversation);
  useEffect(() => {
    openConversationRef.current = openConversation;
  });

  // Opening a conversation clears its badge.
  useEffect(() => {
    if (!activeId) return;
    const conversation = conversations.find((c) => c.id === activeId);
    if (!conversation || conversation.unreadCount === 0) return;

    markRead(activeId, conversation.lastSeq)
      .then(refreshConversations)
      .catch(() => {
        // A dropped read receipt self-corrects the next time it is opened.
      });
  }, [activeId, conversations, refreshConversations]);

  const send = useCallback(
    async (body: string) => {
      const conversationId = activeIdRef.current;
      if (!conversationId || !me) return;

      const clientMessageId = crypto.randomUUID();

      // Optimistic bubble carrying the id the server will echo back, so the
      // socket replaces it instead of rendering the message twice.
      const pending: CablesMessage = {
        id: `pending-${clientMessageId}`,
        conversationId,
        seq: Number.MAX_SAFE_INTEGER,
        senderMemberId: me.id,
        type: "TEXT",
        body,
        clientMessageId,
        isEdited: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
      };
      setMessages((current) => [...current, pending]);

      try {
        const stored = await postMessage(conversationId, body, clientMessageId);
        if (stored) {
          setMessages((current) =>
            current.map((m) => (m.id === pending.id ? stored : m)),
          );
        }
        void refreshConversations();
      } catch {
        // Drop the bubble rather than claim a message was sent.
        setMessages((current) => current.filter((m) => m.id !== pending.id));
      }
    },
    [me, refreshConversations],
  );

  const startDirect = useCallback(
    async (memberId: string) => {
      try {
        const conversation = await openDirect(memberId);
        if (!conversation) return;
        await refreshConversations();
        void openConversation(conversation.id);
      } catch {
        // Nothing to show — the picker stays open.
      }
    },
    [openConversation, refreshConversations],
  );

  /* ------------------------------- derived ----------------------------- */

  const directs = useMemo(
    () => conversations.filter((c) => c.type === "DIRECT"),
    [conversations],
  );

  // The launcher badge counts DMs only. Channel noise does not belong on a
  // button that lives in another product.
  const unreadTotal = useMemo(
    () => directs.reduce((total, c) => total + c.unreadCount, 0),
    [directs],
  );

  const membersById = useMemo(
    () => new Map(members.map((m) => [m.id, m])),
    [members],
  );

  return {
    available,
    me,
    members,
    membersById,
    directs,
    unreadTotal,
    activeId,
    messages,
    loadingThread,
    socketStatus,
    openConversation,
    startDirect,
    send,
    closeConversation: () => setActiveId(null),
  };
}
