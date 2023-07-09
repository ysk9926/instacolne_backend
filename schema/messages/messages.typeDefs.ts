import { gql } from "apollo-server-express";

export default gql`
  type Room {
    id: Int!
    user: [User]
    messages: [Messages]
    createdAt: String!
    updatedAt: String!
  }
  type Messgae {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
