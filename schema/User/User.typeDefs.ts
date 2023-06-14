import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    password: String!
    bio: String
    avatar: String
    follower: [User]
    following: [User]
    createdAt: String!
    updatedAt: String!
  }
`;
