// server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file
const { createHandler } = require('graphql-http/lib/use/express');
const movieResolvers = require("./resolvers/resolvers"); // Assuming this exports your root resolvers
const movieSchema = require("./schema/schema");      // Assuming this exports your GraphQLSchema object
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan"); // HTTP request logger middleware

const app = express();

// --- Middleware ---
// Enable CORS for all origins (you might want to restrict this in production)
app.use(cors());
// Add security headers
app.use(helmet());
// Compress response bodies for all requests
app.use(compression());
// Log HTTP requests to the console
app.use(morgan("combined"));

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --- Root Route ---
app.get('/', (req, res) => {
  res.send('🎬 Welcome to CineCraft Backend! Visit /graphql to explore the API.');
});

// --- GraphQL Endpoint ---
// This is the core part that exposes your GraphQL API and GraphiQL UI
app.use(
  "/graphql",
  createHandler({
    schema: movieSchema,       // Your GraphQL schema definition
    // For graphql-http, the resolvers should be part of your schema definition.
    // The rootValue option from express-graphql is not used here.
    // Ensure your movieSchema file already includes the resolvers.
    // Enable GraphiQL UI if not in production environment
    graphiql: process.env.NODE_ENV !== "production",
  })
);

// --- Health Check Route ---
app.get("/health", (_, res) => res.status(200).send("✅ Server is healthy"));

// --- Greeting Route ---
app.get("/", (req, res) => {
  res.send("CineCraft backend is alive and kicking!");
});

// --- Error Handling Middleware ---
// Catches any errors thrown by previous middleware or route handlers
app.use((err, req, res, next) => {
  console.error(" Internal Error:", err.stack); // Log the error stack for debugging
  res.status(500).send(" Internal Server Error"); // Send a generic error response
});

// --- Start Server ---
const PORT = process.env.PORT || 10000; // Use port from .env or default to 10000
const HOST = "0.0.0.0"; // Listen on all available network interfaces

const server = app.listen(PORT, HOST, () => {
  console.log(`--- Server Configuration ---`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`); // Log current environment
  console.log(`🌐 CineCraft Backend is live at http://localhost:${PORT}`);
  console.log(`📊 GraphQL endpoint available at http://localhost:${PORT}/graphql`);
  console.log(`----------------------------`);
});

// --- Keep-alive Settings ---
// These settings help prevent connections from timing out prematurely
server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000;   // 120 seconds