import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";
import { IRoom } from "../message.interface";

export default {
  Query: {
    seeRoom: protectResolver(
      async (_: unknown, { id }: IRoom, { loggedInUser }) =>
        client.room.findFirst({
          where: {
            id,
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        })
    ),
  },
};
