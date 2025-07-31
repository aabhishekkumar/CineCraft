const mongoModel = require("../model/model");

const resolvers = {
  // Add a movie to the database with input validation and error handling
  addMovie: async (args) => {
    try {
      const { name, genre, year } = args;

      // Validate input
      if (!name || !genre || !year) {
        throw new Error("Missing required movie fields: name, genre, or year");
      }

      const newMovieData = new mongoModel({ name, genre, year });
      await newMovieData.save();
      return newMovieData;
    } catch (err) {
      console.error("Error saving movie:", err);
      throw new Error("Failed to save movie to database");
    }
  },

  // List all movies from the database with async error handling
  listMovies: async () => {
    try {
      return await mongoModel.find({});
    } catch (err) {
      console.error("Error fetching movies:", err);
      throw new Error("Failed to retrieve movies");
    }
  },
};

module.exports = resolvers;
