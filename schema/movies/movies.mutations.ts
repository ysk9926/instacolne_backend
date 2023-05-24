import client from '../../client';
import { ImovieArg } from './movies.interface';

export default {
    Mutation: {
        createMovie: (_:any, { title, year, genre }:ImovieArg) =>
          client.movie.create({
            data: {
              title,
              year,
              genre,
            },
          }),
          deleateMovie: (_:any, {id}:ImovieArg)=> client.movie.delete({where:{id}}),
          updateMovie:(_:any, {id, year, title}:ImovieArg)=> client.movie.update({where:{id}, data:{title, year}})
      },
}