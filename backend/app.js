const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// Routes
const authRouter = require("./router/auth");
app.use("/api/auth", authRouter);

// Not Found Middleware
const notFoundMiddleware = require("./middleware/notFound");
app.use(notFoundMiddleware);

module.exports = app;
