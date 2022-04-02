const Exhibitions = require("../Models/Exhibition");

class ExhibitionsController {
  getAllExhibitions = async (req, res, next) => {
    const reqQuery = { ...req.query };

    const removeFields = ["sort"];

    removeFields.forEach((value) => delete reqQuery[value]);

    let queryString = JSON.stringify(reqQuery);

    queryString = queryString.replace(
      /\b(gt|gte|lt|lte|in|regex)\b/g,
      (match) => `$${match}`
    );

    const exhs = await Exhibitions.find(JSON.parse(queryString));

    res.status(200).json({
      success: true,
      data: exhs,
    });
  };
}

module.exports = new ExhibitionsController();
