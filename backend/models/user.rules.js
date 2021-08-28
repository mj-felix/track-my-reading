const { body } = require('express-validator');

const errors = require('../messages/error.messages');

module.exports = [
    body('email', errors.user.INVALID_EMAIL).isEmail(),
];