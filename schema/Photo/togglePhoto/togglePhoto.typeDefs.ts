import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    togglePhoto(id: Int!): mutationResult!
  }
`;
