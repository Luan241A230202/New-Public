/**
 * GraphQL Schema Definition
 */

export const typeDefs = `#graphql
  scalar DateTime
  scalar JSON

  type User {
    id: ID!
    email: String!
    name: String
    role: String!
    createdAt: DateTime!
    videos: [Video!]!
  }

  type Video {
    id: ID!
    title: String!
    description: String
    url: String!
    thumbnailUrl: String
    duration: Int
    views: Int!
    likes: Int!
    status: String!
    createdAt: DateTime!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
    createdAt: DateTime!
    author: User!
    video: Video!
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
  }

  type Query {
    me: User
    user(id: ID!): User
    video(id: ID!): Video
    videos(limit: Int, offset: Int): [Video!]!
    trending(limit: Int): [Video!]!
    search(query: String!, limit: Int): [Video!]!
    categories: [Category!]!
  }

  type Mutation {
    updateProfile(name: String, email: String): User!
    createVideo(input: CreateVideoInput!): Video!
    updateVideo(id: ID!, input: UpdateVideoInput!): Video!
    deleteVideo(id: ID!): Boolean!
    likeVideo(videoId: ID!): Boolean!
    createComment(videoId: ID!, content: String!): Comment!
  }

  input CreateVideoInput {
    title: String!
    description: String
    url: String!
    thumbnailUrl: String
  }

  input UpdateVideoInput {
    title: String
    description: String
    thumbnailUrl: String
  }
`;
