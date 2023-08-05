import client from "../../../client";
import { IAccount } from "../User.interface";

export default {
  Query: {
    seeFollowing: async (_: unknown, { userName, cursor }: IAccount) => {
      const ok = await client.user.findUnique({
        where: { userName },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "찾는 유저가 존재하지 않습니다",
        };
      }
      const following = await client.user
        .findUnique({
          where: { userName },
        })
        .following({
          take: 5,
          skip: cursor ? 1 : 0,
          ...(cursor && { cursor: { id: cursor } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
