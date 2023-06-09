require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./schema/User/User.Utils";

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token as string),
      };
    },
  });
  const PORT = process.env.PORT;

  server
    .listen(PORT)
    .then(() => console.log(`Server is running on http://localhost:${PORT}/ `));
}

startApolloServer();
