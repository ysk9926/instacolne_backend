import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";
import { IComment } from "../photo.interface";

export default {
  Mutation: {
    createComment: protectResolver(
      async (_: unknown, { photoId, payload }: IComment, { loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: {
            id: photoId,
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
        }
        await client.comment.create({
          data: {
            payload,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
              connect: {
                id: photoId,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
