import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";
import { IMessage } from "../message.interface";

export default {
  Mutation: {
    readMessage: protectResolver(
      async (_: unknown, { id }: IMessage, { loggedInUser }) => {
        const unreadMessage = await client.message.findMany({
          where: {
            read: false,
            roomId: id,
            user: {
              NOT: {
                id: loggedInUser.id,
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!unreadMessage) {
          return {
            ok: false,
            error: "안읽은 메시지가 없습니다",
          };
        }
        await client.message.update({
          where: {
            id,
          },
          data: {
            read: true,
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
