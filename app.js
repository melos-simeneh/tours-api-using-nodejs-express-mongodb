const express = require("express");
const tourRoutes = require("./routes/tour.routes");

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use("/api/tours", tourRoutes);

module.exports = app;
