const { LikeDislike, Post, User } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const likePost = async (req, res) => {
  const { id: postId } = req.params;
  const userId = req.user.id;

  if (!postId) {
    throw new BadRequestError("postId required");
  }

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    const existingLike = await LikeDislike.findOne({
      where: { postId, userId, isLike: true },
    });
    if (existingLike) {
      await existingLike.destroy();
      res.status(StatusCodes.OK).json({ message: "Like removed" });
    } else {
      await LikeDislike.create({ postId, userId, isLike: true });
      res.status(StatusCodes.CREATED).json({ message: "Post liked" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const dislikePost = async (req, res) => {
  const { id: postId } = req.params;
  const userId = req.user.id;

  try {
    const existingDislike = await LikeDislike.findOne({
      where: { postId, userId, isLike: false },
    });
    if (existingDislike) {
      await existingDislike.destroy();
      res.status(StatusCodes.OK).json({ message: "dislike removed" });
    } else {
      await LikeDislike.create({ postId, userId, isLike: false });
      res.status(StatusCodes.CREATED).json({ message: "Post disliked" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getLikesDislikes = async (req, res) => {
  const { id: postId } = req.params;
  if (!postId) {
    throw new BadRequestError("postId required");
  }
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    const likes = await LikeDislike.count({ where: { postId, isLike: true } });
    const dislikes = await LikeDislike.count({
      where: { postId, isLike: false },
    });

    res.status(200).json({ likes, dislikes });
  } catch (error) {
    res.status(500).json({ error: "Failed to get likes and dislikes" });
  }
};

module.exports = { likePost, dislikePost, getLikesDislikes };
