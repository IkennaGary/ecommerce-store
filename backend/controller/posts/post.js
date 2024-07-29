const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../errors");
const { Post, User, BlogCategory } = require("../../models");
const BlogService = require("../../services/BlogServices");
const { createProductValidator } = require("../../validators/posts/post");
const pagination = require("../../utils/pagination");

const createPost = async (req, res) => {
  const { title, content, thumbnail, category } = req.body;
  const { id: userId } = req.user;
  const data = req.body;
  data.authorId = userId;

  if ((!title, !content, !thumbnail, !category)) {
    throw new BadRequestError("All fields are required");
  }
  try {
    const response = await BlogService.addBlog(data);
    res.status(StatusCodes.OK).json({ success: true, message: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let sortBy = req.query.sortBy || "title";
  const sortDirection = req.query.sortDirection || "ASC";
  const params = req.query;

  try {
    const count = await BlogService.countRecords({});

    const { posts, pageParams } = await BlogService.getAllPosts(
      page,
      limit,
      sortBy,
      sortDirection,
      params
    );
    res.status(StatusCodes.OK).json({
      success: true,
      data: posts,
      meta: pagination(count, pageParams),
    });
  } catch (error) {
    console.log(error);
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("id is required");
  }

  try {
    await BlogService.incrementViews(id);
    const response = await BlogService.getPost(id);
    res.status(StatusCodes.OK).json({ success: true, data: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  const data = req.body;

  if (!id) {
    throw new BadRequestError("id is required");
  }

  try {
    const response = await BlogService.updatePost(id, data);

    res.status(StatusCodes.OK).json({ success: true, message: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("id is required");
  }

  try {
    const response = await BlogService.deletePost(id);

    res.status(StatusCodes.OK).json({ success: true, message: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getPostsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let sortBy = req.query.sortBy || "title";
  const sortDirection = req.query.sortDirection || "ASC";
  const params = req.query;

  if (!categoryId) {
    throw new BadRequestError("categoryId is required");
  }

  const count = await BlogService.countRecords({ categoryId: categoryId });

  try {
    const { posts, pageParams } = await BlogService.getPostsByCategory(
      categoryId,
      page,
      limit,
      sortBy,
      sortDirection,
      params
    );

    res.status(StatusCodes.OK).json({
      success: true,
      data: posts,
      meta: pagination(count, pageParams),
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getPostsByUser = async (req, res) => {
  const { id: userId } = req.user;
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let sortBy = req.query.sortBy || "title";
  const sortDirection = req.query.sortDirection || "ASC";
  const params = req.query;

  try {
    const count = await BlogService.countRecords({ authorId: userId });

    const { posts, pageParams } = await BlogService.getPostsByUser(
      userId,
      page,
      limit,
      sortBy,
      sortDirection,
      params
    );

    res.status(StatusCodes.OK).json({
      success: true,
      data: posts,
      meta: pagination(count, pageParams),
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getPopularPosts = async (req, res) => {
  let limit = parseInt(req.query.limit) || 10;
  try {
    const posts = await BlogService.getPopularPosts(limit);
    res.status(StatusCodes.OK).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  if (!searchQuery) {
    throw new BadRequestError("Search query is required");
  }
  try {
    const posts = await BlogService.searchPosts(searchQuery);

    for (const post of posts) {
      await BlogService.incrementViews(post.id);
    }

    res.status(StatusCodes.OK).json({ success: true, data: posts });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPostsByCategory,
  getPostsByUser,
  getPopularPosts,
  getPostsBySearch,
};
