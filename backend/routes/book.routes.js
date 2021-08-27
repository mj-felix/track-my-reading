const express = require('express');
const bookController = require('../controllers/book.controller');
const { jwtCheck } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/')
    // @desc    Get books
    // @route   GET /api/v1/books
    // @access  Private
    .get(jwtCheck, bookController.fetchBooks)
    // @desc    Create book
    // @route   POST /api/v1/books
    // @access  Private
    .post(jwtCheck, bookController.createBook);

router.route('/:bookId')
    // @desc    Get book
    // @route   GET /api/v1/books/:bookId
    // @access  Private
    .get(jwtCheck, bookController.fetchBook)
    // @desc    Delete book
    // @route   DELETE /api/v1/books/:bookId
    // @access  Private
    .delete(jwtCheck, bookController.deleteBook)
    // @desc    Update book
    // @route   PATCH /api/v1/books/:bookId
    // @access  Private
    .patch(jwtCheck, bookController.updateBook);

module.exports = router;