import client from "../../../client";
import bcrypt from "bcrypt";
import { IAccount } from "../User.interface";

export default {
  Mutation: {
    createAccount: async (
      _: any,
      { firstName, lastName, userName, email, password }: IAccount
    ) => {
      try {
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
        if (existingUser) {
          throw new Error("이미 가입된 아이디이거나 이메일 입니다");
        }
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
      } catch (e) {
        return e;
      }
    },
  },
};
