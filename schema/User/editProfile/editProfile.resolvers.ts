import client from "../../../client";
import bcrypt from "bcrypt";
import { IAccount } from "../User.interface";
import { error } from "console";

export default {
  Mutation: {
    editProfile: async (
      _: any,
      { firstName, lastName, userName, email, password: newPassword }: IAccount
    ) => {
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updateUser = await client.user.update({
        where: {
          id: 1,
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
    },
  },
};
