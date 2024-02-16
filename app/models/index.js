const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: dbConfig.operatorAliases,
    logging: console.log,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Events = require("./clsEvents.model")(sequelize);
db.DayTimes = require("./clsDayTimes.model")(sequelize);
db.WeatherTypes = require("./clsWeatherTypes.model")(sequelize);

// db.Events.hasMany(db.DayTimes, { foreignKey: "id" });
// db.DayTimes.belongsTo(db.Events, { foreignKey: "id" });
module.exports = db;
