const express = require("express");
const NewsController = require("../Controllers/NewsController");
const ExhibitionsController = require("../Controllers/ExhibitionsController");
const AuthenticationController = require("../Controllers/AuthenticationController");
const ExcursionsController = require("../Controllers/ExcursionsController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router
  .route("/news")
  .get(authMiddleware, NewsController.getAllNews)
  .post(NewsController.createNews);
router
  .route("/exhibitions")
  .get(ExhibitionsController.getAllExhibitions)
  .post(ExhibitionsController.createExhibition);
router
  .route("/excursions")
  .get(ExcursionsController.getAllExcursions)
  .post(ExcursionsController.createExcursion);

router.route("/refresh").get(AuthenticationController.refresh);

router.route("/users").post(AuthenticationController.getUserById);

router.route("/registration").post(AuthenticationController.registration);
router.route("/login").post(AuthenticationController.login);

module.exports = router;
