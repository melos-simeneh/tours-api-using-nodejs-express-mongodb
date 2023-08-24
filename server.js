const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = require("./app");
const mongo = require("./config/db");

mongo.connect();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
