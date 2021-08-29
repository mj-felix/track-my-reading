const router = require('express').Router({ mergeParams: true });

const sessionController = require('../controllers/session.controller');
const { validateSessionId } = require('../middleware/uuid.middleware');
const validate = require('../middleware/validate.middleware');
const sessionRules = require('../models/session.rules');

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
 *     Session:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated id of the session
 *         minutes:
 *           type: integer
 *           minimum: 1
 *           description: Minutes spent reading in the session
 *         page:
 *           type: integer
 *           minimum: 1
 *           maximum: Book.totalPages
 *           description: Page reached in the session
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date the session happened
 *         bookId:
 *           type: string
 *           format: uuid
 *           description: Id of the book read
 *         updatedAt:
 *           type: string
 *           fortmat: date-time
 *           description: Date session last updated
 *         createdAt:
 *           type: string
 *           fortmat: date-time
 *           description: Date session created
 *       example:
 *         id: bc010eee-d584-4feb-b08b-77d5acf2c54a
 *         minutes: 10
 *         page: 32
 *         bookId: 40695796-2c1e-485d-a3af-23049d70139a
 *         date: 2021-08-28T06:25:55.251Z
 *         updatedAt: 2021-08-28T06:25:55.251Z
 *         createdAt: 2021-08-28T06:25:55.251Z
 *
 *   requestBodies:
 *     SessionBody:
 *       type: object
 *       required:
 *         - minutes
 *         - page
 *         - date
 *       properties:
 *         minutes:
 *           type: integer
 *           minimum: 1
 *           description: Minutes spent reading in the session
 *         page:
 *           type: integer
 *           minimum: 1
 *           maximum: Book.totalPages
 *           description: Page reached in the session
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date the session happened
 *       example:
 *         minutes: 10
 *         page: 32
 *         date: 2021-08-28
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
 *   name: Sessions
 *   description: API for managing reading sessions
 */

router.route('/')

    /**
     * @openapi
     * /api/v1/books/{bookId}/sessions:
     *   get:
     *     summary: Returns list of sessions for the book with bookId
     *     security:
     *      - bearerAuth: []
     *     tags: [Sessions]
     *     parameters:
     *       - in: path
     *         name: bookId
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: Book id
     *     responses:
     *       200:
     *         description: Sessions list returned
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Session'
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     *       404:
     *         description: User not found | Book not found
     *         content:
     *           application/json:
     *             example:
     *                  message: Book not found
     */
    .get(sessionController.fetchSessions)

    /**
     * @openapi
     * /api/v1/books/{bookId}/sessions:
     *   post:
     *     summary: Creates new session for the book with bookId
     *     security:
     *      - bearerAuth: []
     *     tags: [Sessions]
     *     parameters:
     *       - in: path
     *         name: bookId
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: Book id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *             schema:
     *               $ref: '#/components/requestBodies/SessionBody'
     *     responses:
     *       201:
     *         description: Session created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Session'
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     *       404:
     *         description: User not found | Book not found
     *         content:
     *           application/json:
     *             example:
     *                  message: Book not found
     *       422:
     *         description: Validation error
     *         content:
     *           application/json:
     *             example:
     *                  errors:
     *                      - minutes: Minutes must be a positive Integer
     *                      - date: Date must be a valid date in RRRR-MM-DD format
     *                      - page: Page must be a positive Integer
     */
    .post(validate(sessionRules), sessionController.createSession);

router.route('/:sessionId')

    /**
     * @openapi
     * /api/v1/books/{bookId}/sessions/{sessionId}:
     *   get:
     *     summary: Returns session by id
     *     security:
     *      - bearerAuth: []
     *     tags: [Sessions]
     *     parameters:
     *       - in: path
     *         name: bookId
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: Book id
     *       - in: path
     *         name: sessionId
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: Session id
     *     responses:
     *       200:
     *         description: Session with provided id returned
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Session'
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     *       404:
     *         description: Session not found | Book not found | User not found
     *         content:
     *           application/json:
     *             example:
     *                  message: Session not found
     */
    .get(validateSessionId, sessionController.fetchSession)

    /**
     * @openapi
     * /api/v1/books/{bookId}/sessions/{sessionId}:
     *   delete:
     *     summary: Removes session by id
     *     security:
     *      - bearerAuth: []
     *     tags: [Sessions]
     *     parameters:
     *       - in: path
     *         name: bookId
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: Book id
     *       - in: path
     *         name: sessionId
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: Session id
     *     responses:
     *       204:
     *         description: Session  deleted
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     *       404:
     *         description: Session not found | Book not found | User not found
     *         content:
     *           application/json:
     *             example:
     *                  message: Session not found
     */
    .delete(validateSessionId, sessionController.deleteSession)

    /**
     * @openapi
     * /api/v1/books/{bookId}/sessions/{sessionId}:
     *   patch:
     *     summary: Updates session by id
     *     security:
     *      - bearerAuth: []
     *     tags: [Sessions]
     *     parameters:
     *       - in: path
     *         name: bookId
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: Book id
     *       - in: path
     *         name: sessionId
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: Session id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *             schema:
     *               $ref: '#/components/requestBodies/SessionBody'
     *     responses:
     *       200:
     *         description: Session updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Session'
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     *       404:
     *         description: Session not found | Book not found | User not found
     *         content:
     *           application/json:
     *             example:
     *                  message: Session not found
     *       422:
     *         description: Validation error
     *         content:
     *           application/json:
     *             example:
     *                  errors:
     *                      - minutes: Minutes must be a positive Integer
     *                      - date: Date must be a valid date in RRRR-MM-DD format
     *                      - page: Page must be a positive Integer
     */
    .patch(validateSessionId, validate(sessionRules), sessionController.updateSession);

module.exports = router;