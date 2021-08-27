const asyncHandler = require('express-async-handler');

const Book = require('../models/book.model');
const errors = require('../messages/error.messages');

module.exports.fetchBooks = asyncHandler(async (req, res) => {
    const { sub: userId } = req.user;
    const fetchedBooks = await Book.findAll({
        where: { userId }
    });
    res.json(fetchedBooks);
});

module.exports.createBook = asyncHandler(async (req, res) => {
    const { sub: userId } = req.user;
    const { title, author, totalPages, targetDate } = req.body;
    const newBook = await Book.create({
        title,
        author,
        totalPages,
        targetDate,
        userId
    });
    res.json(newBook);
});

module.exports.fetchBook = asyncHandler(async (req, res) => {
    const { sub: userId } = req.user;
    const { bookId: id } = req.params;
    const fetchedBook = await Book.findOne({
        where: { id, userId }
    });
    if (!fetchedBook) {
        res.status(404);
        throw new Error(errors.book.NOT_FOUND);
    }
    res.json(fetchedBook);
});

module.exports.deleteBook = asyncHandler(async (req, res) => {
    const { sub: userId } = req.user;
    const { bookId: id } = req.params;
    const isBookDeleted = await Book.destroy({
        where: { id, userId }
    });
    if (!isBookDeleted) {
        res.status(404);
        throw new Error(errors.book.NOT_FOUND);
    }
    res.status(204).send();
});

module.exports.updateBook = asyncHandler(async (req, res) => {
    const { sub: userId } = req.user;
    const { bookId: id } = req.params;
    const { title, author, totalPages, targetDate } = req.body;
    const updatedBook = await Book.update({
        title,
        author,
        totalPages,
        targetDate
    }, {
        where: { id, userId },
        returning: true
    });
    if (updatedBook[0] === 0) {
        res.status(404);
        throw new Error(errors.book.NOT_FOUND);
    }
    res.json(updatedBook[1][0]);
});