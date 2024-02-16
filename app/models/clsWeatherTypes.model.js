const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class WeatherTypes extends Model { }
    WeatherTypes.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            },
        },
        {
            sequelize,
            timestamps: false,
            tableName: "weathertypes",
            modelName: "WeatherTypes"
        }
    );

    sequelize.models.Events.belongsTo(WeatherTypes, { foreignKey: "weathertype_id" })
    WeatherTypes.hasMany(sequelize.models.Events, {
        foreignKey: "id",
        allowNull: true,
    });

    return WeatherTypes
}
