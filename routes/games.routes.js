const router = require("express").Router();
const Game = require("../models/Game.model");
const Comment = require("../models/Comment.model");

const isAuthenticated = require("../middlewares/isAuthenticated");

//* POST "/api/games/:gameId" => Add one game valoration  to the DB
router.post("/:gameId", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;
  const { valoration } = req.body;
  const { _id } = req.payload;

  try {
    const newGame = await Game.create({
      valoration: valoration,
      apiId: gameId,
      creator: _id,
    });
    res.json(newGame);
  } catch (error) {
    next(error);
  }
});

//* GET "/api/games/:gameId" => Find user game valoration  in the DB
router.get("/:gameId", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;
  const { _id } = req.payload;
  try {
    const findGame = await Game.findOne({ creator: _id, apiId: gameId }).select(
      "valoration"
    );

    res.json(findGame);
  } catch (error) {
    next(error);
  }
});

//* GET "/api/games/:gameId/valorations" =>  Find all valorations of a game
router.get("/:gameId/valorations", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;
  try {
    const findGame = await Game.find({ apiId: gameId }).select("valoration");
    res.json(findGame);
  } catch (error) {
    next(error);
  }
});

//*PATCH "api/games/:gameId" => Edit one valoration of a game
router.patch("/:gameId", isAuthenticated, async (req, res, next) => {
  const { gameId } = req.params;
  const { _id } = req.payload;
  const { valoration } = req.body;
  try {
    const GameValoration = await Game.findOneAndUpdate(
      { creator: _id, apiId: gameId },
      {
        valoration: valoration,
      }
    );

    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
