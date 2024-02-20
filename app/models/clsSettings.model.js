const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Settings extends Model { }
    Settings.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoincrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            value: {
                type: DataTypes.STRING,
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
            tableName: "settings",
            modelName: "Settings",
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );
    return Settings;
}
