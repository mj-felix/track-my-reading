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
    },
    isbn: {
        type: DataTypes.STRING
    },
    note: {
        type: DataTypes.STRING(600)
    },
    totalPages: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    targetDate: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'Book'
});

module.exports = Book;