const asyncHandler = require('express-async-handler');

const User = require('../models/user.model');
const errors = require('../messages/error.messages');

module.exports.fetchUser = asyncHandler(async (req, res) => {
    const { sub: id } = req.user;
    const fetchedUser = await User.findOne({
        where: { id }
    });
    if (!fetchedUser) {
        res.status(404);
        throw new Error(errors.user.NOT_FOUND);
    }
    res.json(fetchedUser);
});

module.exports.createUser = asyncHandler(async (req, res) => {
    const { sub: id } = req.user;
    const user = await User.findOrCreate({
        where: { id }
    });
    res.status(201).json(user[0]);
});

