import { gql } from "apollo-server-express";

export default gql`
  type searchUserResult {
    user: [User]
    error: String
  }
  type Query {
    searchUser(keyword: String!, cursor: Int): searchUserResult!
  }
`;
