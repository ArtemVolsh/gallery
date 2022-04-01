const { Schema, model } = require("mongoose");

const Excursion = new Schema({
  name: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: false,
    default: 0,
  },
  offeredBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: Number,
    required: false,
    default: 0,
  },
  feedback: [{ type: String, ref: "Feedback" }],
});

module.exports = model("Excursion", Excursion);
