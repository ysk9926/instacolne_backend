import client from "../../../client";
import { IAccount } from "../User.interface";

export default {
  Query: {
    seeFollowers: async (_: unknown, { userName, page }: IAccount) => {
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
      const follower = await client.user
        .findUnique({
          where: { userName },
        })
        .follower({
          take: 5,
          skip: (page - 1) * 5,
        });
      const totalFollowers = await client.user.count({
        where: { follower: { some: { userName } } },
      });
      console.log(follower);
      return {
        ok: true,
        follower,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
