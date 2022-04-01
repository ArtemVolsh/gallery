const { Schema, model } = require("mongoose");

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
});

module.exports = model("Exhibition", Exhibition);
