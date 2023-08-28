const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = require("./app");
const mongo = require("./config/db");

mongo.connect();

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  process.exit(1);
});
