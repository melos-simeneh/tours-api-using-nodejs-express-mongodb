const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please tell use your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
