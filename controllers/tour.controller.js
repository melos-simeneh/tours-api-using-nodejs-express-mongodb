const Tour = require("../models/tour.model");

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));

    //sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error("This page doesn't exist");
    }

    //excute query
    const tours = await query;

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
