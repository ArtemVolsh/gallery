const express = require("express");
const NewsController = require("../Controllers/NewsController");
const ExhibitionsController = require("../Controllers/ExhibitionsController");
const router = express.Router();

router.route("/news").get(NewsController.getAllNews);
router.route("/exhibitions").get(ExhibitionsController.getAllExhibitions);

module.exports = router;
