const Tour = require("../models/tour.model");
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res
      .status(200)
      .json({ status: "success", results: tours.length, data: { tours } });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to get tours",
      error: error.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Tour created",
      data: { tour: newTour },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to create tour",
      error: error.message,
    });
  }
};
