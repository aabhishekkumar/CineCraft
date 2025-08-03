const { buildSchema } = require('graphql');

// This is the GraphQL Schema Definition
const movieSchema = buildSchema(`
  type Movie {
    id: ID
    name: String
    genre: String
    year: String
  }

  type Query {
    listMovies: [Movie]
  }

  type Mutation {
    addMovie(name: String!, genre: String!, year: String!): Movie
  }
`);

module.exports = movieSchema;