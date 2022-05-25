const News = require("../Models/News");

class NewsController {
  getAllNews = async (req, res, next) => {
    const reqQuery = { ...req.query };

    const removeFields = ["sort"];

    removeFields.forEach((value) => delete reqQuery[value]);

    let queryString = JSON.stringify(reqQuery);

    queryString = queryString.replace(
      /\b(gt|gte|lt|lte|in|regex)\b/g,
      (match) => `$${match}`
    );

    const news = await News.find(JSON.parse(queryString));

    res.status(200).json({
      success: true,
      data: news,
    });
  };

  createNews = async (req, res, next) => {
    const { news } = req.body;
    const newsItem = await News.create(news);

    res.status(201).json({
      success: true,
      data: newsItem,
    });
  };
}

module.exports = new NewsController();
