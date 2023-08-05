import client from "../../../client";
import { IHashtag } from "../photo.interface";

export default {
  Query: {
    seeHashtag: (_: unknown, { hashtag }: IHashtag) =>
      client.hashtag.findUnique({
        where: {
          hashtag,
        },
      }),
  },
};
