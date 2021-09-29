import axios from 'axios';
import AuthActionTypes from '../types/auth.types';

export const storeToken = (token) => (dispatch) => {
    dispatch({
        type: AuthActionTypes.STORE_TOKEN,
        payload: token
    });
};

export const upsertUser = (email) => async (dispatch, getState) => {
    try {
        dispatch({
            type: AuthActionTypes.USER_UPSERT_REQUEST,
        });

        const { token } = getState().auth;

        const response = await axios.post(
            '/api/v1/users',
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

        dispatch({
            type: AuthActionTypes.USER_UPSERT_SUCCESS,
            payload: response.data
        });

    } catch (error) {
        dispatch({
            type: AuthActionTypes.USER_UPSERT_FAILURE,
            payload: error.response.data.message
        });
        if (error.response.status === 401 || error.response.status === 422) {
            setTimeout(() => {
                dispatch({
                    type: AuthActionTypes.LOGOUT,
                });
            }, 2000);
        }
    }
};