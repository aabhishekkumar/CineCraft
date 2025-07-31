import React from "react";
import SingleMovie from "../components/SingleMovie";
import { gql, useQuery } from "@apollo/client";

const listAllMovies = gql`
  query {
    listMovies {
      name
      genre
      year
    }
  }
`;

const Movies = () => {
  const { loading, error, data } = useQuery(listAllMovies);
  console.log(data);
  if (loading) return <p className="loading">We are loading your movies...</p>;
  if (error)
    return <p className="error">Cannot fetch your movies! : {error.message}</p>;

  return (
    <div className="movies">
      {data.listMovies.map((movie, index) => {
        return (
          <SingleMovie
            key={index}
            movieName={movie.name}
            movieGenre={movie.genre}
            movieYear={movie.year}
          />
        );
      })}
    </div>
  );
};

export default Movies;
