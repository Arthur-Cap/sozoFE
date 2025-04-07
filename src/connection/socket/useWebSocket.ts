import { useState, useRef, useEffect, useCallback } from "react";

export interface WebSocketOptions {
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

export interface WebSocketHook {
  sendMessage: (message: string) => void;
  lastMessage: MessageEvent | null;
  readyState: number;
  error: Event | null;
  messages: MessageEvent[];
  socket: WebSocket | null;
}

const useWebSocket = (
  url: string,
  protocols?: string | string[],
  options?: WebSocketOptions
): WebSocketHook => {
  const { autoReconnect = false, reconnectInterval = 3000 } = options || {};

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const [messages, setMessages] = useState<MessageEvent[]>([]);
  const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED);
  const [error, setError] = useState<Event | null>(null);

  const connect = useCallback(() => {
    socketRef.current = new WebSocket(url, protocols);
    setReadyState(WebSocket.CONNECTING);

    socketRef.current.onopen = () => {
      setReadyState(WebSocket.OPEN);
      setError(null);
      console.log("WebSocket connected");
    };

    socketRef.current.onmessage = (event: MessageEvent) => {
      setLastMessage(event);
      setMessages((prev) => [...prev, event]);
    };

    socketRef.current.onerror = (event: Event) => {
      setError(event);
      console.error("WebSocket error:", event);
    };

    socketRef.current.onclose = (event: CloseEvent) => {
      setReadyState(WebSocket.CLOSED);
      console.log("WebSocket closed:", event);
      if (autoReconnect) {
        reconnectTimeoutRef.current = window.setTimeout(() => {
          connect();
        }, reconnectInterval);
      }
    };
  }, [url, protocols, autoReconnect, reconnectInterval]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback((message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  }, []);

  return { sendMessage, lastMessage, readyState, error, messages, socket: socketRef.current };
};

export default useWebSocket;
