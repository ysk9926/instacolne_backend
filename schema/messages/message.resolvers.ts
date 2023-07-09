import client from "../../client";
import { IContext } from "../User/User.interface";
import { IMessage, IRoom } from "./message.interface";

export default {
  Room: {
    users: ({ id }: IRoom) => client.room.findUnique({ where: { id } }).users(),
    message: ({ id }: IRoom, { cursor }: IRoom) =>
      client.message.findMany({
        where: { roomId: id },
        orderBy: {
          createdAt: "asc",
        },
        take: 20,
        skip: cursor ? 1 : 0,
        ...(cursor && { cursor: { id: cursor } }),
      }),
    unreadTotal: ({ id }: IRoom, _: unknown, { loggedInUser }: IContext) =>
      client.message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            NOT: {
              id: loggedInUser.id,
            },
          },
        },
      }),
  },
  Message: {
    user: ({ id }: IMessage) =>
      client.message.findUnique({ where: { id } }).user(),
  },
};
