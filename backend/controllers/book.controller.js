const asyncHandler = require('express-async-handler');

const Book = require('../models/book.model');

module.exports.getBooks = asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

