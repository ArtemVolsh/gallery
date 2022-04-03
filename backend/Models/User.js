const { Schema, model } = require("mongoose");

const User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    ref: "Role",
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
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
