import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";
import { IContext } from "../../User/User.interface";
import { IHashtagobj, IPhoto } from "../photo.interface";

export default {
  Query: {
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
          const hashtags = caption.match(/#[\w]+/g);
          hashtagObj = hashtags?.map((hashtag) => ({
            where: {
              hashtag,
            },
            create: {
              hashtag,
            },
          }));
        }

        return client.photo.create({
          data: {
            file,
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
