import client from "../../../client";
import { IAccount } from "../User.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_: any, { userName, password }: IAccount) => {
      const user = await client.user.findFirst({ where: { userName } });
      if (!user) {
        return {
          ok: false,
          error: "존재하지 않는 아이디 입니다",
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "비밀번호가 다릅니다",
        };
      }
      const token = jwt.sign({ id: user.id }, String(process.env.SECRET_KEY));
      return {
        ok: true,
        token,
      };
    },
  },
};
