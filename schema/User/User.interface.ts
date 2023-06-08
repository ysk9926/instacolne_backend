export interface IAccount {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  token: string;
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
  createdAt: any;
  updatedAt: any;
}

export interface IContext {
  loggedInUser: IUser | null;
}
