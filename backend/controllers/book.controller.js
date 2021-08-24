import asyncHandler from 'express-async-handler';

export const getBooks = asyncHandler(async (req, res) => {

    // dummy books
    const books = [
        {
            title: 'Title 1',
            author: 'Author 1'
        }, {
            title: 'Title 2',
            author: 'Author 2'
        },

    ];
    res.json(books);
});