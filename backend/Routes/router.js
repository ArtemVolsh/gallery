const express = require("express");
const NewsController = require("../Controllers/NewsController");
const router = express.Router();

router.route("/").get(NewsController.getAllNews);

module.exports = router;
