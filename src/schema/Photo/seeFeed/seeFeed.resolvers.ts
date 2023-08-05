import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";

export default {
  Query: {
    seeFeed: protectResolver((_: unknown, __: unknown, { loggedInUser }) =>
      client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                follower: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    ),
  },
};
