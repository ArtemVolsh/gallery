const { Schema, model } = require("mongoose");

const POST = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for a CVE"],
    unique: true,
  },
  number: {
    type: Number,
    required: [true, "Please provide a danger for a CVE"],
  },
});

module.exports = model("Post", POST);
