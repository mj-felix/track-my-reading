import axios from 'axios';
import AuthActionTypes from '../types/auth.types';
import BooksActionTypes from '../types/books.types';

export const fetchBooks = (status) => async (dispatch, getState) => {

    let actionTypeSuccess, actionTypeFailure;
    switch (status) {
        case 'reading':
            actionTypeSuccess = BooksActionTypes.BOOKS_READING_SUCCESS;
            actionTypeFailure = BooksActionTypes.BOOKS_READING_FAILURE;
            break;
        case 'added':
            actionTypeSuccess = BooksActionTypes.BOOKS_ADDED_SUCCESS;
            actionTypeFailure = BooksActionTypes.BOOKS_ADDED_FAILURE;
            break;
        case 'finished':
            actionTypeSuccess = BooksActionTypes.BOOKS_FINISHED_SUCCESS;
            actionTypeFailure = BooksActionTypes.BOOKS_FINISHED_FAILURE;
            break;
        default:
            actionTypeSuccess = null;
            actionTypeFailure = null;
    }
    try {
        dispatch({
            type: BooksActionTypes.BOOKS_REQUEST,
        });

        const { token } = getState().auth;

        const response = await axios.get(
            `/api/v1/books?status=${status}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

        dispatch({
            type: actionTypeSuccess,
            payload: response.data
        });

    } catch (error) {
        dispatch({
            type: actionTypeFailure,
            payload: error.response.data.message
        });
        if (error.response.status === 401 || error.response.status === 404) {
            setTimeout(() => {
                dispatch({
                    type: AuthActionTypes.LOGOUT,
                });
            }, 2000);
        }
    }
};