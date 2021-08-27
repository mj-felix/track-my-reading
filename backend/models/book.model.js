const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');
const Session = require('./session.model');

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
    totalPages: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    targetDate: {
        type: DataTypes.DATE
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Book',
    tableName: 'book',
    underscored: true
});

Book.hasMany(Session, {
    onDelete: 'CASCADE',
    foreignKey: 'bookId'
});
Session.belongsTo(Book, {
    foreignKey: {
        name: 'bookId',
    }
});

module.exports = Book;