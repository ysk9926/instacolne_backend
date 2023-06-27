import { Hashtag, Photo, User } from "@prisma/client";

export interface IPhoto {
  id: number;
  userId: number;
  file: string;
  caption: string;
  user: [User];
}

export interface IHashtagobj {
  where: {
    hashtag: string;
  };
  create: {
    hashtag: string;
  };
}

export interface IHashtag {
  id: number;
  hashtag: string;
  photos: [Photo];
}
