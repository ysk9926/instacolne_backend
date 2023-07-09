import { User } from "@prisma/client";

export interface IAccount {
  id: number;
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
  cursor: number;
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
  avatar: string;
  createdAt: any;
  updatedAt: any;
}

export interface IContext {
  loggedInUser: IUser;
}

export interface IError {
  ok: boolean;
  error: string;
}
