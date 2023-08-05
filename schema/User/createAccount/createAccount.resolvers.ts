import client from "../../../client";
import bcrypt from "bcrypt";
import { IAccount } from "../User.interface";

export default {
  Mutation: {
    createAccount: async (
      _: unknown,
      { firstName, lastName, userName, email, password }: IAccount
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              userName,
            },
            {
              email,
            },
          ],
        },
      });
      if (existingUser) {
        console.log(existingUser);
        return {
          ok: false,
          error: "이미 가입된 이메일 이거나 아이디 입니다",
        };
      }
      const uglyPassword = await bcrypt.hash(password, 10);
      await client.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
