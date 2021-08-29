const asyncHandler = require('express-async-handler');

const Session = require('../models/session.model');
const Book = require('../models/book.model');
const errors = require('../messages/error.messages');

module.exports.fetchSessions = asyncHandler(async (req, res) => {
    const { bookId } = req.params;
    const fetchedSessions = await Session.findAll({
        where: { bookId }
    });
    res.json(fetchedSessions);
});

module.exports.createSession = asyncHandler(async (req, res) => {
    const { bookId } = req.params;
    const { minutes, page, date } = req.body;
    const newSession = await Session.create({
        minutes,
        page,
        date,
        bookId
    }, { userId: req.user.sub });
    await Book.updateStatus(bookId);
    res.status(201).json(newSession);
});

module.exports.fetchSession = asyncHandler(async (req, res) => {
    const { bookId, sessionId: id } = req.params;
    const fetchedSession = await Session.findOne({
        where: { id, bookId }
    });
    if (!fetchedSession) {
        res.status(404);
        throw new Error(errors.session.NOT_FOUND);
    }
    res.json(fetchedSession);
});

module.exports.deleteSession = asyncHandler(async (req, res) => {
    const { bookId, sessionId: id } = req.params;
    const isSessionDeleted = await Session.destroy({
        where: { id, bookId },
        individualHooks: true,
        userId: req.user.sub
    });
    if (!isSessionDeleted) {
        res.status(404);
        throw new Error(errors.session.NOT_FOUND);
    }
    await Book.updateStatus(bookId);
    res.status(204).send();
});

module.exports.updateSession = asyncHandler(async (req, res) => {
    const { bookId, sessionId: id } = req.params;
    const { minutes, page, date } = req.body;
    const updatedSession = await Session.update({
        minutes,
        page,
        date
    }, {
        where: { id, bookId },
        returning: true,
        individualHooks: true,
        userId: req.user.sub
    });
    if (updatedSession[0] === 0) {
        res.status(404);
        throw new Error(errors.session.NOT_FOUND);
    }
    await Book.updateStatus(bookId);
    res.json(updatedSession[1][0]);
});