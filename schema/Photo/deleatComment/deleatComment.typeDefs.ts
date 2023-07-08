import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    deleatComment(id: Int!): mutationResult!
  }
`;
