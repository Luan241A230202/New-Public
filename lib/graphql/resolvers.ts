/**
 * GraphQL Resolvers (Simplified)
 */

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return context.user;
    },

    user: async (_: any, { id }: { id: string }) => {
      return { id, email: 'user@example.com', name: 'User', role: 'USER', createdAt: new Date() };
    },

    video: async (_: any, { id }: { id: string }) => {
      return {
        id,
        title: 'Sample Video',
        description: 'Description',
        url: 'https://example.com/video.mp4',
        thumbnailUrl: 'https://example.com/thumb.jpg',
        duration: 120,
        views: 100,
        likes: 10,
        status: 'published',
        createdAt: new Date(),
        authorId: 'user-1',
      };
    },

    videos: async (_: any, { limit = 10, offset = 0 }: any) => {
      return [];
    },

    trending: async (_: any, { limit = 10 }: any) => {
      return [];
    },

    search: async (_: any, { query, limit = 10 }: any) => {
      return [];
    },

    categories: async () => {
      return [];
    },
  },

  Mutation: {
    updateProfile: async (_: any, { name, email }: any, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return { ...context.user, name, email };
    },

    createVideo: async (_: any, { input }: any, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return {
        id: 'new-video',
        ...input,
        views: 0,
        likes: 0,
        status: 'published',
        createdAt: new Date(),
        authorId: context.user.id,
      };
    },

    updateVideo: async (_: any, { id, input }: any, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return { id, ...input, views: 0, likes: 0, status: 'published', createdAt: new Date(), authorId: context.user.id };
    },

    deleteVideo: async (_: any, { id }: any, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return true;
    },

    likeVideo: async (_: any, { videoId }: any, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return true;
    },

    createComment: async (_: any, { videoId, content }: any, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return {
        id: 'new-comment',
        content,
        videoId,
        authorId: context.user.id,
        createdAt: new Date(),
      };
    },
  },

  Video: {
    author: (parent: any) => {
      return { id: parent.authorId, email: 'author@example.com', name: 'Author', role: 'USER', createdAt: new Date() };
    },
    comments: () => [],
  },

  User: {
    videos: () => [],
  },

  Comment: {
    author: (parent: any) => {
      return { id: parent.authorId, email: 'author@example.com', name: 'Author', role: 'USER', createdAt: new Date() };
    },
    video: (parent: any) => {
      return { id: parent.videoId, title: 'Video', url: '', views: 0, likes: 0, status: 'published', createdAt: new Date(), authorId: '' };
    },
  },
};
