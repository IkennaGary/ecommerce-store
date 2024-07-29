const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// Routes
const authRouter = require("./routes/auth");
const imageUploadRouter = require("./routes/imageUpload");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const postCategoryRouter = require("./routes/posts/postCategory");
const postRouter = require("./routes/posts/post");
const commentRouter = require("./routes/posts/comment");
const likeDislikeRouter = require("./routes/posts/likeDislike");

app.use("/api/auth", authRouter);
app.use("/api/upload", imageUploadRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
//blog routes
app.use("/api/blog/category", postCategoryRouter);
app.use("/api/blog", postRouter);
app.use("/api/blog/comment", commentRouter);
app.use("/api/blog/likeDislike", likeDislikeRouter);

// Not Found Middleware
const notFoundMiddleware = require("./middleware/notFound");
app.use(notFoundMiddleware);

module.exports = app;
