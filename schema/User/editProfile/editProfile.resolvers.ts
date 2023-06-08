import client from "../../../client";
import bcrypt from "bcrypt";
import { IAccount, IContext } from "../User.interface";
import { protectResolver } from "../User.Utils";

export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _: unknown,
        {
          firstName,
          lastName,
          userName,
          email,
          password: newPassword,
        }: IAccount,
        { loggedInUser }: IContext
      ) => {
        console.log(loggedInUser);
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updateUser = await client.user.update({
          where: {
            id: loggedInUser?.id,
          },
          data: {
            firstName,
            lastName,
            userName,
            email,
            ...(uglyPassword && { password: uglyPassword }),
          },
        });
        if (updateUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "업데이트가 불가능합니다",
          };
        }
      }
    ),
  },
};
