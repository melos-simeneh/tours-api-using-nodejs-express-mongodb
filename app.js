const express = require("express");
const cors = require("cors");
const tourRoutes = require("./routes/tour.routes");
const userRoutes = require("./routes/user.routes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/tours", tourRoutes);
app.use("/api/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`api url ${req.url} not found`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
