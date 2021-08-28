const router = require('express').Router();

const bookController = require('../controllers/book.controller');
const { validateBookId } = require('../middleware/uuid.middleware');
const validate = require('../middleware/validate.middleware');
const bookRules = require('../models/book.rules');

/**
 * @openapi
 * components:
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
 *         userId: auth0|6128085c21ddbc0068162b73
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
     *     summary: Returns list of all books (for authorised user)
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
     *       404:
     *         description: User not found
     */
    .get(bookController.fetchBooks)

    /**
     * @openapi
     * /api/vi/books:
     *   post:
     *     summary: Creates new book (for authorised user)
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
     *       404:
     *         description: User not found
     *       422:
     *         description: Title must be provided | Total pages must be a positive Integer | Target date must be a valid date in RRRR-MM-DD format
     */
    .post(validate(bookRules), bookController.createBook);

router.route('/:bookId')

    /**
     * @openapi
     * /api/v1/books/{id}:
     *   get:
     *     summary: Returns book by id
     *     tags: [Books]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: The book id
     *     responses:
     *       200:
     *         description: Book with provided id returned
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       404:
     *         description: Book not found | User not found
     */
    .get(validateBookId, bookController.fetchBook)

    /**
     * @openapi
     * /api/v1/books/{id}:
     *   delete:
     *     summary: Removes book by id
     *     tags: [Books]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: Book id
     *     responses:
     *       204:
     *         description: Book deleted
     *       404:
     *         description: Book not found | User not found
     */
    .delete(validateBookId, bookController.deleteBook)

    /**
     * @openapi
     * /api/v1/books/{id}:
     *  put:
     *    summary: Updates book by id (for authorised user)
     *    tags: [Books]
     *    parameters:
     *      - in: path
     *        name: id
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
     *      404:
     *        description: Book not found | User not found
     *      422:
     *        description: Title must be provided | Total pages must be a positive Integer | Target date must be a valid date in RRRR-MM-DD format
     */

    .put(validateBookId, validate(bookRules), bookController.updateBook);

module.exports = router;