const db = require("../models");
const Events = db.Events;
const DayTimes = db.DayTimes;
const WeatherTypes = db.WeatherTypes;
const Op = db.Sequelize.Op;

module.exports.getEvents = (reg, res) => {
    const criteria = { limit: 10 };
    Events.findAll(
        {
            include: [{
                model: DayTimes,
            }],
            include: [{
                model: WeatherTypes,
            }],
            attributes: {
                include: [
                    [db.Sequelize.literal(`(SELECT "weathertypes"."name" FROM "weathertypes" WHERE "weathertypes"."id"="Events"."wtype_morning")`), "wtypeMorning"],
                    [db.Sequelize.literal(`(SELECT "weathertypes"."name" FROM "weathertypes" WHERE "weathertypes"."id"="Events"."wtype_middle")`), "wtypeMiddle"],
                    [db.Sequelize.literal(`(SELECT "weathertypes"."name" FROM "weathertypes" WHERE "weathertypes"."id"="Events"."wtype_evening")`), "wtypeEvening"],
                ]
            }
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res
                .status(500)
                .send({ message: err.message || "Error when getting weather events." });
        });
};

module.exports.findById = (reg, res) => {
    const id = reg.params.id;

    Events.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res
                    .status(404)
                    .send({ message: `Event not found with ${id}` });
            }

        })
        .catch((err) => {
            res
                .status(404)
                .send({ message: err.message || `Event with ${id} not found.` });
        });

}
