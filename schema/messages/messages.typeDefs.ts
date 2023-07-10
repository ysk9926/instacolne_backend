import { gql } from "apollo-server-express";

export default gql`
  type Room {
    id: Int!
    users: [User]
    message: [Message]
    unreadTotal: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Message {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
