const express = require("express");
require("dotenv").config();

const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const imageUploadRouter = require("./routes/imageUpload");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const postCategoryRouter = require("./routes/posts/postCategory");
const postRouter = require("./routes/posts/post");
const commentRouter = require("./routes/posts/comment");
const likeDislikeRouter = require("./routes/posts/likeDislike");
const reviewRouter = require("./routes/review");
const cartRouter = require("./routes/cart");
const wishlistRouter = require("./routes/wishlist");
const shippingInfoRouter = require("./routes/shippingInfo");
const paymentMethodRouter = require("./routes/PaymentMethod");
const orderRouter = require("./routes/order");

//auth routes
app.use("/api/auth", authRouter);
//user routes
app.use("/api/user", userRouter);
//image upload routes
app.use("/api/upload", imageUploadRouter);
//product routes
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/review", reviewRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
//blog routes
app.use("/api/blog/category", postCategoryRouter);
app.use("/api/blog", postRouter);
app.use("/api/blog/comment", commentRouter);
app.use("/api/blog/likeDislike", likeDislikeRouter);
//Shipping Information routes
app.use("/api/shipping", shippingInfoRouter);
//Order routes
app.use("/api/order", orderRouter);
app.use("/api/payment-method", paymentMethodRouter);

// Not Found Middleware
const notFoundMiddleware = require("./middleware/notFound");
app.use(notFoundMiddleware);

module.exports = app;
