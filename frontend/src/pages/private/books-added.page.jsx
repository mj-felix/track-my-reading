import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import { NavLink } from 'react-router-dom';

import { fetchBooks } from '../../redux/actions/books.actions';

const BooksAddedPage = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books);
    const token = useSelector(state => state.auth.token);
    const { booksAdded, loading, error } = books;

    useEffect(() => {
        if (token && !booksAdded) {
            dispatch(fetchBooks('added'));
        }
        // eslint-disable-next-line
    }, [token]);

    return (
        <>
            <h1>Books Not Started:</h1>
            {loading && 'Loading...'}
            {error && <h2>{error}</h2>}
            {booksAdded &&
                (booksAdded.length
                    ? booksAdded.map(book => (
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

export default BooksAddedPage;