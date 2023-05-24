import client from '../../client';
import { ImovieArg } from './movies.interface';



export default {
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_:any, { id }:ImovieArg) => client.movie.findUnique({ where: { id } }),
      },
}