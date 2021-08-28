const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

module.exports = (schemas) => {
    return asyncHandler(async (req, res, next) => {
        await Promise.all(schemas.map((schema) => schema.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

        return res.status(422).json({
            errors: extractedErrors,
        });
    });
};