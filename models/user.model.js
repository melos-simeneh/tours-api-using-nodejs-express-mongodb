const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "User's name is is required"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
