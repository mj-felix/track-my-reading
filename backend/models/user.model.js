const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');
const Book = require('./book.model');

class User extends Model { }

User.init({
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    minutesSpent: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    readingsCompleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    pagesRead: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    underscored: true
});

User.hasMany(Book, {
    onDelete: 'CASCADE',
    foreignKey: 'userId'
});
Book.belongsTo(User, {
    foreignKey: {
        name: 'userId',
    }
});

module.exports = User;