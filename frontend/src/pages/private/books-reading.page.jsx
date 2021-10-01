import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import { NavLink } from 'react-router-dom';

import { fetchBooks } from '../../redux/actions/books.actions';

const BooksReadingPage = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books);
    const token = useSelector(state => state.auth.token);
    const { booksReading, loading, error } = books;

    useEffect(() => {
        if (token && !booksReading) {
            dispatch(fetchBooks('reading'));
        }
        // eslint-disable-next-line
    }, [token]);

    return (
        <>
            <h1>Books Reading:</h1>
            {loading && 'Loading...'}
            {error && <h2>{error}</h2>}
            {booksReading &&
                (booksReading.length
                    ? booksReading.map(book => (
                        <div key={book.id}>
                            <JSONPretty data={book} />
                            <NavLink to={`/books/${book.id}`}>Go to {book.title}</NavLink>
                            <hr />
                        </div>
                    ))
                    : 'No books'
                )
            }
        </>
    );
};

export default BooksReadingPage;