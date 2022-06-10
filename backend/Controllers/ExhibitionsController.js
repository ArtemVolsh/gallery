const Exhibitions = require("../Models/Exhibition");

class ExhibitionsController {
  getAllExhibitions = async (req, res, next) => {
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

    const exhs = await Exhibitions.find(parsedString);

    res.status(200).json({
      success: true,
      data: exhs,
    });
  };

  createExhibition = async (req, res, next) => {
    const { exhibition } = req.body;
    const exhs = await Exhibitions.create(exhibition);

    res.status(201).json({
      success: true,
      data: exhs,
    });
  };
}

module.exports = new ExhibitionsController();
