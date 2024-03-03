const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class EventsPhotos extends Model { }
    EventsPhotos.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoincrement: true,
                primaryKey: true,
            },
            events_id: {
                type: DataTypes.INTEGER,
                field: "events_id"
            },
            uri: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.INTEGER
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
            tableName: "events_photos",
            modelName: "EventsPhotos",
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    );

    EventsPhotos.belongsTo(sequelize.models.Events, { foreignKey: "id" })
    sequelize.models.Events.hasMany(EventsPhotos, {
        foreignKey: "events_id",
        allowNull: true,
    });

    return EventsPhotos;
}
