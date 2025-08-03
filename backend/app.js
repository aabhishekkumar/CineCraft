// server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { createHandler } = require("graphql-http/lib/use/express");
const movieResolvers = require("./resolvers/resolvers");
const movieSchema = require("./schema/schema");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(" MongoDB Connected Successfully!"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send(
    "🎬 Welcome to CineCraft Backend! Visit /graphql to explore the API."
  );
});

app.use(
  "/graphql",
  createHandler({
    schema: movieSchema,

    graphiql: process.env.NODE_ENV !== "production",
  })
);

app.get("/health", (_, res) => res.status(200).send(" Server is healthy"));

app.get("/", (req, res) => {
  res.send("CineCraft backend is alive and kicking!");
});

app.use((err, req, res, next) => {
  console.error(" Internal Error:", err.stack);
  res.status(500).send(" Internal Server Error");
});

const PORT = process.env.PORT || 10000;
const HOST = "0.0.0.0";

const server = app.listen(PORT, HOST, () => {
  console.log(`--- Server Configuration ---`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 CineCraft Backend is live at http://localhost:${PORT}`);
  console.log(
    `📊 GraphQL endpoint available at http://localhost:${PORT}/graphql`
  );
  console.log(`----------------------------`);
});

server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;
