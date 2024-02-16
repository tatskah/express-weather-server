module.exports = (app, express) => {
  const router = express.Router();
  const weatherApi = require("../controllers/weatherApi.controller");
  const config = require("../utils/config");

  router.get("/", weatherApi.getWeatherData);

  app.use("/api/weatherdata", router);
};
