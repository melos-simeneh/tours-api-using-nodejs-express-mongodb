const dotenv = require("dotenv");
dotenv.config({ path: "/.env" });
const app = require("./app");
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
