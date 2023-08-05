import { gql } from "apollo-server-express";

export default gql`
  type loginResult {
    ok: Boolean!
    error: String
    token: String
  }
  type Mutation {
    login(userName: String!, password: String!): loginResult!
  }
`;
