const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

class Book extends Model { }

Book.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Book'
});

module.exports = Book;