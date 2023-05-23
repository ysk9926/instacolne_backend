import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server';

const client = new PrismaClient()

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }

  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(title: String!): Boolean
  }
`;

interface ImovieArg {
  id: number;
  title: string;
  year: number;
  genre: string;
}

const resolvers = {
    Query: {
      movies: () => client.movie.findMany(),
      movie: (_:any, { id }:ImovieArg) => client.movie.findUnique({ where: { id } }),
    },
    Mutation: {
      createMovie: (_:any, { title, year, genre }:ImovieArg) =>
        client.movie.create({
          data: {
            title,
            year,
            genre,
          },
        }),
      deleteMovie: (_:any, { title }:ImovieArg) => {
        console.log(title);
        return true;
      },
    },
  };
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  server
    .listen()
    .then(() => console.log("Server is running on http://localhost:4000/"));