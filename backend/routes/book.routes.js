const express = require('express');
const {
    getBooks
} = require('../controllers/book.controller');

const router = express.Router();

router.route('/')
    // @desc    Get books for logged in user
    // @route   GET /api/v1/books
    // @access  Private
    .get(getBooks);

module.exports = router;