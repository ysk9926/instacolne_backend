import client from "../../../client";
import { protectResolver } from "../User.Utils";

export default {
  Query: {
    me: protectResolver(
      async (_: unknown, __: unknown, { loggedInUser }) =>
        await client.user.findUnique({
          where: {
            userName: loggedInUser.userName,
          },
        })
    ),
  },
};
