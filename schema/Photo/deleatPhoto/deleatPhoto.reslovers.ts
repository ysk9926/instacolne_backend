import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";
import { IPhoto } from "../photo.interface";

export default {
  Mutation: {
    deleatPhoto: protectResolver(
      async (_: unknown, { id }: IPhoto, { loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        });
        if (!photo) {
          return {
            ok: false,
            error: "사진이 존재하지 않습니다",
          };
        } else if (photo.userId !== loggedInUser.id) {
          return {
            ok: false,
            erroe: "수정 권한이 없습니다",
          };
        } else {
          await client.photo.delete({
            where: {
              id,
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
