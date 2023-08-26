const express = require("express");
const tourRoutes = require("./routes/tour.routes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use("/api/tours", tourRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`api url ${req.url} not found`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
