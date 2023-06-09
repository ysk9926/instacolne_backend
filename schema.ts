import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

// async function createSchema() {
//   const loadedTypes = await loadFiles(`${__dirname}/schema/**/*.typeDefs.ts`);
//   const loadedResolvers = await loadFiles(
//     `${__dirname}/schema/**/*.resolvers.ts`
//   );

//   const typeDefs = mergeTypeDefs(loadedTypes);
//   const resolvers = mergeResolvers(loadedResolvers);

//   const schema = makeExecutableSchema({ typeDefs, resolvers });
//   return { typeDefs, resolvers };
// }

// export default createSchema;

const loadedTypes = loadFilesSync(`${__dirname}/schema/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/schema/**/*.resolvers.ts`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
