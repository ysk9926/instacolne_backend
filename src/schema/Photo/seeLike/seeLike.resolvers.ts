import client from "../../../client";
import { IPhoto } from "../photo.interface";

export default {
  Query: {
    seeLike: async (_: unknown, { id }: IPhoto) => {
      const likes = await client.like.findMany({
        where: {
          id,
        },
        select: {
          user: true,
        },
      });
      return likes.map((like) => like.user);
    },
  },
};
