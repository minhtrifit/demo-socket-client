import React, { createContext, useContext } from 'react';
import type { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { useSocket } from '@/hooks/useSocket';

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

interface SocketProviderProps {
  url: string;
  options?: Partial<ManagerOptions & SocketOptions>;
  children: React.ReactNode;
}

export const SocketProvider = ({ url, options, children }: SocketProviderProps) => {
  const socket = useSocket(url, options);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('❗useSocketContext must be used within a <SocketProvider>');
  }
  return socket;
};
