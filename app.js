const express = require("express");
const tourRoutes = require("./routes/tour.routes");

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use("/api/tours", tourRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `api url ${req.url} is not found`,
  });
});

module.exports = app;
