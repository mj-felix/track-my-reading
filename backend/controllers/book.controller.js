const asyncHandler = require('express-async-handler');

const Book = require('../models/book.model');
const Session = require('../models/session.model');

module.exports.getBooks = asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    const sessions = await Session.findAll();
    res.json({
        books,
        sessions
    });
});

