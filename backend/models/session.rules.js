const { body } = require('express-validator');

const Book = require('./book.model');
const errors = require('../messages/error.messages');

module.exports = [
    body('minutes', errors.session.MINUTES_POSITIVE_INTEGER).isInt({ gt: 0 }),
    body('page')
        .isInt({ gt: 0 })
        .withMessage(errors.session.PAGE_POSITIVE_INTEGER)
        .custom(async (value, { req }) => {
            const { bookId: id } = req.params;
            const book = await Book.findOne({
                where: { id }
            });
            if (book.totalPages < value) {
                return Promise.reject(errors.session.PAGE_MORE_THAN_TOTAL_PAGES);
            }
            return true;
        }),
    body('date', errors.session.DATE_INVALID_FORMAT).isDate(),
];