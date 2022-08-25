const router = require("express").Router();
const uploader = require("../middlewares/uploader");

//POST "/api/upload" => Recive one img and send it to Cloudinary
router.post("/", uploader.single("image"), (req, res, next) => {
  if (req.file === undefined) {
    res.status(400).json({ errorMessage: "Wrong img format/img not found" });
    return;
  }
  res.json({ imageUrl: req.file.path });
});

module.exports = router;
