import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    unFollowUser(userName: String!): mutationResult!
  }
`;
