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

  createExcursion = async (req, res, next) => {
    const { excursion } = req.body;
    const excs = await Excursions.create(excursion);

    res.status(201).json({
      success: true,
      data: excs,
    });
  };
}

module.exports = new ExcursionsController();
