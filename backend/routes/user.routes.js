const router = require('express').Router();

const userController = require('../controllers/user.controller');
const validate = require('../middleware/validate.middleware');
const userRules = require('../models/user.rules');

/**
 * @openapi
 * components:
 *
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User id provided by Auth0
 *         email:
 *           type: string
 *           format: email
 *           description: User's email
 *         minutesSpent:
 *           type: integer
 *           minimum: 0
 *           description: Number of minutes the user spent reading books
 *         readingsCompleted:
 *           type: integer
 *           minimum: 0
 *           description: Number of reading sessions completed by the user across all the books
 *         pagesRead:
 *           type: integer
 *           minimum: 0
 *           description: Number of pages the user read across all the books
 *         updatedAt:
 *           type: string
 *           fortmat: date-time
 *           description: Date user last updated
 *         createdAt:
 *           type: string
 *           fortmat: date-time
 *           description: Date user created
 *       example:
 *         id: google-oauth2|106902858375714556969
 *         email: mjfelixdev@gmail.com
 *         minutesSpent: 30
 *         readingsCompleted: 2
 *         pagesRead: 50
 *         updatedAt: 2021-08-28T06:25:55.251Z
 *         createdAt: 2021-08-28T06:25:55.251Z
 *
 *   requestBodies:
 *     UserBody:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email
 *       example:
 *         email: mjfelixdev@gmail.com
 *
 *   responses:
 *      Unauthorized:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *                  message: Authorization token invalid
 */

/**
 * @openapi
 * tags:
 *   name: User
 *   description: API for managing the user
 */

router.route('/')

    /**
     * @openapi
     * /api/v1/users:
     *   post:
     *     summary: Cretaes or updates the user
     *     security:
     *      - bearerAuth: []
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *             schema:
     *               $ref: '#/components/requestBodies/UserBody'
     *     responses:
     *       201:
     *         description: User upserted
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     *       422:
     *         description: Validation error
     *         content:
     *           application/json:
     *             example:
     *                  errors:
     *                      - email: Email invalid
     */
    .get(userController.fetchUser)

    /**
     * @openapi
     * /api/v1/users:
     *   get:
     *     summary: Returns the authorised user
     *     security:
     *      - bearerAuth: []
     *     tags: [User]
     *     responses:
     *       200:
     *         description: Authorised user
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     */
    .post(validate(userRules), userController.createUser);

module.exports = router;