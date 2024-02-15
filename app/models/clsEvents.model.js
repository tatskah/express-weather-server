const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Events extends Model {}

  // temp_evening integer,
  // temp_middle integer,
  // temp_morning integer,
  // wtype_evening integer,
  // wtype_middle integer,
  // wtype_morning integer,
  // daytime_id bigint,
  // weathertype_id bigint,
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
        onDelete: "CASCADE",
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
