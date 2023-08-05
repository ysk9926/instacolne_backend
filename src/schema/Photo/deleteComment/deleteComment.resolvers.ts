import { log } from "console";
import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";
import { IComment } from "../photo.interface";

export default {
  Mutation: {
    deleteComment: protectResolver(
      async (_: unknown, { id }: IComment, { loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        });
        if (!comment) {
          return {
            ok: false,
            error: "댓글이 존재하지 않습니다",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            erroe: "수정 권한이 없습니다",
          };
        } else {
          await client.comment.delete({
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
