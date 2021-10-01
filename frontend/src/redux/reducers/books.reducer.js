import BooksActionTypes from '../types/books.types';

const initialState = {
    loading: false,
    booksReading: null,
    booksAdded: null,
    booksFinished: null,
    error: ''
};

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case BooksActionTypes.BOOKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case BooksActionTypes.BOOKS_READING_SUCCESS:
            return {
                ...state,
                loading: false,
                booksReading: action.payload
            };
        case BooksActionTypes.BOOKS_READING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                booksReading: []
            };
        case BooksActionTypes.BOOKS_ADDED_SUCCESS:
            return {
                ...state,
                loading: false,
                booksAdded: action.payload
            };
        case BooksActionTypes.BOOKS_ADDED_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                booksAdded: []
            };
        case BooksActionTypes.BOOKS_FINISHED_SUCCESS:
            return {
                ...state,
                loading: false,
                booksFinished: action.payload
            };
        case BooksActionTypes.BOOKS_FINISHED_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                booksFinished: []
            };
        default:
            return state;
    }
};

export default booksReducer;