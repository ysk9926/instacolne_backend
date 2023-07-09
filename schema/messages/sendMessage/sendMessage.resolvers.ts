import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";
import { IMessage } from "../message.interface";

export default {
  Mutation: {
    sendMessage: protectResolver(
      async (
        _: unknown,
        { payload, userId, roomId }: IMessage,
        { loggedInUser }
      ) => {
        let room = null;
        if (userId) {
          // 방이 없고 처음으로 상대에게 채팅하는 경우
          const user = await client.user.findUnique({
            where: {
              id: loggedInUser.id,
            },
            select: {
              id: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: "상대방이 존재하지 않습니다",
            };
          }
          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });
        } else if (roomId) {
          // 이미 방이 있는 경우
          room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "채팅방이 존재하지 않습니다",
            };
          }
        }
        await client.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: room?.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
