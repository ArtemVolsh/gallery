const { Schema, model } = require("mongoose");

const Excursion = new Schema(
  {
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
      default: 0,
    },
    image: {
      type: String,
      default: "https://www.jquery-az.com/html/images/banana.jpg",
    },
    feedback: [{ type: String, ref: "Feedback" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Excursion", Excursion);
