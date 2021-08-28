const { body } = require('express-validator');

const errors = require('../messages/error.messages');

module.exports = [
    body('author').trim(),
    body('title', errors.book.TITLE_REQUIRED).trim().notEmpty(),
    body('totalPages', errors.book.TOTAL_PAGES_POSITIVE_INTEGER).isInt({ gt: 0 }),
    body('targetDate', errors.book.TARGET_DATE_INVALID_FORMAT).isDate().optional(),
    body('isAbandoned', errors.book.IS_ABANDONED_INVALID_FORMAT).isBoolean().optional(),
];