const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

const isAuthenticated = require("../middlewares/isAuthenticated");

//* GET "/api/profile/my-profile" =>  Find user in DB
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

module.exports = router;
