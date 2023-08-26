const express = require("express");
const tourRoutes = require("./routes/tour.routes");

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use("/api/tours", tourRoutes);

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `api url ${req.url} is not found`,
  // });
  const err = new Error(`api url ${req.url} is not found`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({ status: err.status, message: err.message });
});

module.exports = app;
