const Excursions = require("../Models/Excursion");

class ExcursionsController {
  getAllExcursions = async (req, res, next) => {
    let query;

    const reqQuery = { ...req.query };

    const removeFields = ["sort"];

    removeFields.forEach((value) => delete reqQuery[value]);

    let queryString = JSON.stringify(reqQuery);

    queryString = queryString.replace(
      /\b(gt|gte|lt|lte|in|regex)\b/g,
      (match) => `$${match}`
    );

    query = Excursions.find(JSON.parse(queryString));

    if (req.query.sort) {
      const sortByArr = req.query.sort.split(",");
      const sortByStr = sortByArr.join("");
      query = query.sort(sortByStr);
    } else {
      query = query.sort("name");
    }

    const excs = await query;

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
