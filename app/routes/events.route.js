module.exports = (app, express) => {
  const router = express.Router();
  const events = require("../controllers/events.controller");

  router.get("/", events.getEvents);
  router.get("/:id", events.findById);

  app.use("/api/events", router);
};
