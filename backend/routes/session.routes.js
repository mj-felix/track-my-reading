const router = require('express').Router({ mergeParams: true });
const sessionController = require('../controllers/session.controller');
const { jwtCheck, bookBelongsToUser } = require('../middleware/auth.middleware');

router.route('/')
    // @desc    Get all sessions for a given book
    // @route   GET /api/v1/books/:bookId/sessions
    // @access  Private
    .get(sessionController.fetchSessions)
    // @desc    Create session for a given book
    // @route   POST /api/v1/books/:bookId/sessions
    // @access  Private
    .post(sessionController.createSession);

router.route('/:sessionId')
    // @desc    Get session
    // @route   GET /api/v1/books/:bookId/sessions/:sessionId
    // @access  Private
    .get(sessionController.fetchSession)
    // @desc    Delete session
    // @route   DELETE /api/v1/books/:bookId/sessions/:sessionId
    // @access  Private
    .delete(sessionController.deleteSession)
    // @desc    Update session
    // @route   PATCH /api/v1/books/:bookId/sessions/:sessionId
    // @access  Private
    .patch(sessionController.updateSession);

module.exports = router;