 const { Schema, model } = require("mongoose");

const Feedback = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Exhibition = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    theme: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      default: "https://www.jquery-az.com/html/images/banana.jpg",
    },
    price: {
      type: Number,
      default: 0,
      required: false,
    },
    feedback: [{ type: Feedback }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Exhibition", Exhibition);
