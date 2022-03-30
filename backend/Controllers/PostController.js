const Post = require("../Models/Post");

class PostController {
  getAllPosts = async (req, res, next) => {
    const post = await Post.find();

    res?.status(200).json({
      success: true,
      data: post,
    });
  };
}

module.exports = new PostController();
