const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/')
    // @desc    Get user using provided token
    // @route   GET /api/v1/user
    // @access  Private
    .get(userController.fetchUser)
    // @desc    Create user using provided token
    // @route   POST /api/v1/user
    // @access  Private
    .post(userController.createUser);

module.exports = router;