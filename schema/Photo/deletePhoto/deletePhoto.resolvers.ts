import client from "../../../client";
import { protectResolver } from "../../User/User.Utils";
import { IContext } from "../../User/User.interface";
import { awsPhotoDelete } from "../../shared/shared.util";
import { IPhoto } from "../photo.interface";

export default {
  Mutation: {
    deletePhoto: protectResolver(
      async (_: unknown, { id }: IPhoto, { loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
            file: true,
          },
        });
        console.log(photo);
        if (!photo) {
          return {
            ok: false,
            error: "Photo not found.",
          };
        } else if (photo.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized.",
          };
        } else {
          await client.photo.delete({
            where: {
              id,
            },
          });
          await awsPhotoDelete(photo.file, "Photos");
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
