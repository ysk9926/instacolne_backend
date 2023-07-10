import client from "../../../client";

interface ISearch {
  keyword: string;
  cursor: number;
}

export default {
  Query: {
    searchUser: async (_: unknown, { keyword, cursor }: ISearch) => {
      if (keyword.length < 2) {
        return {
          error: "검색 글자수가 너무 짧습니다 2글자 이상으로 검색해주세요",
        };
      }
      const user = await client.user.findMany({
        where: {
          userName: {
            startsWith: keyword,
          },
        },
        take: 10,
        skip: cursor ? 1 : 0,
        ...(cursor && { cursor: { id: cursor } }),
      });
      return {
        user,
      };
    },
  },
};
