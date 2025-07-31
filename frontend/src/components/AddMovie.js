import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { gql, useMutation } from "@apollo/client";

// Define your GraphQL mutation
const addNewMovie = gql`
  mutation AddNewMovie($name: String!, $genre: String!, $year: String!) {
    addMovie(name: $name, genre: $genre, year: $year) {
      name
      genre
      year
    }
  }
`;

// IMPORTANT: Define the query that fetches all movies.
// This query is used by refetchQueries to update the movie list
// after a new movie is added. It should match the query used
// in your 'Movies' component to fetch the list of movies.
const GET_MOVIES = gql`
  query GetMovies {
    listMovies {
      # This should match the field name in your schema for fetching all movies
      id
      name
      genre
      year
    }
  }
`;

const AddMovie = () => {
  // State for form inputs
  const [movieName, setMovieName] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [movieYear, setMovieYear] = useState("");
  // New state for success message
  const [successMessage, setSuccessMessage] = useState(null);

  // Use the useMutation hook with your GraphQL mutation definition
  // We include refetchQueries to update the movie list after a successful addition.
  const [addMovieMutation, { loading, error }] = useMutation(addNewMovie, {
    refetchQueries: [
      { query: GET_MOVIES }, // This tells Apollo to re-run the GET_MOVIES query
      "GetMovies", // You can also pass the query name as a string if it's defined in your gql tag
    ],
  });

  // Handle form submission
  const submitMovie = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear any previous messages
    setSuccessMessage(null);

    // Call the mutation function with variables
    addMovieMutation({
      variables: {
        name: movieName.trim(),
        genre: movieGenre.trim(),
        year: movieYear.trim(),
      },
    })
      .then(() => {
        // Clear form fields after successful submission
        setMovieName("");
        setMovieGenre("");
        setMovieYear("");
        // Set success message
        setSuccessMessage("Movie added successfully!");
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      })
      .catch((err) => {
        // Handle any errors that occur during the mutation call
        console.error("Error adding movie:", err);
        // Error message is already handled by the {error && ...} JSX below
      });
  };

  return (
    <div className="addMovie" id="addNewMovie">
      <form onSubmit={submitMovie}>
        <input
          type="text"
          placeholder="Movie Name"
          required
          value={movieName} // Make inputs controlled components
          onChange={(e) => setMovieName(e.target.value)}
          disabled={loading} // Disable input when loading
        />
        <input
          type="text"
          placeholder="Movie Genre"
          required
          value={movieGenre} // Make inputs controlled components
          onChange={(e) => setMovieGenre(e.target.value)}
          disabled={loading} // Disable input when loading
        />
        <input
          type="number"
          placeholder="Movie Year"
          value={movieYear} // Make inputs controlled components
          onChange={(e) => setMovieYear(e.target.value)}
          disabled={loading} // Disable input when loading
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Movie"}{" "}
          {/* Change button text when loading */}
        </button>
        {error && <p className="error-message">Error: {error.message}</p>}{" "}
        {/* Display error message */}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}{" "}
        {/* Display success message */}
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
