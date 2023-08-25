const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tour name is required"],
    trim: true,
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, "Tour duration is required"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "Tour group size is required"],
  },
  difficulty: {
    type: String,
    required: [true, "Tour difficulty is required"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "Tour price is required"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "A tour must have a summary"],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a images cover"],
  },
  images: [String],
  startDates: [Date],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
