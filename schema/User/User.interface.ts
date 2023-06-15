import { User } from "@prisma/client";

export interface IAccount {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  token: string;
  bio: string;
  avatar: string;
  follower: {
    User: User;
  };
  following: {
    User: User;
  };
  page: number;
}

export interface IJwt {
  id: number;
}

export interface IOurResolver {
  root: any;
  args: any;
  context: string;
  info: any;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  bio: string;
  createdAt: any;
  updatedAt: any;
}

export interface IContext {
  loggedInUser: IUser | null;
}

export interface IError {
  ok: boolean;
  error: string;
}
