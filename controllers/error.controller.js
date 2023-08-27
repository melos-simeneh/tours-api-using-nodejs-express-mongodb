const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Inavlid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational,trusted error:send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //Programming or other unknown error: don't leak error details
    //Log error
    console.error("ERROR 🔥", err);

    //send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  const NODE_ENV = process.env.NODE_ENV.trim();
  console.log(NODE_ENV === "production");
  if (NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastErrorDB(err);
    sendErrorProd(error, res);
  }
};
