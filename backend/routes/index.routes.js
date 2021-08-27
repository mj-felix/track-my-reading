const router = require('express').Router();

const { jwtCheck, bookBelongsToUser } = require('../middleware/auth.middleware');
const { validateBookId } = require('../middleware/uuid.middleware');

router.use('/api/v1/user', jwtCheck, require('./user.routes'));
router.use('/api/v1/books', jwtCheck, require('./book.routes'));
router.use('/api/v1/books/:bookId/sessions', jwtCheck, validateBookId, bookBelongsToUser, require('./session.routes'));

module.exports = router;