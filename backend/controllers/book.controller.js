const asyncHandler = require('express-async-handler');

const Book = require('../models/book.model');

module.exports.fetchBooks = asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

module.exports.createBook = asyncHandler(async (req, res) => {
    res.json({ msg: 'createBook' });
});

module.exports.fetchBook = asyncHandler(async (req, res) => {
    res.json({ msg: 'fetchBook' });
});

module.exports.deleteBook = asyncHandler(async (req, res) => {
    res.json({ msg: 'deleteBook' });
});

module.exports.updateBook = asyncHandler(async (req, res) => {
    res.json({ msg: 'updateBook' });
});