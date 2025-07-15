// hooks/useWebSocket.ts
import { useEffect, useRef, useState, useCallback } from 'react';

interface Message {
  type: string;
  message: string;
  timestamp: number;
}

export const useWebSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      console.log('🟢 WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const data: Message = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      } catch (err) {
        console.warn('❌ Invalid message format', event.data);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log('🔴 WebSocket disconnected');
    };

    socket.onerror = (error) => {
      console.error('💥 WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = useCallback((msg: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    } else {
      console.warn('❗️Cannot send message. Socket is not open.');
    }
  }, []);

  return {
    isConnected,
    messages,
    sendMessage,
  };
};
