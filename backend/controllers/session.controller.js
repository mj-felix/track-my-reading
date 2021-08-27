const asyncHandler = require('express-async-handler');

const Session = require('../models/session.model');

module.exports.fetchSessions = asyncHandler(async (req, res) => {
    const sessions = await Session.findAll();
    res.json(sessions);
});

module.exports.createSession = asyncHandler(async (req, res) => {
    res.json({ msg: 'createSession' });
});

module.exports.fetchSession = asyncHandler(async (req, res) => {
    res.json({ msg: 'fetchSession' });
});

module.exports.deleteSession = asyncHandler(async (req, res) => {
    res.json({ msg: 'deleteSession' });
});

module.exports.updateSession = asyncHandler(async (req, res) => {
    res.json({ msg: 'updateSession' });
});