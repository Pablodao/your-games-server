const router = require("express").Router();
const Game = require("../models/Game.model");
const Comment = require("../models/Comment.model");

const isAuthenticated = require("../middlewares/isAuthenticated");

//* GET "/api/comments/:gameId" => List all comments of a game
router.get("/:gameId", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;
  try {
    const comments = await Comment.find({ game: gameId }).populate("creator");
    console.log("Comments get ", comments);
    res.json(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//* POST "/api/comments/:gameId" => Add one comment to the DB
router.post("/:gameId", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;
  const { content, title } = req.body;
  const { _id } = req.payload;
  console.log("req.body post new comment ", req.body);
  try {
    const newComment = await Comment.create({
      title,
      content,
      creator: _id,
      game: gameId,
    });
    console.log("newComment", newComment);
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//* PATCH "/api/comments/:commentId" => Edit one comment from the DB
router.patch("/:commentId", isAuthenticated, async (req, res, next) => {
  const { commentId } = req.params;
  const { content, title } = req.body;
  try {
    await Comment.findByIdAndUpdate(commentId, {
      title: title,
      content: content,
      isEdited: true,
    });
    res.json({ message: "comment edited correctly" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//* PATCH "/api/comments/:commentId/like"
router.patch("/:commentId/like", isAuthenticated, async (req, res, next) => {
  const { commentId } = req.params;
  const { likes } = req.body;
  try {
    await Comment.findByIdAndUpdate(commentId, {
      likes,
    });
    res.json({ message: "comment liked" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//* PATCH "/api/comments/:commentId/dislike"
router.patch("/:commentId/like", isAuthenticated, async (req, res, next) => {
  const { commentId } = req.params;
  const { dislikes } = req.body;
  try {
    await Comment.findByIdAndUpdate(commentId, {
      dislikes,
    });
    res.json({ message: "comment liked" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//* DELETE "/api/games/:gameId/comment" => Delete one comment from the DB
router.delete("/:commentId", isAuthenticated, async (req, res, next) => {
  const { commentId } = req.params;
  try {
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "comment deleted correctly" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
