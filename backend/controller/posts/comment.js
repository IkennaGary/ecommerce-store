const { Comment, User, Post } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const addComment = async (req, res) => {
  const { content, postId } = req.body;
  const userId = req.user.id;

  if (!content || !postId) {
    throw new BadRequestError("Content and postId are required");
  }

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    const comment = await Comment.create({ content, postId, userId });
    res.status(StatusCodes.CREATED).json({ message: true, data: comment });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { id },
      include: [{ model: User, as: "user" }],
    });
    res.status(StatusCodes.OK).json({ message: true, data: comments });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const comment = await Comment.findOne({ where: { id, userId } });
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    await comment.destroy();
    res.status(StatusCodes.OK).json({ message: "Comment deleted" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = { addComment, getComments, deleteComment };
