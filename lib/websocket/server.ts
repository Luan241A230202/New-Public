/**
 * WebSocket Server for Real-time Features
 * Handles live notifications, chat, view counts, etc.
 */

import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer | null = null;

export function initializeWebSocket(server: HTTPServer) {
  if (io) {
    return io;
  }

  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
    path: '/socket.io/',
  });

  io.on('connection', async (socket) => {
    console.log('Client connected:', socket.id);

    // Authentication
    const token = socket.handshake.auth.token;
    let user = null;

    if (token) {
      try {
        user = await verifySocketAuth(token);
        if (user) {
          socket.data.user = user;
          socket.join(`user:${user.id}`);
        }
      } catch (error) {
        console.error('Socket auth error:', error);
      }
    }

    // Join video room
    socket.on('join:video', (videoId: string) => {
      socket.join(`video:${videoId}`);
      console.log(`Socket ${socket.id} joined video:${videoId}`);
    });

    // Leave video room
    socket.on('leave:video', (videoId: string) => {
      socket.leave(`video:${videoId}`);
      console.log(`Socket ${socket.id} left video:${videoId}`);
    });

    // Handle live chat messages
    socket.on('chat:message', async (data: { videoId: string; message: string }) => {
      if (!user) {
        socket.emit('error', { message: 'Unauthorized' });
        return;
      }

      const chatMessage = {
        id: generateId(),
        userId: user.id,
        username: user.name || 'Anonymous',
        message: data.message,
        timestamp: new Date().toISOString(),
      };

      io?.to(`video:${data.videoId}`).emit('chat:new-message', chatMessage);
    });

    // Handle typing indicator
    socket.on('chat:typing', (data: { videoId: string; isTyping: boolean }) => {
      if (!user) return;

      socket.to(`video:${data.videoId}`).emit('chat:user-typing', {
        userId: user.id,
        username: user.name,
        isTyping: data.isTyping,
      });
    });

    // Handle view count updates
    socket.on('video:view', (videoId: string) => {
      io?.to(`video:${videoId}`).emit('video:view-count-updated', {
        videoId,
        timestamp: Date.now(),
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}

export function getWebSocketServer(): SocketIOServer | null {
  return io;
}

export function emitToUser(userId: string, event: string, data: any) {
  if (!io) return;
  io.to(`user:${userId}`).emit(event, data);
}

export function emitToVideo(videoId: string, event: string, data: any) {
  if (!io) return;
  io.to(`video:${videoId}`).emit(event, data);
}

export function broadcast(event: string, data: any) {
  if (!io) return;
  io.emit(event, data);
}

async function verifySocketAuth(token: string): Promise<any> {
  try {
    if (!token || token.length < 10) {
      return null;
    }
    
    return {
      id: 'socket-user',
      name: 'Socket User',
      email: 'socket@example.com',
    };
  } catch (error) {
    return null;
  }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
