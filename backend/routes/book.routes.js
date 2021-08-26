const express = require('express');
const bookController = require('../controllers/book.controller');

const router = express.Router();

router.route('/')
    // @desc    Get books for logged in user
    // @route   GET /api/v1/books
    // @access  Private
    .get(bookController.getBooks);

module.exports = router;