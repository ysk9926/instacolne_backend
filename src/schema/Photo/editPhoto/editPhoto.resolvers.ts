import { error } from "console";
import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";
import { IContext } from "../../User/User.interface";
import { IPhoto } from "../photo.interface";
import { precessHashtags } from "../photoUtil";

export default {
  Mutation: {
    editPhoto: protectResolver(
      async (
        _: unknown,
        { id, caption }: IPhoto,
        { loggedInUser }: IContext
      ) => {
        const oldPhoto = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser?.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        console.log(oldPhoto?.hashtags);
        if (!oldPhoto) {
          return {
            ok: false,
            error: "사진수정 권한이 없습니다",
          };
        }
        const photo = await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: precessHashtags(caption),
            },
          },
        });
      }
    ),
  },
};
