import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "@sharpnr/env";
import type { CablesSocketFrame } from "@/api/types";

/**
 * @file useCablesSocket
 * @description One websocket for the whole app, multiplexed by topic.
 *
 * ─── WHAT THIS IS AND IS NOT ──────────────────────────────────────────────────
 * The socket carries fan-out only. Sending a message is an ordinary POST — that
 * is where authorization, validation and idempotency live, and none of that
 * belongs on a socket frame. Nothing is ever written up this connection except
 * subscribe/unsubscribe.
 *
 * ─── DELIVERY IS BEST-EFFORT, ON PURPOSE ──────────────────────────────────────
 * The server drops a client that cannot keep up rather than buffering for it,
 * so this connection can and will miss messages. That is safe because every
 * message carries a per-conversation `seq`: on reconnect the caller refetches
 * the conversation and the gap closes. Do not build anything here that assumes
 * every frame arrives.
 *
 * ─── AUTH ─────────────────────────────────────────────────────────────────────
 * The handshake is authenticated by the session cookie the browser attaches on
 * its own — a browser cannot set headers on a websocket upgrade, so there is no
 * bearer token to pass. `credentials` is implicit for same-site cookies; the
 * API and this app must therefore stay on the same registered origin set, which
 * is what the server's Origin allow-list enforces.
 */

/** ws(s):// twin of the configured API base. */
function socketUrl(): string {
  const base = new URL(config.apiBaseUrl, window.location.origin);
  base.protocol = base.protocol === "https:" ? "wss:" : "ws:";
  base.pathname = `${base.pathname.replace(/\/$/, "")}/ws`;
  return base.toString();
}

export type CablesSocketStatus = "connecting" | "open" | "closed";

type Options = {
  /** Topics to hold a subscription on. Changing the list re-subscribes. */
  topics: string[];
  /** Called for every `event` frame. Kept in a ref so it never re-subscribes. */
  onEvent: (event: string, topic: string, data: unknown) => void;
  /**
   * Called after a reconnect, once subscriptions are re-established. This is
   * the resync hook: the socket may have missed messages while it was down, so
   * the caller refetches rather than assuming continuity.
   */
  onResync?: () => void;
  enabled?: boolean;
};

export function useCablesSocket({
  topics,
  onEvent,
  onResync,
  enabled = true,
}: Options) {
  const [status, setStatus] = useState<CablesSocketStatus>("closed");

  const socketRef = useRef<WebSocket | null>(null);
  const retryRef = useRef(0);
  const reconnectTimerRef = useRef<number | null>(null);
  const hasConnectedRef = useRef(false);

  // Callbacks live in refs so that a parent re-render — which happens on every
  // received message — does not tear down and rebuild the connection.
  const onEventRef = useRef(onEvent);
  const onResyncRef = useRef(onResync);

  // Assigned in an effect rather than during render: refs are not render state,
  // and the React compiler rules reject touching them mid-render.
  useEffect(() => {
    onEventRef.current = onEvent;
    onResyncRef.current = onResync;
  });

  // Serialised so the effect below depends on the topic *contents* rather than
  // on the array identity, which changes on every render.
  const topicKey = topics.slice().sort().join(",");

  const send = useCallback((payload: unknown) => {
    const socket = socketRef.current;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let disposed = false;

    const connect = () => {
      if (disposed) return;

      setStatus("connecting");
      const socket = new WebSocket(socketUrl());
      socketRef.current = socket;

      socket.onopen = () => {
        if (disposed) return;
        retryRef.current = 0;
        setStatus("open");

        if (topicKey) {
          socket.send(JSON.stringify({ t: "sub", topics: topicKey.split(",") }));
        }

        // A first connect is not a resync — the caller has just loaded its data.
        // Every later one is, because the socket was down and messages may have
        // landed in the meantime.
        if (hasConnectedRef.current) onResyncRef.current?.();
        hasConnectedRef.current = true;
      };

      socket.onmessage = (raw) => {
        let frame: CablesSocketFrame;
        try {
          frame = JSON.parse(raw.data as string);
        } catch {
          return;
        }

        if (frame.t === "event") {
          onEventRef.current(frame.event, frame.topic, frame.data);
        }
        // "err" frames are expected in normal use — asking for a channel you
        // just left is a denial, not a failure — so they do not close anything.
      };

      socket.onclose = () => {
        if (disposed) return;
        setStatus("closed");

        // Backoff capped at 15s: a server restart should not be met with a
        // reconnect storm from every open tab in the org.
        const delay = Math.min(1000 * 2 ** retryRef.current, 15000);
        retryRef.current += 1;
        reconnectTimerRef.current = window.setTimeout(connect, delay);
      };

      socket.onerror = () => socket.close();
    };

    connect();

    return () => {
      disposed = true;
      if (reconnectTimerRef.current) {
        window.clearTimeout(reconnectTimerRef.current);
      }
      socketRef.current?.close();
      socketRef.current = null;
    };
    // topicKey is intentionally a dependency: a changed subscription set needs a
    // fresh subscribe, and reconnecting is the simplest correct way to get one.
  }, [enabled, topicKey]);

  return { status, send };
}
