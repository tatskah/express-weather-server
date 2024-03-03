const db = require("../models");
const Events = db.Events;
const EventsPhotos = db.EventsPhotos;
const DayTimes = db.DayTimes;
const WeatherTypes = db.WeatherTypes;
const Op = db.Sequelize.Op;

const PhotoStatus =
{
    'ADDED': 1,
    'REMOVED': 2,
    'EXISTING': 3
};

module.exports.getEvents = async (req, res) => {
    const criteria = { limit: 10 };
    const weathertypes = await db.sequelize.query('SELECT * FROM weathertypes', { raw: true, type: db.Sequelize.QueryTypes.SELECT });

    Events.findAll(
        {
            criteria,
            include: [{
                model: DayTimes,
            }],
            include: [{
                model: WeatherTypes,
            }],
            include: [{
                association: 'EventsPhotos',
                required: false,
            }],
            attributes: {
                include: [
                    [db.Sequelize.literal(`(SELECT "weathertypes"."name" FROM "weathertypes" WHERE "weathertypes"."id"="Events"."wtype_morning")`), "wtypeMorning"],
                    [db.Sequelize.literal(`(SELECT "weathertypes"."name" FROM "weathertypes" WHERE "weathertypes"."id"="Events"."wtype_middle")`), "wtypeMiddle"],
                    [db.Sequelize.literal(`(SELECT "weathertypes"."name" FROM "weathertypes" WHERE "weathertypes"."id"="Events"."wtype_evening")`), "wtypeEvening"],
                ]
            },
            order: [['add_date', 'DESC']]
        })
        .then(async (data) => {
            const events = data.map(row => {
                const event = row.get();
                event.WeatherTypes = weathertypes;
                return event;
            })
            res.send(events);
        })
        .catch((err) => {
            res
                .status(500)
                .send({ message: err.message || "Error when getting weather events." });
        });
};

module.exports.findById = async (req, res) => {
    const id = req.params.id;

    const weathertypes = await db.sequelize.query('SELECT * FROM weathertypes', { raw: true, type: db.Sequelize.QueryTypes.SELECT });

    Events.findByPk(id, {
        include: [{
            association: 'EventsPhotos',
            required: false,
        }],
    })
        .then((data) => {
            if (data) {
                const event = data.get();
                event.WeatherTypes = weathertypes;
                res.send(event);
            } else {
                res
                    // .status(404)
                    .send([{ WeatherTypes: weathertypes, message: 404, msg: `Event not found with ${id}` }]);
            }
        })
        .catch((err) => {
            res
                .status(404)
                .send({ message: err.message || `Event with ${id} not found.` });
        });
};

module.exports.addEvent = async (req, res) => {
    const data = req.body;
    const event_photos = data.EventsPhotos;

    if (!data.add_date) {
        res
            .status(500)
            .send({ message: "Content can't be empty" });
        return
    }
    try {
        const ret = await db.sequelize.query("SELECT (MAX(id)+1)AS id  FROM events", { raw: true, type: db.Sequelize.QueryTypes.SELECT });
        data.id = ret[0]['id'];

        const savedData = await Events.create(data)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({ message: err || "Weather event create failed" })
            });

        for (photo of event_photos) {
            const ret = await db.sequelize.query("SELECT (MAX(id)+1)AS id  FROM events_photos", { raw: true, type: db.Sequelize.QueryTypes.SELECT });
            let maxId = ret[0]['id'];
            if (maxId === null) maxId = 1;
            photo.id = maxId;
            photo.events_id = data.id;
            const eventsPhoto = new EventsPhotos(photo);
            if (eventsPhoto.status === PhotoStatus.ADDED) {
                eventsPhoto.status = PhotoStatus.EXISTING;
                await eventsPhoto.save();
            }
        }


    } catch (error) {
        res.status(500).send({ message: error | "Weather event create failed" })

    }

};

module.exports.updateEvent = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const event_photos = data.EventsPhotos;

    for (photo of event_photos) {
        const ret = await db.sequelize.query("SELECT (MAX(id)+1)AS id  FROM events_photos", { raw: true, type: db.Sequelize.QueryTypes.SELECT });
        let maxId = ret[0]['id'];
        if (maxId === null) maxId = 1;
        photo.id = maxId;
        photo.events_id = id;
        const eventsPhoto = new EventsPhotos(photo);
        if (eventsPhoto.status === PhotoStatus.ADDED) {
            eventsPhoto.status = PhotoStatus.EXISTING;
            await eventsPhoto.save();
        }
    }

    Events.update(data, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Event was updated successfully"
                });
            } else {
                res.send({
                    message: `Event update with id ${id} FAILED`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `ERROR in event update with id ${id}`
            })
        });
};

module.exports.deleteEvent = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await EventsPhotos.destroy({ where: { events_id: id } })

    Events.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Weather item deleted" });
            } else {
                res.send({ message: `Weather item delete failed. Maybe item with id:${id} NOT exists` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message } || `Failed to delete with id: ${id}`)
        })
};