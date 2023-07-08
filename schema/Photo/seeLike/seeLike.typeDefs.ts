import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeLike(id: Int!): [User]
  }
`;
