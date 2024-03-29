import { gql } from "apollo-server-express";

export default gql`
  type seeFollowersResult {
    ok: Boolean!
    follower: [User]
    totalPages: Int
    error: String
  }
  type Query {
    seeFollowers(userName: String!, cursor: Int!): seeFollowersResult!
  }
`;
