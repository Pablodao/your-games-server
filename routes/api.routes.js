const { default: axios } = require("axios");

const router = require("express").Router();

//* GET "/api/apiCall"

router.get("/:page", async (req, res, next) => {
  const { page } = req.params;
  try {
    const response = await axios(
      `https://api.rawg.io/api/games?key=848748eade3647ecbf3ac299d1c7b50c&page_size=9&page=${page}`
    );
   
    res.status(200).json(response.data);

  } catch (error) {
    next(error);
  }
});

//* GET "/api/apiCall/details/:gameId"

router.get("/details/:gameId", async (req, res, next) => {
  const { gameId } = req.params;
  console.log("GAMEID",gameId)
  try {
    const response = await axios(
      `https://api.rawg.io/api/games/${gameId}?key=848748eade3647ecbf3ac299d1c7b50c`
    );
    console.log("RESPONSE",response.data)
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
