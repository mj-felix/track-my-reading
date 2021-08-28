const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");

const { jwtCheck, bookBelongsToUser } = require('../middleware/auth.middleware');
const { validateBookId } = require('../middleware/uuid.middleware');

// API routes
router.use('/api/v1/user', jwtCheck, require('./user.routes'));
router.use('/api/v1/books', jwtCheck, require('./book.routes'));
router.use('/api/v1/books/:bookId/sessions', jwtCheck, validateBookId, bookBelongsToUser, require('./session.routes'));

// Swagger API documentation
const swaggerDocument = swaggerJsDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Track My Reading API",
            version: "1.0.0",
            description: "Track My Reading by MJ Felix is an app to record reading and see stats.",
        },
        // servers: [
        //     {
        //         url: "http://localhost:5000",
        //     },
        // ],
    },
    apis: ['./backend/routes/*.js'],
});
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;