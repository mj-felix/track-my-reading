const validate = require('uuid-validate');

const errors = require('../messages/error.messages');

module.exports.validateBookId = (req, res, next) => {
    const { bookId } = req.params;
    if (validate(bookId, 4)) {
        next();
    } else {
        res.status(404);
        throw new Error(errors.book.NOT_FOUND);
    }
};

module.exports.validateSessionId = (req, res, next) => {
    const { sessionId } = req.params;
    if (validate(sessionId, 4)) {
        next();
    } else {
        res.status(404);
        throw new Error(errors.session.NOT_FOUND);
    }
};