const { buildSchema } = require("graphql");

const schema = buildSchema(`
  """
  Represents a movie entry in the system
  """
  type Movie {
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

module.exports = schema;
