const { Schema, model } = require("mongoose");

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
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
    immutable: true,
    default: () => Date.now(),
  },
  updateDate: {
    type: Date,
    required: true,
  },
});

module.exports = model("News", News);
