const router = require('express').Router();

const bookController = require('../controllers/book.controller');
const { validateBookId } = require('../middleware/uuid.middleware');
const validate = require('../middleware/validate.middleware');
const bookRules = require('../models/book.rules');

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
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated id of the book 
 *         status:
 *           type: string
 *           enum: [added, reading, finished]
 *           description: Book status
 *         isAbandoned:
 *           type: boolean
 *           description: Describes if book has been abandoned
 *         title:
 *           type: string
 *           description: Title
 *         author:
 *           type: string
 *           nullable: true
 *           description: Author
 *         totalPages:
 *           type: integer
 *           minimum: 1
 *           description: Number of pages
 *         targetDate:
 *           type: string
 *           nullable: true
 *           fortmat: date-time
 *           description: Target date to finish reading
 *         userId:
 *           type: string
 *           description: Id of the user
 *         updatedAt:
 *           type: string
 *           fortmat: date-time
 *           description: Date book last updated
 *         createdAt:
 *           type: string
 *           fortmat: date-time
 *           description: Date book created
 *       example:
 *         id: bc010eee-d584-4feb-b08b-77d5acf2c54a
 *         status: reading
 *         isAbandoned: false
 *         title: Caliban's War
 *         author: James S. A. Corey
 *         totalPages: 577
 *         targetDate: 2021-12-31T00:00:00.000Z
 *         userId: auth0|6169085c21ddbc0068162b69
 *         updatedAt: 2021-08-28T06:25:55.251Z
 *         createdAt: 2021-08-28T06:25:55.251Z
 *
 *   requestBodies:
 *     BookBody:
 *       type: object
 *       required:
 *         - title
 *         - totalPages
 *       properties:
 *         title:
 *           type: string
 *           description: Title
 *         author:
 *           type: string
 *           description: Author (will be blanked if not provided)
 *         totalPages:
 *           type: integer
 *           minimum: 1
 *           description: Number of pages
 *         targetDate:
 *           type: string
 *           fortmat: date-time
 *           description: Target date to finish reading (will be nullified if not provided)
 *         isAbandoned:
 *           type: boolean
 *           description: Describes if book has been abandoned (will be set to false if not provided)
 *       example:
 *         title: Caliban's War
 *         author: James S. A. Corey
 *         totalPages: 577
 *         targetDate: 2021-12-31
 *         isAbandoned: false
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
 *   name: Books
 *   description: API for managing books
 */

router.route('/')

    /**
     * @openapi
     * /api/v1/books:
     *   get:
     *     summary: Returns list of books (for authorised user)
     *     security:
     *      - bearerAuth: []
     *     tags: [Books]
     *     responses:
     *       200:
     *         description: Books list returned
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Book'
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     *       404:
     *         description: User not found
     *         content:
     *           application/json:
     *             example:
     *                  message: User not found
     */
    .get(bookController.fetchBooks)

    /**
     * @openapi
     * /api/v1/books:
     *   post:
     *     summary: Creates new book (for authorised user)
     *     security:
     *      - bearerAuth: []
     *     tags: [Books]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *             schema:
     *               $ref: '#/components/requestBodies/BookBody'
     *     responses:
     *       201:
     *         description: Book created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     *       404:
     *         description: User not found
     *         content:
     *           application/json:
     *             example:
     *                  message: User not found
     *       422:
     *         description: Validation error
     *         content:
     *           application/json:
     *             example:
     *                  errors:
     *                      - title: Title must be provided
     *                      - totalPages: Total pages must be a positive Integer
     *                      - targetDate: Target date, if provided, must be a valid date in RRRR-MM-DD format           
     */
    .post(validate(bookRules), bookController.createBook);

router.route('/:bookId')

    /**
     * @openapi
     * /api/v1/books/{bookId}:
     *   get:
     *     summary: Returns book by id (for authorised user)
     *     security:
     *      - bearerAuth: []
     *     tags: [Books]
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
     *         description: Book with provided id returned
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     *       404:
     *         description: Book not found | User not found
     *         content:
     *           application/json:
     *             example:
     *                  message: Book not found
     */
    .get(validateBookId, bookController.fetchBook)

    /**
     * @openapi
     * /api/v1/books/{bookId}:
     *   delete:
     *     summary: Removes book by id (for authorised user)
     *     security:
     *      - bearerAuth: []
     *     tags: [Books]
     *     parameters:
     *       - in: path
     *         name: bookId
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: Book id
     *     responses:
     *       204:
     *         description: Book deleted
     *       401:
     *         $ref: '#/components/responses/Unauthorized'
     *       404:
     *         description: Book not found | User not found
     *         content:
     *           application/json:
     *             example:
     *                  message: Book not found
     */
    .delete(validateBookId, bookController.deleteBook)

    /**
     * @openapi
     * /api/v1/books/{bookId}:
     *  put:
     *    summary: Updates book by id (for authorised user)
     *    security:
     *      - bearerAuth: []
     *    tags: [Books]
     *    parameters:
     *      - in: path
     *        name: bookId
     *        schema:
     *          type: string
     *          format: uuid
     *        required: true
     *        description: Book id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/requestBodies/BookBody'
     *    responses:
     *      200:
     *        description: Book updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Book'
     *      401:
     *         $ref: '#/components/responses/Unauthorized'
     *      404:
     *        description: Book not found | User not found
     *        content:
     *           application/json:
     *             example:
     *                  message: Book not found
     *      422:
     *        description: Validation error
     *        content:
     *           application/json:
     *             example:
     *                  errors:
     *                      - title: Title must be provided
     *                      - totalPages: Total pages must be a positive Integer
     *                      - targetDate: Target date, if provided, must be a valid date in RRRR-MM-DD format
     */

    .put(validateBookId, validate(bookRules), bookController.updateBook);

module.exports = router;