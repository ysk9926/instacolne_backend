import jwt from "jsonwebtoken";
import { IJwt, IOurResolver } from "./User.interface";
import client from "../../client";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = (await jwt.verify(
      token,
      String(process.env.SECRET_KEY)
    )) as IJwt;
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectResolver =
  (ourResolver: any) => (root: any, args: any, context: any, info: any) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "로그인후 사용할수 있습니다",
      };
    } else {
      return ourResolver(root, args, context, info);
    }
  };
