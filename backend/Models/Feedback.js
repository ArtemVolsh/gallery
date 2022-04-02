const { Schema, model } = require("mongoose");

const Feedback = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  updatedDate: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

module.exports = model("Feedback", Feedback);