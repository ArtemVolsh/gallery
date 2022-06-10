const News = require("../Models/News");

class NewsController {
  getAllNews = async (req, res, next) => {
    const reqQuery = { ...req.query };

    const removeFields = ["sort"];

    removeFields.forEach((value) => delete reqQuery[value]);

    let queryString = JSON.stringify(reqQuery);

    queryString = queryString.replace(
      /\b(gt|gte|lt|lte|in|regex|options|eq)\b/g,
      (match) => `$${match}`
    );

    let parsedString = JSON.parse(queryString);

    console.log(parsedString);

    for (let [key, value] of Object.entries(parsedString)) {
      if (parsedString[key].hasOwnProperty("$regex")) {
        parsedString[key] = { ...parsedString[key], $options: "i" };
      }
    }

    console.log(parsedString);

    const news = await News.find(parsedString);

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
