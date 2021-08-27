const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');
const Book = require('./book.model');

class Session extends Model { }

Session.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    minutes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    page: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    bookId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Session',
    tableName: 'session',
    underscored: true
});

module.exports = Session;