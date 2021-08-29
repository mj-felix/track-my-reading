const { DataTypes, Model } = require('sequelize');

const sequelize = require('../database/connection');
const { updateUserStats } = require('../utils/user.utils');

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
    underscored: true,
    hooks: {
        afterCreate: async (session, { userId }) => {
            await updateUserStats(userId);
        },
        afterUpdate: async (session, { userId }) => {
            await updateUserStats(userId);
        },
        afterDestroy: async (session, { userId }) => {
            await updateUserStats(userId);
        },
    }
});

// Session.afterCreate(function (session, options) {
//     console.log(options);
// });

// Session.afterDestroy(function (session, options) {
//     console.log(options);
// });

// Session.afterUpdate(function (session, options) {
//     console.log(options);
// });

module.exports = Session;