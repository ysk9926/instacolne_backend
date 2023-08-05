import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    userId: Int!
    file: String!
    caption: String
    hashtags: [Hashtag]
    likes: Int!
    comments: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
  type Comment {
    id: Int!
    photo: Photo!
    user: User!
    payload: String!
    createdAt: String!
    updatedAt: String!
  }
`;
