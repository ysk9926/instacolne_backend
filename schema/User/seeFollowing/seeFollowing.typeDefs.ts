import { gql } from "apollo-server-express";

export default gql`
  type seeFollowingResult {
    ok: Boolean!
    following: [User]
    error: String
  }
  type Query {
    seeFollowing(userName: String!, page: Int): seeFollowingResult!
  }
`;
