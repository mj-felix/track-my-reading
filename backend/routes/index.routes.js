const router = require('express').Router();

const { jwtCheck, bookBelongsToUser } = require('../middleware/auth.middleware');

router.use('/api/v1/user', jwtCheck, require('./user.routes'));
router.use('/api/v1/books', jwtCheck, require('./book.routes'));
router.use('/api/v1/books/:bookId/sessions', jwtCheck, bookBelongsToUser, require('./session.routes'));

module.exports = router;