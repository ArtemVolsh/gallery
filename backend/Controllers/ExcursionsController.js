const Excursions = require("../Models/Excursion");

class ExcursionsController {
  getAllExcursions = async (req, res, next) => {
    const reqQuery = { ...req.query };

    const removeFields = ["sort"];

    removeFields.forEach((value) => delete reqQuery[value]);

    let queryString = JSON.stringify(reqQuery);

    queryString = queryString.replace(
      /\b(gt|gte|lt|lte|in|regex)\b/g,
      (match) => `$${match}`
    );

    const excs = await Excursions.find(JSON.parse(queryString));

    res.status(200).json({
      success: true,
      data: excs,
    });
  };
}

module.exports = new ExcursionsController();
