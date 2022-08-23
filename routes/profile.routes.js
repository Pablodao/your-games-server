const router = require("express").Router();
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

//* GET "/api/email" =>  Find user in DB
router.get("/my-profile", isAuthenticated, async (req, res, next) => {
  console.log("req.payload", req.payload);
  const { _id } = req.payload;
  try {
    const findUser = await User.findById(_id);
    console.log(findUser);
    res.json(findUser);
  } catch (error) {
    console.log("Error user /", error);
    next(error);
  }
});

//* GET "/api/profile/:id" =>  Find user in DB
router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const findUser = await User.findById(id);
    console.log(findUser);
    res.json(findUser);
  } catch (error) {
    console.log("Error user /", error);
    next(error);
  }
});

//* PATCH "/api/profile/edit" => Edit user in DB
router.patch("/:id/edit", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { name, email, avatar } = req.body;
  try {
    const editedUser = await User.findByIdAndUpdate(id, {
      name,
      email,
      avatar,
    });
    console.log(editedUser);
    res.json(editedUser);
  } catch (error) {
    next(error);
  }
});

//* PATCH "/api/profile/close-account" => Block a user account
router.patch("/close-account", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  try {
    await User.findByIdAndUpdate(_id, {
      accountClosed: true,
    });
    res.status(200).json({ message: "Acount closed ! " });
  } catch (error) {
    next(error);
  }
});

//TODO Como sumar likes y dislikes en findByIdAndUpdate
//* PATCH /api/profile/like/:commentId" => Add comment to likedComments
router.patch("/like/:commentId", isAuthenticated, async (req, res, next) => {
  const { commentId } = req.params;
  const { _id } = req.payload;

  try {
    //comprobar si el comentario ya tiene el like del usuario
    const isCommentLiked = await Comment.findOne( { likes: _id})
    console.log(isCommentLiked)
    //si lo tiene quitarlo
    // si no lo tiene comprobar que si tiene dislike
    //si lo tiene quitarlo y agregar like 
    

    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

//* PATCH /api/profile/dislike/:commentId" => Add comment to dislikedComments
router.patch("/dislike/:commentId", isAuthenticated, async (req, res, next) => {
  const { commentId } = req.params;
  const { _id } = req.payload;

  try {
    const isCommentLiked = await User.findById(_id, {
      likedComments: commentId,
    });
    if (isCommentLiked) {
      await Comment.findByIdAndUpdate(commentId, {
        $inc: { dislikes: 1 },
        $inc: { likes: -1 },
      });
    } else {
      await Comment.findByIdAndUpdate(commentId, {
        $inc: { dislikes: 1 },
      });
    }
    await User.findByIdAndUpdate(_id, {
      $addToSet: { dislikedComments: commentId },
      $pull: { likedComments: commentId },
    });

    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
