const router = require("express").Router();

// GET "api"
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//* Auth routes
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)


module.exports = router;

//* Games routes

//* User routes 