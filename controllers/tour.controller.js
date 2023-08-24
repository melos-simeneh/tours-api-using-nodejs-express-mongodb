const Tour = require("../models/tour.model");
exports.getAllTours = (req, res) => {
  res.status(200).json({ status: "success", data: {} });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: "success", data: { tour: newTour } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Failed to create tour" });
  }
};
