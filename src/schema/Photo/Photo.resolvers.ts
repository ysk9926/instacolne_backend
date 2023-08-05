import client from "../../client";
import { IContext } from "../User/User.interface";
import { IHashtag, IPhoto } from "./photo.interface";

export default {
  Photo: {
    user: ({ userId }: IPhoto) =>
      client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }: IPhoto) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
    likes: ({ id }: IPhoto) => client.like.count({ where: { photoId: id } }),
    comments: ({ id }: IPhoto) =>
      client.comment.count({ where: { photoId: id } }),
  },
  Hashtag: {
    photos: ({ id }: IPhoto, { page }: any, { loggedInUser }: IContext) => {
      if (!loggedInUser) {
        return null;
      }
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos({
          take: 5,
          skip: (page - 1) * 5,
        });
    },
    totalPhotos: ({ id }: IHashtag) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
