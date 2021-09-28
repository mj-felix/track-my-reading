const { query } = require('express-validator');

const errors = require('../messages/error.messages');

module.exports = [
    query('status', errors.book.INVALID_STATUS).isIn(['added', 'reading', 'finished', null]).optional(),
];