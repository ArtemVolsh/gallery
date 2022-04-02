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
    immutable: true,
    required: true,
    default: () => Date.now(),
  },
  updatedDate: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

const Exhibition = new Schema({
  name: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  date: {
		type: Date,
    required: true,
		default: () => Date.now(),
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  endDate: {
    type: Date,
    required: false,
  },
  theme: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    default: 0,
    required: false,
  },
  feedback: [{ type: Feedback }],
});

module.exports = model("Exhibition", Exhibition);
