const router = require("express").Router();
const User = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");

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
  const { name, email, avatar, password } = req.body;
  try {
    const editedUser = await User.findByIdAndUpdate(id, {
      name,
      email,
      avatar,
      password,
    });
    console.log(editedUser)
    res.json(editedUser)
  } catch (error) {
    next(error);
  }
});

//* PATCH "/api/profile/close-account" => ???

module.exports = router;
