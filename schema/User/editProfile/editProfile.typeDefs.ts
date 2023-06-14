import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type editProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      userName: String
      email: String
      password: String
      token: String
      avatar: Upload
      bio: String
    ): editProfileResult
  }
`;
