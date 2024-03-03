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

module.exports.updateSetting = (req, res) => {
    const data = req.body;
    console.log(data);



}

module.exports.saveSettings = async (req, res) => {
    const data = req.body;
    console.log(data);

    for (item of data) {
        const id = item.id
        const name = item.name;
        const value = item.value;

        if (id === undefined) {
            const result = await db.sequelize.query('SELECT MAX(id)+1 AS id FROM settings', { raw: true, type: db.Sequelize.QueryTypes.SELECT })
            item.id = result[0].id;
            console.log("MAX ID", result[0].id);
            const setting = await Settings.create(item)
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err, "Failed to add setting");
                    // res.status(500).send({ message: err.message || "Failed to add setting" });
                });

        } else {
            Settings.update(item, {
                where: { id: item.id }
            })
                .then(num => {
                    if (num == 1) {
                        console.log("UPDATED");
                        //res.send({ message: "Settings updated successfully" });
                    } else {
                        console.log("FAILED");
                        //res.send({ message: `Setting update with id ${id} FAILED` })
                    }
                })
                .catch(err => {
                    console.log(err, "FAILED ")
                    //res.status(500).send({ message: err.message || `ERROR in settings update with id ${id}` })
                });
        }



        // Settings.findOrCreate({
        //     where: { name: name },
        //     defaults: item,
        // })
        //     .then(([setting, created]) => {
        //         if (created) {

        //         } else {
        //             setting.update(item)
        //                 .then(updatedSetting => {
        //                     console.log(updatedSetting);
        //                 })
        //                 .catch(error => {
        //                     console.log(error, "Failed setting update");
        //                 })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error, "Failed setting find/update");
        //     })
    }
}

module.exports.deleteSetting = () => {




}

