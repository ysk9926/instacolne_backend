import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";
import { IContext } from "../../User/User.interface";
import { awsPhotoUpload } from "../../shared/shared.util";
import { IPhoto } from "../photo.interface";
import { precessHashtags } from "../photoUtil";

export default {
  Mutation: {
    uploadPhoto: protectResolver(
      async (
        _: unknown,
        { file, caption }: IPhoto,
        { loggedInUser }: IContext
      ) => {
        // caption에서 hashtag 분류해서 저장시키기
        // 1. hashtag 배열 추출
        // 2. get/create hashtag
        let hashtagObj: any = [];
        if (caption) {
          hashtagObj = precessHashtags(caption);
        }
        const fileUrl = await awsPhotoUpload(file, loggedInUser.id, "Photos");

        return client.photo.create({
          data: {
            file: fileUrl,
            caption,
            user: {
              connect: {
                id: loggedInUser?.id,
              },
            },
            hashtags: {
              connectOrCreate: hashtagObj,
            },
          },
        });
      }
    ),
  },
};
