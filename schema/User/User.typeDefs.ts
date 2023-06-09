import { gql } from "apollo-server";

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
    createdAt: String!
    updatedAt: String!
  }
`;
