const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// Routes
const authRouter = require("./routes/auth");
const imageUploadRouter = require("./routes/imageUpload");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const postCategoryRouter = require("./routes/postCategory");

app.use("/api/auth", authRouter);
app.use("/api/upload", imageUploadRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/blog/category", postCategoryRouter);

// Not Found Middleware
const notFoundMiddleware = require("./middleware/notFound");
app.use(notFoundMiddleware);

module.exports = app;
