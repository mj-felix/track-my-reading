const asyncHandler = require('express-async-handler');

const User = require('../models/user.model');

module.exports.fetchUser = asyncHandler(async (req, res) => {
    const user = await User.findAll();
    res.json(user);
});

module.exports.createUser = asyncHandler(async (req, res) => {
    res.json({ msg: 'createUser' });
});

