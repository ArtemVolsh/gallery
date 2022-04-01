const News = require("../Models/News");

class NewsController {
  getAllPosts = async (req, res, next) => {
    const news = await News.find();

    res?.status(200).json({
      success: true,
      data: news,
    });
  };
}

module.exports = new NewsController();
