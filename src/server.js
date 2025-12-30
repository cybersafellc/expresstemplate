const app = require("./app");
const logger = require("./config/logging");
const dotenv = require("dotenv");
dotenv.config();

app.listen(3000, () => {
  logger.info("Server running on http://localhost:3000");
});
