import client from "../../../client";
import { IAccount } from "../User.interface";

export default {
  Query: {
    seeProfile: (_: any, { userName }: IAccount) =>
      client.user.findUnique({
        where: {
          userName,
        },
      }),
  },
};
