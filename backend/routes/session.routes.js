const router = require('express').Router({ mergeParams: true });

const sessionController = require('../controllers/session.controller');
const { validateSessionId } = require('../middleware/uuid.middleware');
const validate = require('../middleware/validate.middleware');
const sessionRules = require('../models/session.rules');

router.route('/')
    // @desc    Get all sessions for a given book
    // @route   GET /api/v1/books/:bookId/sessions
    // @access  Private
    .get(sessionController.fetchSessions)
    // @desc    Create session for a given book
    // @route   POST /api/v1/books/:bookId/sessions
    // @access  Private
    .post(validate(sessionRules), sessionController.createSession);

router.route('/:sessionId')
    // @desc    Get session
    // @route   GET /api/v1/books/:bookId/sessions/:sessionId
    // @access  Private
    .get(validateSessionId, sessionController.fetchSession)
    // @desc    Delete session
    // @route   DELETE /api/v1/books/:bookId/sessions/:sessionId
    // @access  Private
    .delete(validateSessionId, sessionController.deleteSession)
    // @desc    Update session
    // @route   PATCH /api/v1/books/:bookId/sessions/:sessionId
    // @access  Private
    .patch(validateSessionId, validate(sessionRules), sessionController.updateSession);

module.exports = router;