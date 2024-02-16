const fetch = require("node-fetch");
const config = require("../utils/config");
const logger = require("../utils/logger");

module.exports.getWeatherData = async (reg, res) => {
    const url = reg.query.url;
    logger.info("-----------");
    logger.info(reg.query.url);

    let data = "";
    const response = await fetch(url);
    data = await response.json();

    res.send(data)

};
