import jwt from "jsonwebtoken";
import { IJwt } from "./User.interface";
import client from "../../client";

export const getUser = async (token: string) => {
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
};
