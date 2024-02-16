const { DataTypes, Model } = require("sequelize");
const { DayTimes } = require("./clsDayTimes.model");

module.exports = (sequelize) => {
  class Events extends Model { }
  Events.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        primaryKey: true,
      },
      add_date: {
        type: DataTypes.DATE,
      },
      info: {
        type: DataTypes.STRING,
      },
      temp_morning: {
        type: DataTypes.INTEGER,
      },
      temp_middle: {
        type: DataTypes.INTEGER,
      },
      temp_evening: {
        type: DataTypes.INTEGER,
      },

      wtype_morning: {
        type: DataTypes.INTEGER,
      },
      wtype_middle: {
        type: DataTypes.INTEGER,
      },
      wtype_evening: {
        type: DataTypes.INTEGER,
      },
      daytime_id: {
        type: DataTypes.INTEGER,
        field: "daytime_id",
      },
      weathertype_id: {
        type: DataTypes.INTEGER,
        field: "weathertype_id",
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Date.NOW,
        allowNull: false,
      },
      updated_at: {
        type: "TIMESTAMP",
        defaultValue: Date.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Events",
      tableName: "events",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Events;
};
