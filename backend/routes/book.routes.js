const router = require('express').Router();
const bookController = require('../controllers/book.controller');

router.route('/')
    // @desc    Get books
    // @route   GET /api/v1/books
    // @access  Private
    .get(bookController.fetchBooks)
    // @desc    Create book
    // @route   POST /api/v1/books
    // @access  Private
    .post(bookController.createBook);

router.route('/:bookId')
    // @desc    Get book
    // @route   GET /api/v1/books/:bookId
    // @access  Private
    .get(bookController.fetchBook)
    // @desc    Delete book
    // @route   DELETE /api/v1/books/:bookId
    // @access  Private
    .delete(bookController.deleteBook)
    // @desc    Update book
    // @route   PATCH /api/v1/books/:bookId
    // @access  Private
    .patch(bookController.updateBook);

module.exports = router;