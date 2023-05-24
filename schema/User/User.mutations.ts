import client from "../../client";
import { IAccount } from "./User.interface";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _: any,
      { firstName, lastName, userName, email, password }: IAccount
    ) => {
      //중복 아이디 & 이메일 확인
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
      console.log(existingUser);
      const uglyPassword = await bcrypt.hash(password, 10);
      return client.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });
    },
  },
};
