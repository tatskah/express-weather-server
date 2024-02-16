const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class DayTimes extends Model { }
    DayTimes.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoincrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            timestamps: false,
            tableName: "daytimes",
            modelName: "DayTimes"
        }
    );

    sequelize.models.Events.belongsTo(DayTimes, { foreignKey: "daytime_id" })
    DayTimes.hasMany(sequelize.models.Events, {
        foreignKey: "id",
        allowNull: true,
    });

    return DayTimes;
}
