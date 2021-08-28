const router = require('express').Router();

const bookController = require('../controllers/book.controller');
const { validateBookId } = require('../middleware/uuid.middleware');
const validate = require('../middleware/validate.middleware');
const bookRules = require('../models/book.rules');

router.route('/')
    // @desc    Get books
    // @route   GET /api/v1/books
    // @access  Private
    .get(bookController.fetchBooks)
    // @desc    Create book
    // @route   POST /api/v1/books
    // @access  Private
    .post(validate(bookRules), bookController.createBook);

router.route('/:bookId')
    // @desc    Get book
    // @route   GET /api/v1/books/:bookId
    // @access  Private
    .get(validateBookId, bookController.fetchBook)
    // @desc    Delete book
    // @route   DELETE /api/v1/books/:bookId
    // @access  Private
    .delete(validateBookId, bookController.deleteBook)
    // @desc    Update book
    // @route   PATCH /api/v1/books/:bookId
    // @access  Private
    .put(validateBookId, validate(bookRules), bookController.updateBook);

module.exports = router;