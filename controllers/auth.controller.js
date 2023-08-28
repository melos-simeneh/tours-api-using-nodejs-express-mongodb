const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({ name, email, password, passwordConfirm });
  res.status(201).json({
    status: "success",
    message: "user created",
    data: {
      user: newUser,
    },
  });
});
