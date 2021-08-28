const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const asyncHandler = require('express-async-handler');

const Book = require('../models/book.model');
const User = require('../models/user.model');
const errors = require('../messages/error.messages');

module.exports.jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

module.exports.bookBelongsToUser = asyncHandler(async (req, res, next) => {
    const { sub: userId } = req.user;
    const { bookId: id } = req.params;
    const book = await Book.findOne({
        where: { id, userId }
    });
    if (book) {
        next();
    } else {
        res.status(404);
        throw new Error(errors.book.NOT_FOUND);
    }
});

module.exports.userExists = asyncHandler(async (req, res, next) => {
    const { sub: id } = req.user;
    const user = await User.findOne({
        where: { id }
    });
    if (user) {
        next();
    } else {
        res.status(404);
        throw new Error(errors.user.NOT_FOUND);
    }
});

