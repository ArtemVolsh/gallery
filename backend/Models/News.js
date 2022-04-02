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

const News = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publishedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  feedback: [{ type: Feedback }],
  publishedDate: {
    type: Date,
    required: true,
    immutable: true,
    default: () => Date.now(),
  },
  updateDate: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

module.exports = model("News", News);
