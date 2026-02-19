/**
 * WebSocket Client Hook for React Components
 */

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface UseWebSocketOptions {
  autoConnect?: boolean;
  auth?: {
    token?: string;
  };
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamic import socket.io-client
    import('socket.io-client').then((module) => {
      const io = module.io;
      
      const socketInstance = io({
        path: '/socket.io/',
        autoConnect: options.autoConnect !== false,
        auth: options.auth,
      });

      socketRef.current = socketInstance;

      socketInstance.on('connect', () => {
        console.log('WebSocket connected');
        setConnected(true);
      });

      socketInstance.on('disconnect', () => {
        console.log('WebSocket disconnected');
        setConnected(false);
      });

      socketInstance.on('error', (error: any) => {
        console.error('WebSocket error:', error);
      });
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [options.autoConnect, options.auth?.token]);

  const emit = useCallback(
    (event: string, data?: any) => {
      if (socketRef.current) {
        socketRef.current.emit(event, data);
      }
    },
    []
  );

  const on = useCallback((event: string, callback: (...args: any[]) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
      return () => {
        socketRef.current?.off(event, callback);
      };
    }
  }, []);

  return {
    socket: socketRef.current,
    connected,
    emit,
    on,
  };
}

export function useVideoRoom(videoId: string) {
  const { socket, connected, emit, on } = useWebSocket();
  const [viewCount, setViewCount] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!connected || !videoId) return;

    emit('join:video', videoId);

    const unsubMessages = on?.('chat:new-message', (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    const unsubViews = on?.('video:view-count-updated', () => {
      setViewCount((prev) => prev + 1);
    });

    return () => {
      emit('leave:video', videoId);
      unsubMessages?.();
      unsubViews?.();
    };
  }, [connected, videoId, emit, on]);

  const sendMessage = useCallback(
    (message: string) => {
      emit('chat:message', { videoId, message });
    },
    [emit, videoId]
  );

  const sendTyping = useCallback(
    (isTyping: boolean) => {
      emit('chat:typing', { videoId, isTyping });
    },
    [emit, videoId]
  );

  return {
    connected,
    viewCount,
    messages,
    sendMessage,
    sendTyping,
  };
}
