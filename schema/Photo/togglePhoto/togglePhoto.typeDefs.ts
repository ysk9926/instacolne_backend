import { gql } from "apollo-server-express";

export default gql`
  type togglePhotoResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    togglePhoto(id: Int!): togglePhotoResult!
  }
`;
