import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
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
    ): mutationResult!
  }
`;
