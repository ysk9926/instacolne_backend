require("dotenv").config();
import { ApolloServer } from "apollo-server";
import createSchema from "./schema";

async function startApolloServer() {
  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
  });
  const PORT = process.env.PORT;
  server
    .listen(PORT)
    .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
}

startApolloServer();
