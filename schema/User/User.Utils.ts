import jwt from "jsonwebtoken";
import { IContext, IError, IJwt } from "./User.interface";
import client from "../../client";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      console.log("no token");
      return null;
    }
    const { id } = (await jwt.verify(
      token,
      String(process.env.SECRET_KEY)
    )) as IJwt;
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

// protectResolver 함수는 ourResolver의 함수를 보호하기 위한 함수이며
// 불필요한 반복적인 함수 작성과 역할을 분리하기위하여 따로 작성된 currying함수이다
// currying 함수란 함수가 함수를 return하는 함수이다
// root와 info는 사용하지 않기 때문에 unkonwn를 사용해서 any사용을 막았고
// args부분은 어느 함수를 불러오느냐에 따라서 변경될 수 있기 때문에 제네릭 함수를 사용하여 유연하게 대처하였다
// context의 부분에는 IContext라는 interface를 사용하였는데 이는 context는 서버에서 하나만 지정을 해 놓을것이기 때문에
// 굳이 제네릭함수를 사용하지 않고 지정을 해주어도 상관없다고 생각되어 IContext를 사용하였다

// ResolverFunction이라는 타입을 선언하고 제네릭 함수를 사용하여 promise<R>을 반환한다
type ResolverFunction<T, R> = (
  root: unknown,
  args: T,
  context: IContext,
  info: any
) => Promise<R>;

export const protectResolver =
  // ourResolver는 ResolverFunction의 타입을 따르는 함수라는걸 선언


    <T, R>(ourResolver: ResolverFunction<T, R>) =>
    (
      root: unknown,
      args: T,
      context: IContext,
      info: any
    ): Promise<R | IError> | null => {
      if (!context.loggedInUser) {
        const query = info.operation.operation === "query";
        if (query) {
          return null;
        } else {
          // promise.resolve()를 사용하여서 이미 선언된 promise객체를 불러와서 사용할수 있다
          return Promise.resolve({
            ok: false,
            error: "로그인후 사용할수 있습니다",
          });
        }
      }
      return ourResolver(root, args, context, info);
    };
