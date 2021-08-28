const router = require('express').Router();

const userController = require('../controllers/user.controller');
const validate = require('../middleware/validate.middleware');
const userRules = require('../models/user.rules');

router.route('/')
    // @desc    Get user using provided token
    // @route   GET /api/v1/user
    // @access  Private
    .get(userController.fetchUser)
    // @desc    Create user using provided token
    // @route   POST /api/v1/user
    // @access  Private
    .post(validate(userRules), userController.createUser);

module.exports = router;