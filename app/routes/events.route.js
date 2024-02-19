module.exports = (app, express) => {
  const router = express.Router();
  const events = require("../controllers/events.controller");

  router.get("/", events.getEvents);
  router.get("/:id", events.findById);
  router.delete("/:id", events.deleteEvent);
  router.post("/", events.addEvent);
  router.post("/:id", events.updateEvent);

  app.use("/api/events", router);
};
