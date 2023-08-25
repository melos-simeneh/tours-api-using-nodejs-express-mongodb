const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour name is required"],
      trim: true,
      unique: true,
      maxLength: [
        40,
        "A tour name must have less than or equal to 40 characters ",
      ],
      minLength: [
        10,
        "A tour name must have greater than or equal to 10 characters ",
      ],
    },
    slug: String,
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
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1"],
      max: [5, "Rating must be below 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
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
    secretTour: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

//VIRTUAL PROPERTIES
tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

//DOCUMENT Middleware: runs before .save() and .create()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// tourSchema.post("save", function (doc, next) {
//   console.log(doc);
//   next();
// });

//QUERY MIDDLEWARE
// tourSchema.pre("find", function (next) {

tourSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  this.find({ secretTour: { $ne: true } });
  next();
});
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now(-this.start)} milliseconds`);
  // console.log(docs);
  next();
});

//AGGREGATION MIDDLEWARE
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
