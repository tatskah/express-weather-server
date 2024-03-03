module.exports = (app, express) => {
    const router = express.Router();
    const settings = require("../controllers/settings.controller");

    router.get("/", settings.getSettings);
    router.post("/", settings.saveSettings);

    // router.get("/:id", settings.findById);
    // router.delete("/:id", settings.deleteSetting);
    // router.post("/", settings.addSetting);

    app.use("/api/settings", router);
};
