const express = require("express");
const tourRoutes = require("./routes/tour.routes");
const AppError = require("./utils/appError");

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use("/api/tours", tourRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`api url ${req.url} not found`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({ status: err.status, message: err.message });
});

module.exports = app;
