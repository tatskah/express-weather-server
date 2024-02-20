const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./app/utils/logger");
const config = require("./app/utils/config");
const { requestLogger } = require("./app/utils/middleware");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(function (reg, res, next) {
  logger.info("Time: %d", Date.now());
  next();
});

require("./app/routes/events.route")(app, express);
require("./app/routes/weatherApi.route")(app, express);
require("./app/routes/settings.route")(app, express);

const db = require("./app/models");
const { TIME } = require("sequelize");
db.sequelize
  //.sync()
  .authenticate()
  .then(() => {
    logger.info("Synced db.");
  })
  .catch((err) => {
    logger.error("Failed to sync db: " + err.message);
  });

app.use(requestLogger);

app.get("/", (req, res) => {
  res.json({ message: "Helou i'm weather rest api." });
});

const PORT = config.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}.`);
});

module.exports = app;
