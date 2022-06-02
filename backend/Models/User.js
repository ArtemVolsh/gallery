const { Schema, model } = require("mongoose");

const User = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    ref: "Role",
  },
  activationLink: {
    type: String,
    required: true,
  },
  activated: {
    type: Boolean,
    required: true,
    default: false,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: [false],
  },
});

module.exports = model("User", User);
