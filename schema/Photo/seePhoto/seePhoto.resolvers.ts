import client from "../../../client";
import { IPhoto } from "../photo.interface";

export default {
  Query: {
    seePhoto: (_: unknown, { id }: IPhoto) =>
      client.photo.findUnique({ where: { id } }),
  },
};
