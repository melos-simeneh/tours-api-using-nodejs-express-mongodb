const Tour = require("../models/tour.model");
const APIFeatures = require("../utils/apiFeatures");
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    //send response
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

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({ status: "success", data: { tour } });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Failed to get tour",
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

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Tour created",
      data: { tour: updatedTour },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Failed to update tour",
      error: error.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "Tour deleted",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Failed to delete tour",
      error: error.message,
    });
  }
};
