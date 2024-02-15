const db = require("../models");
const Events = db.Events;
const Op = db.Sequelize.Op;

module.exports.getEvents = (reg, res) => {
  //   const info = reg.params.info;

  Events.findAll().then((data) => {
    res.send(data);
  });
};
