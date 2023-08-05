require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { getUser } from "./schema/User/User.Utils";
import { dynamicImport } from "tsimportlib";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { User } from ".prisma/client";
import { typeDefs, resolvers } from "./schema";
import { makeExecutableSchema } from "graphql-tools";

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

interface ConnectionParams {
  token?: string;
  "content-type"?: string;
}

const startServer = async (): Promise<void> => {
  const app = express();
  const graphqlUploadExpressModule = await dynamicImport(
    "graphql-upload/graphqlUploadExpress.mjs",
    module
  );
  app.use(graphqlUploadExpressModule.default());

  const httpServer = createServer(app);
  const subscriptionServer = SubscriptionServer.create(
    {
      schema: executableSchema,
      execute,
      subscribe,
      async onConnect({ token }: ConnectionParams) {
        if (token === undefined) {
          throw new Error(
            "토큰이 존재하지 않기 때문에 Subscription Server에 연결할 수 없습니다."
          );
        }
        const foundUser: User | null = await getUser(token);
        return { loggedInUser: foundUser };
      },
    },
    { server: httpServer, path: "/graphql" }
  );

  const apolloserver = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token as string),
      };
    },
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  await apolloserver.start();
  apolloserver.applyMiddleware({ app });
  // httpServer.listen(process.env.PORT, () =>
  //   console.log(
  //     `🚀 Server: http://localhost:${process.env.PORT}${apolloserver.graphqlPath}`
  //   )
  // );
  const PORT = 3000;
  httpServer.listen(PORT, () =>
    console.log(
      `🚀 Server: http://localhost:${PORT}${apolloserver.graphqlPath}`
    )
  );
};

startServer();
