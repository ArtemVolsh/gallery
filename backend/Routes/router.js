const express = require("express");
const PostController = require("../Controllers/PostController");
const router = express.Router();

// @route - /api/v1/cve
router.route("/").get(PostController.getAllPosts);

module.exports = router;
