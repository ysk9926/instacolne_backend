import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";
import { IContext } from "../../User/User.interface";
import { IPhoto } from "../photo.interface";

export default {
  Mutation: {
    togglePhoto: protectResolver(
      async (_: unknown, { id }: IPhoto, { loggedInUser }: IContext) => {
        const existingPhoto = await client.photo.findUnique({
          where: {
            id,
          },
        });
        if (!existingPhoto) {
          return {
            ok: false,
            error: "사진이 없습니다",
          };
        }
        const likeWhere = {
          photoId_userId: {
            userId: loggedInUser?.id,
            photoId: id,
          },
        };
        const like = await client.like.findUnique({
          where: likeWhere,
        });
        if (like) {
          await client.like.delete({
            where: likeWhere,
          });
        } else {
          await client.like.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              photo: {
                connect: {
                  id,
                },
              },
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
