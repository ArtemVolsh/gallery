const express = require("express");
const NewsController = require("../Controllers/NewsController");
const ExhibitionsController = require("../Controllers/ExhibitionsController");
const AuthenticationController = require("../Controllers/AuthenticationController");
const router = express.Router();

router.route("/news").get(NewsController.getAllNews);
router.route("/exhibitions").get(ExhibitionsController.getAllExhibitions);
router.route("/registration").post(AuthenticationController.registration);
// router.route("/login").post(AuthenticationController.login);

module.exports = router;
