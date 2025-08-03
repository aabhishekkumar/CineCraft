import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { gql, useMutation } from "@apollo/client";

const addNewMovie = gql`
  mutation AddNewMovie($name: String!, $genre: String!, $year: String!) {
    addMovie(name: $name, genre: $genre, year: $year) {
      name
      genre
      year
    }
  }
`;


const GET_MOVIES = gql`
  query GetMovies {
    listMovies {
     
      id
      name
      genre
      year
    }
  }
`;

const AddMovie = () => {
  const [movieName, setMovieName] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  const [addMovieMutation, { loading, error }] = useMutation(addNewMovie, {
    refetchQueries: [
      { query: GET_MOVIES },
      "GetMovies",
    ],
  });

  const submitMovie = (e) => {
    e.preventDefault(); 

    setSuccessMessage(null);

    addMovieMutation({
      variables: {
        name: movieName.trim(),
        genre: movieGenre.trim(),
        year: movieYear.trim(),
      },
    })
      .then(() => {
        setMovieName("");
        setMovieGenre("");
        setMovieYear("");
        setSuccessMessage("Movie added successfully!");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error adding movie:", err);
      });
  };

  return (
    <div className="addMovie" id="addNewMovie">
      <form onSubmit={submitMovie}>
        <input
          type="text"
          placeholder="Movie Name"
          required
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Movie Genre"
          required
          value={movieGenre} 
          onChange={(e) => setMovieGenre(e.target.value)}
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Movie Year"
          value={movieYear}
          onChange={(e) => setMovieYear(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Movie"}{" "}
        </button>
        {error && <p className="error-message">Error: {error.message}</p>}{" "}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}{" "}
      </form>
      <div className="top">
        <Link smooth to="#header" className="top-button">
          Back to Top
        </Link>
      </div>
    </div>
  );
};

export default AddMovie;
