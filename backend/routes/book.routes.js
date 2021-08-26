const express = require('express');
const bookController = require('../controllers/book.controller');
const { jwtCheck } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/')
    // @desc    Get books for logged in user
    // @route   GET /api/v1/books
    // @access  Private
    .get(jwtCheck, bookController.getBooks);

module.exports = router;