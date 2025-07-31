const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const movieResolvers = require("./resolvers/resolvers");
const movieSchema = require("./schema/schema");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const app = express();

// 🔗 MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected Successfully!"))
  .catch((err) => console.error(" Connection Error:", err));

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

//GraphQL Endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: movieSchema,
    rootValue: movieResolvers,
    graphiql: process.env.NODE_ENV !== "production", // Enables GraphiQL UI
  })
);

// Health Check
app.get("/health", (req, res) => res.status(200).send("Server is healthy"));

//  Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start Server
const PORT = process.env.PORT || 10000;

const server =app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

server.keepAliveTimeout = 120000;
server.headersTimeout  = 120000;
