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
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.accofusion.com%2Fpublic%2Fupload_image%2Faccident_media%2F&psig=AOvVaw2LT-8lK07SyiM0tPCluLpN&ust=1652695539689000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKicreig4fcCFQAAAAAdAAAAABAD",
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
