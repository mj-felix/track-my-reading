import express from 'express';
const router = express.Router();
import {
    getBooks
} from '../controllers/book.controller.js';


router.route('/')
    // @desc    Get books for logged in user
    // @route   GET /api/v1/books
    // @access  Private
    .get(getBooks);

export default router;