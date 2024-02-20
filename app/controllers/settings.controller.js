const db = require("../models");
const Settings = db.Settings;
const Op = db.Sequelize.Op;

module.exports.getSettings = (req, res) => {

    Settings.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send({ error: err.message || "Settings data request failed" })
        });

}

module.exports.findById = () => {

    Settings.findOne({


    });

}

module.exports.addSetting = () => {




}

module.exports.updateSetting = () => {




}

module.exports.deleteSetting = () => {




}
