const express = require('express');
const sessionController = require('../controllers/session.controller');
const { jwtCheck, bookBelongsToUser } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/:bookId/sessions')
    // @desc    Get all sessions for a given book
    // @route   GET /api/v1/books/:bookId/sessions
    // @access  Private
    .get(jwtCheck, bookBelongsToUser, sessionController.fetchSessions)
    // @desc    Create session for a given book
    // @route   POST /api/v1/books/:bookId/sessions
    // @access  Private
    .post(jwtCheck, bookBelongsToUser, sessionController.createSession);

router.route('/:bookId/sessions/:sessionId')
    // @desc    Get session
    // @route   GET /api/v1/books/:bookId/sessions/:sessionId
    // @access  Private
    .get(jwtCheck, bookBelongsToUser, sessionController.fetchSession)
    // @desc    Delete session
    // @route   DELETE /api/v1/books/:bookId/sessions/:sessionId
    // @access  Private
    .delete(jwtCheck, bookBelongsToUser, sessionController.deleteSession)
    // @desc    Update session
    // @route   PATCH /api/v1/books/:bookId/sessions/:sessionId
    // @access  Private
    .patch(jwtCheck, bookBelongsToUser, sessionController.updateSession);

module.exports = router;