import { useEffect, useRef, useState } from "react";
import { config } from "@sharpnr/env";
import type { CablesSocketFrame } from "./types";

/**
 * One websocket, shared by whatever this widget is rendering.
 *
 * Delivery is best-effort by design: the server drops a client that falls
 * behind rather than buffering for it. That is safe because every message
 * carries a per-conversation `seq`, so a reconnect refetches and the gap
 * closes. Nothing here may assume every frame arrives.
 *
 * The handshake authenticates on the session cookie the browser attaches by
 * itself — a browser cannot set headers on an upgrade — which is also why the
 * server keeps an Origin allow-list. Every app that mounts this must therefore
 * be on an allowed origin, or the socket is refused while the REST calls keep
 * working.
 */

function socketUrl(): string {
  const url = new URL(config.apiBaseUrl, window.location.origin);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = `${url.pathname.replace(/\/$/, "")}/ws`;
  return url.toString();
}

export type SocketStatus = "connecting" | "open" | "closed";

export function useCablesSocket({
  topics,
  onEvent,
  onResync,
  enabled,
}: {
  topics: string[];
  onEvent: (event: string, topic: string, data: unknown) => void;
  onResync?: () => void;
  enabled: boolean;
}) {
  const [status, setStatus] = useState<SocketStatus>("closed");

  const socketRef = useRef<WebSocket | null>(null);
  const retryRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const connectedBeforeRef = useRef(false);

  const onEventRef = useRef(onEvent);
  const onResyncRef = useRef(onResync);

  // Assigned in an effect, never during render: a ref is not render state.
  useEffect(() => {
    onEventRef.current = onEvent;
    onResyncRef.current = onResync;
  });

  // Depend on the topic contents rather than the array identity, which changes
  // on every render of the host app.
  const topicKey = topics.slice().sort().join(",");

  useEffect(() => {
    if (!enabled || !topicKey) return;

    let disposed = false;

    const connect = () => {
      if (disposed) return;

      setStatus("connecting");

      let socket: WebSocket;
      try {
        socket = new WebSocket(socketUrl());
      } catch {
        // A malformed base URL must not take the host app down with it.
        setStatus("closed");
        return;
      }
      socketRef.current = socket;

      socket.onopen = () => {
        if (disposed) return;
        retryRef.current = 0;
        setStatus("open");
        socket.send(JSON.stringify({ t: "sub", topics: topicKey.split(",") }));

        // The first connect is not a resync — the caller just loaded its data.
        // Every later one is, because the socket was down in between.
        if (connectedBeforeRef.current) onResyncRef.current?.();
        connectedBeforeRef.current = true;
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
      };

      socket.onclose = () => {
        if (disposed) return;
        setStatus("closed");

        // Capped backoff: a backend restart must not be answered by a
        // reconnect storm from every tab in the org.
        const delay = Math.min(1000 * 2 ** retryRef.current, 15000);
        retryRef.current += 1;
        timerRef.current = window.setTimeout(connect, delay);
      };

      socket.onerror = () => socket.close();
    };

    connect();

    return () => {
      disposed = true;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [enabled, topicKey]);

  return status;
}
