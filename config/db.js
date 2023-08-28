const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

exports.connect = async () => {
  await mongoose.connect(process.env.MONGO_DATABASE).then(() => {
    console.log("Database Connected Successfully!");
  });
  // .catch((error) => {
  //   console.log("Connection to Database Failed!");
  //   throw error;
  // });
};
