import { gql } from "apollo-server";

export default gql`
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
    ): editProfileResult
  }
`;
