const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');
const Session = require('./session.model');

class Book extends Model {
    static async updateStatus(bookId) {
        const sessions = await Session.findAll({
            where: { bookId }
        });
        if (sessions.length === 0) {
            await Book.update({ status: 'added' }, { where: { id: bookId } });
            return true;
        } else {
            const book = await Book.findOne({
                where: { id: bookId }
            });
            const { totalPages, status } = book;
            const pageReached = Math.max(...sessions.map(session => session.page));
            if (pageReached >= totalPages && status !== 'finished') {
                book.status = 'finished';
                await book.save();
                return true;
            }
            if (pageReached < totalPages && status !== 'reading') {
                book.status = 'reading';
                await book.save();
                return true;
            }
            return false;
        }
    }
}

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
    status: {
        type: DataTypes.ENUM('added', 'reading', 'finished'),
        defaultValue: 'added',
        allowNull: false
    },
    isAbandoned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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