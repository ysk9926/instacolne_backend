import client from "../../../client";
import { IComment } from "../photo.interface";

export default {
  Query: {
    seePhotoComment: (_: unknown, { id, cursor }: IComment) =>
      client.photo
        .findUnique({
          where: {
            id,
          },
        })
        .comments({
          take: 5,
          skip: cursor ? 1 : 0,
          ...(cursor && { cursor: { id: cursor } }),
          orderBy: {
            createdAt: "asc",
          },
        }),
  },
};
