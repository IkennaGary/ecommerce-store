const { Op } = require("sequelize");
const { BadRequestError, UnauthorizedError } = require("../errors");
const { BlogCategory, Post, User, Comment, LikeDislike } = require("../models");

class BlogService {
  async addBlog(data) {
    const { id: categoryId } = await BlogCategory.findOne({
      where: { name: data.category },
    });
    if (!categoryId) {
      throw new BadRequestError("Invalid category");
    }

    data.categoryId = categoryId;

    const existingPost = await Post.findOne({
      where: { title: data.title, categoryId },
    });

    if (existingPost) {
      throw new BadRequestError("blog already exists in this category");
    }

    const response = await Post.create(data);

    return response;
  }

  async getAllPosts(page, limit, sortBy, sortDirection, params) {
    const offset = (page - 1) * limit;
    const order = [[sortBy, sortDirection]];
    const pageParams = { limit, page, offset };

    delete params.page;
    delete params.limit;

    const posts = await Post.findAll({
      limit,
      offset,
      order,
      include: [
        { model: Comment, as: "comments" },
        { model: User, as: "author" },
        { model: LikeDislike, as: "likes" },
      ],
      //   where: params,
    });

    return { posts, pageParams };
  }

  async getPost(id) {
    const response = await Post.findByPk(id);
    if (!response) {
      throw new BadRequestError("Post not found");
    }
    return response;
  }

  async updatePost(id, data) {
    if (data.category) {
      const { id: categoryId } = await BlogCategory.findOne({
        where: { name: data.category },
      });

      if (!categoryId) {
        throw new BadRequestError("Invalid category");
      }

      data.categoryId = categoryId;
    }

    const existingPost = await Post.findByPk(id);

    if (!existingPost) {
      throw new BadRequestError("Post doesn't exist");
    }
    await Post.update(data, { where: { id } });

    return "Post updated successfully";
  }

  async incrementViews(id) {
    try {
      const post = await Post.findByPk(id);
      if (post) {
        post.views += 1;
        await post.save();
      }
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  }

  async countRecords(data) {
    const response = await Post.count({ where: data });
    return response;
  }

  async deletePost(id) {
    const response = await Post.findByPk(id);

    if (!response) {
      throw new BadRequestError("Post not found");
    }

    await Post.destroy({ where: { id } });

    return "Post deleted successfully";
  }

  async getPostsByCategory(id, page, limit, sortBy, sortDirection, params) {
    const offset = (page - 1) * limit;
    const order = [[sortBy, sortDirection]];

    const pageParams = { limit, page, offset };
    params.id = id;

    delete params.page;
    delete params.limit;

    const post = await Post.findAll({
      limit,
      offset,
      order,
      where: { categoryId: params.id },
    });

    return { post, pageParams };
  }

  async getPostsByUser(userId, page, limit, sortBy, sortDirection, params) {
    const offset = (page - 1) * limit;
    const order = [[sortBy, sortDirection]];

    const pageParams = { limit, page, offset };
    params.authorId = userId;

    delete params.page;
    delete params.limit;

    const posts = await Post.findAll({
      limit,
      offset,
      order,
      where: params,
    });

    return { posts, pageParams };
  }

  async getPopularPosts(limit) {
    const popularPosts = await Post.findAll({
      limit,
      order: [["views", "DESC"]],
    });
    return popularPosts;
  }

  async searchPosts(searchTerm) {
    const searchQuery = `%${searchTerm}%`;
    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: searchQuery } },
          { content: { [Op.like]: searchQuery } },
          { category: { [Op.like]: searchQuery } },
          { tags: { [Op.like]: searchQuery } },
        ],
      },
    });

    return posts;
  }
}

const blogService = new BlogService();

module.exports = blogService;
