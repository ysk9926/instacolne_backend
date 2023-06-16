import client from "../../client";
import { IAccount, IContext } from "./User.interface";

export default {
  User: {
    totalFollowing: ({ id }: IAccount) => {
      return client.user.count({ where: { follower: { some: { id } } } });
    },
    totalFollowers: ({ id }: IAccount) => {
      return client.user.count({ where: { following: { some: { id } } } });
    },
    isMe: (root: IAccount, _: unknown, { loggedInUser }: IContext) => {
      if (!loggedInUser) {
        return false;
      }
      return root.id === loggedInUser.id;
    },
    isFollowing: async (
      root: IAccount,
      _: unknown,
      { loggedInUser }: IContext
    ) => {
      if (!loggedInUser) {
        return false;
      }
      const exist = await client.user.count({
        where: {
          userName: loggedInUser.userName,
          following: { some: { id: root.id } },
        },
      });
      console.log(exist);
      return Boolean(exist);
    },
  },
};
