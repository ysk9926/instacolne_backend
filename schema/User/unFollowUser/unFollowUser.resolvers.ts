import client from "../../../client";
import { protectResolver } from "../User.Utils";
import { IAccount, IContext } from "../User.interface";

export default {
  Mutation: {
    unFollowUser: protectResolver(
      async (
        _: unknown,
        { userName }: IAccount,
        { loggedInUser }: IContext
      ) => {
        const checkedUser = await client.user.findUnique({
          where: { userName },
        });
        if (!checkedUser) {
          return {
            ok: false,
            error: "유저가 존재하지 않습니다",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser?.id,
          },
          data: {
            following: {
              disconnect: { userName },
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
