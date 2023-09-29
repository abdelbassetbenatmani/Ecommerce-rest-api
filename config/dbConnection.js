const mongoose = require("mongoose");
const logger = require("./logger");

const dbConnection = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => logger.error(`check connection db ${err.message}`));
};
module.exports = dbConnection;
