const router = require("express").Router();
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
//* GET "/api/profile/favourites" =>  find user's favourite games
router.get("/favourites", isAuthenticated, async (req, res, next) => {
  console.log("req.payload", req.payload);
  const { _id } = req.payload;
  try {
    const user = await User.findById(_id).select("favourites");
    console.log("finduser", user);
    res.json(user);
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

//* PATCH "/api/profile/:id/edit" => Edit user in DB
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

//* PATCH "/api/profile/favourites/:gameId" => Add a  game to user favourite games
router.patch("/favourites/:gameId", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;
  const { _id } = req.payload;
  try {
    const user = await User.findById(_id);
    console.log(user.favourites);

    if (user.favourites.includes(gameId)) {
      const removeFromFavourite = await User.findByIdAndUpdate(_id, {
        $pull: { favourites: gameId },
      });
      console.log("elemento quitado de favoritos", removeFromFavourite);
    } else {
      const addToFavourite = await User.findByIdAndUpdate(_id, {
        $addToSet: { favourites: gameId },
      });
      console.log("elemento agregado a favoritos", addToFavourite);
    }
    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
