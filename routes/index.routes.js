const router = require("express").Router();

// GET "api"
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//* Auth routes
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

//* User routes 
const profileRoutes = require("./profile.routes")
router.use("/profile", profileRoutes)

//* Games routes
const gamesRoutes = require("./games.routes")
router.use("/games", gamesRoutes)

//* Comment routes 
const commentsRoutes = require("./comments.routes")
router.use("/comments", commentsRoutes)

module.exports = router;

