import { withFilter } from "graphql-subscriptions";
import client from "../../../client";
import pubsub from "../../../pubsub";
import { IRoom } from "../message.interface";
import { IContext } from "../../User/User.interface";

export default {
  Subscription: {
    messageUpdates: {
      subscribe: async (
        parent: unknown,
        args: IRoom,
        context: IContext,
        info: unknown
      ) => {
        const foundRoom = await client.room.findFirst({
          where: {
            id: args.id,
            users: { some: { id: context.loggedInUser?.id } },
          },
        });

        if (foundRoom === null) {
          throw new Error("존재하지 않거나 구독할 수 없는 채팅방입니다.");
        }

        return withFilter(
          () => pubsub.asyncIterator(["MESSAGE_UPDATES"]),
          (payload, args): boolean => {
            if (payload.messageUpdates.roomId !== args.id) {
              return false;
            }
            return true;
          }
        )(parent, args, context, info);
      },
    },
  },
};
