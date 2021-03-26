const { Schema, model } = require("mongoose");

const User = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userSchema = model("users", User);

module.exports = { userSchema };
