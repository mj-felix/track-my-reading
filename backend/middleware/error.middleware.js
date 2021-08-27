const errors = require('../messages/error.messages.js');

module.exports.notFoundError = (req, res, next) => {
    const err = new Error(`${errors.app.NOT_FOUND}: ${req.originalUrl}`);
    res.status(404);
    next(err);
};

module.exports.authError = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        err.message = errors.auth.INVALID_TOKEN;
        next(err);
    }
};

module.exports.errorHandler = (err, req, res, next) => {
    const statusCode = !res.statusCode ? 500 : res.statusCode;
    res.status(statusCode);
    const json = { message: err.message };
    if (process.env.NODE_ENV !== 'production') {
        json.stack = err.stack;
    }
    res.json(json);
};