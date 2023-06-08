require("dotenv").config();
import { ApolloServer } from "apollo-server";
import createSchema from "./schema";
import { getUser, protectResolver } from "./schema/User/User.Utils";

async function startApolloServer() {
  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
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
