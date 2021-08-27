const express = require('express');
const userController = require('../controllers/user.controller');
const { jwtCheck } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/')
    // @desc    Get user using provided token
    // @route   GET /api/v1/user
    // @access  Private
    .get(jwtCheck, userController.fetchUser)
    // @desc    Create user using provided token
    // @route   POST /api/v1/user
    // @access  Private
    .post(jwtCheck, userController.createUser);

module.exports = router;