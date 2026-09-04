import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  cablesBootstrapQueryKey,
  cablesMessagesQueryKey,
  useCablesBootstrap,
  useCablesMessages,
} from "@/api/queries";
import {
  createCablesChannel,
  markCablesConversationRead,
  openCablesDirectConversation,
  sendCablesMessage,
} from "@/api/service";
import type {
  CablesMessage,
  CablesMessagePage,
} from "@/api/types";
import { useCablesSocket } from "@/hooks/useCablesSocket";
import { ChannelsLists } from "@/components/ChannelsLists";
import { ConversationView } from "@/components/ConversationView";

export const Route = createFileRoute("/_user/home/")({
  component: WorkspacePage,
});

function WorkspacePage() {
  const queryClient = useQueryClient();
  const [activeId, setActiveId] = useState<string | null>(null);

  const { data: bootstrap, isLoading: loadingShell } = useCablesBootstrap();
  const workspace = bootstrap?.data;

  const conversations = useMemo(
    () => workspace?.conversations ?? [],
    [workspace],
  );
  const members = workspace?.members ?? [];
  const me = workspace?.me ?? null;

  const active = conversations.find((c) => c.id === activeId) ?? null;

  const { data: messagePage, isLoading: loadingMessages } =
    useCablesMessages(activeId);

  // The API returns newest-first (it paginates backwards); the pane reads
  // oldest-first. Reversing here keeps that a rendering concern rather than
  // pushing an unnatural order onto the cursor.
  const messages = useMemo(() => {
    const page = messagePage?.data?.messages ?? [];
    return [...page].sort((a, b) => a.seq - b.seq);
  }, [messagePage]);

  /* ----------------------------- realtime ----------------------------- */

  // Subscribe to every conversation in the sidebar, not just the open one: an
  // unread badge has to move while you are looking at a different channel.
  const topics = useMemo(
    () => [
      ...conversations.map((c) => `conv:${c.id}`),
      ...(me ? [`member:${me.id}`] : []),
    ],
    [conversations, me],
  );

  const handleEvent = useCallback(
    (event: string, topic: string, data: unknown) => {
      if (event !== "message.created") return;

      const message = data as CablesMessage;
      const conversationId = topic.slice("conv:".length);

      // Write straight into the open conversation's cache so the message
      // appears without a refetch.
      if (conversationId === activeId) {
        queryClient.setQueryData(
          cablesMessagesQueryKey(conversationId),
          (previous: { data?: CablesMessagePage } | undefined) => {
            if (!previous?.data) return previous;

            const existing = previous.data.messages;

            // The sender receives its own message back. Reconcile against the
            // optimistic bubble by clientMessageId, and guard against a
            // duplicate delivery by id — the socket promises neither
            // exactly-once nor ordering.
            const alreadyThere = existing.some(
              (m) =>
                m.id === message.id ||
                (!!message.clientMessageId &&
                  m.clientMessageId === message.clientMessageId),
            );

            const withoutPending = existing.filter(
              (m) =>
                !(
                  m.id.startsWith("pending-") &&
                  m.clientMessageId === message.clientMessageId
                ),
            );

            return {
              ...previous,
              data: {
                ...previous.data,
                messages: alreadyThere
                  ? withoutPending.map((m) =>
                      m.clientMessageId === message.clientMessageId
                        ? message
                        : m,
                    )
                  : [message, ...withoutPending],
              },
            };
          },
        );
      }

      // The sidebar owns unread counts and previews, and both just changed.
      queryClient.invalidateQueries({ queryKey: cablesBootstrapQueryKey });
    },
    [activeId, queryClient],
  );

  const { status: socketStatus } = useCablesSocket({
    topics,
    onEvent: handleEvent,
    // The socket makes no delivery guarantee, so a reconnect refetches rather
    // than assuming nothing was missed while it was down.
    onResync: () => {
      queryClient.invalidateQueries({ queryKey: ["cables"] });
    },
    enabled: !!me,
  });

  /* ------------------------------ actions ----------------------------- */

  // Opening a conversation clears its badge. Sending the seq we have actually
  // rendered — rather than "all of it" — keeps the cursor honest.
  useEffect(() => {
    if (!active || active.unreadCount === 0) return;

    markCablesConversationRead(active.id, active.lastSeq)
      .then(() =>
        queryClient.invalidateQueries({ queryKey: cablesBootstrapQueryKey }),
      )
      .catch(() => {
        // A failed read receipt self-corrects on the next open.
      });
  }, [active, queryClient]);

  const handleSend = useCallback(
    async (body: string) => {
      if (!activeId || !me) return;

      const clientMessageId = crypto.randomUUID();

      // Optimistic bubble. It carries the same clientMessageId the server will
      // echo back, which is what lets the socket handler replace it rather than
      // render the message twice.
      const pending: CablesMessage = {
        id: `pending-${clientMessageId}`,
        conversationId: activeId,
        seq: Number.MAX_SAFE_INTEGER,
        senderMemberId: me.id,
        type: "TEXT",
        body,
        clientMessageId,
        isEdited: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(
        cablesMessagesQueryKey(activeId),
        (previous: { data?: CablesMessagePage } | undefined) =>
          previous?.data
            ? {
                ...previous,
                data: {
                  ...previous.data,
                  messages: [pending, ...previous.data.messages],
                },
              }
            : previous,
      );

      try {
        await sendCablesMessage(activeId, body, clientMessageId);
        // The stored row arrives over the socket and replaces the bubble; if
        // the socket is down, this refetch is what closes the gap.
        queryClient.invalidateQueries({
          queryKey: cablesMessagesQueryKey(activeId),
        });
        queryClient.invalidateQueries({ queryKey: cablesBootstrapQueryKey });
      } catch {
        // Drop the bubble so the UI does not claim a message was sent.
        queryClient.setQueryData(
          cablesMessagesQueryKey(activeId),
          (previous: { data?: CablesMessagePage } | undefined) =>
            previous?.data
              ? {
                  ...previous,
                  data: {
                    ...previous.data,
                    messages: previous.data.messages.filter(
                      (m) => m.id !== pending.id,
                    ),
                  },
                }
              : previous,
        );
      }
    },
    [activeId, me, queryClient],
  );

  const handleCreateChannel = useCallback(async () => {
    const name = window.prompt("Channel name");
    if (!name?.trim()) return;

    await createCablesChannel({ name: name.trim() });
    queryClient.invalidateQueries({ queryKey: cablesBootstrapQueryKey });
  }, [queryClient]);

  const handleStartDirect = useCallback(
    async (memberId: string) => {
      const created = await openCablesDirectConversation(memberId);
      await queryClient.invalidateQueries({ queryKey: cablesBootstrapQueryKey });
      if (created.data) setActiveId(created.data.id);
    },
    [queryClient],
  );

  if (loadingShell) {
    return (
      <div className="flex h-full items-center justify-center bg-ink">
        <p className="text-sm text-paper-muted">Connecting you to Cables…</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      <ChannelsLists
        conversations={conversations}
        members={members}
        me={me}
        activeId={activeId}
        socketStatus={socketStatus}
        onSelect={setActiveId}
        onCreateChannel={handleCreateChannel}
        onStartDirect={handleStartDirect}
      />

      <ConversationView
        conversation={active}
        messages={messages}
        members={members}
        me={me}
        isLoading={loadingMessages}
        onSend={handleSend}
      />
    </div>
  );
}
