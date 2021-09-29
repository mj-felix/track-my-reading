import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import { NavLink } from 'react-router-dom';

import { fetchBooks } from '../../redux/actions/books.actions';

const BooksFinishedPage = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books);
    const token = useSelector(state => state.auth.token);
    const { booksFinished, loading, error } = books;

    useEffect(() => {
        if (token && booksFinished.length === 0) {
            dispatch(fetchBooks('finished'));
        }
        // eslint-disable-next-line
    }, [token]);

    return (
        <>
            <h1>Books Finished:</h1>
            {loading && 'Loading...'}
            {error && <h2>{error}</h2>}
            {booksFinished &&
                booksFinished.map(book => (
                    <div key={book.id}>
                        <JSONPretty data={book} />
                        <NavLink to={`/books/${book.id}`}>Go to {book.title}</NavLink>
                        <hr />
                    </div>
                ))
            }
        </>
    );
};

export default BooksFinishedPage;