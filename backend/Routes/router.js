const express = require("express");
const NewsController = require("../Controllers/NewsController");
const ExhibitionsController = require("../Controllers/ExhibitionsController");
const AuthenticationController = require("../Controllers/AuthenticationController");
const ExcursionsController = require("../Controllers/ExcursionsController");
const router = express.Router();

router.route("/news").get(NewsController.getAllNews);
router.route("/exhibitions").get(ExhibitionsController.getAllExhibitions);
router.route("/excursions").get(ExcursionsController.getAllExcursions);
router.route("/registration").post(AuthenticationController.registration);
router.route("/login").post(AuthenticationController.login);

module.exports = router;
