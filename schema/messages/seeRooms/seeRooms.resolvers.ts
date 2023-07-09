import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";

export default {
  Query: {
    seeRooms: protectResolver(
      async (_: unknown, __: unknown, { loggedInUser }) =>
        await client.room.findMany({
          where: { users: { some: { id: loggedInUser.id } } },
        })
    ),
  },
};
