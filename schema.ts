import { loadFiles } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

async function createSchema() {
  const loadedTypes = await loadFiles(`${__dirname}/schema/**/*.typeDef.ts`);
  const loadedResolvers = await loadFiles(
    `${__dirname}/schema/**/*.{queries, mutations}.ts`
  );

  const typeDefs = mergeTypeDefs(loadedTypes);
  const resolvers = mergeResolvers(loadedResolvers);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  return schema;
}

export default createSchema;
