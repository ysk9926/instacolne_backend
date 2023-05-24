import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    passwrod: String!
    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    createAccount(
      firstName: String!
      lastName: String!
      userName: String!
      email: String!
      password: String!
    ): User
  }
  type Query {
    seeProfile(userName: String!): User
  }
`;
