import client from "../../../client";
import { IPhoto } from "../photo.interface";

export default {
  Query: {
    searchPhoto(_: unknown, { keyWord }: IPhoto) {
      const photo = client.photo.findMany({
        where: {
          caption: {
            startsWith: keyWord,
          },
        },
      });
      return photo;
    },
  },
};
