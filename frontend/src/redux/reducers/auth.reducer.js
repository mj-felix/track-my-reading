import AuthActionTypes from '../types/auth.types';

const initialState = {
    loading: false,
    user: null,
    token: '',
    error: '',
    forceLogout: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionTypes.STORE_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case AuthActionTypes.USER_UPSERT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case AuthActionTypes.USER_UPSERT_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            };
        case AuthActionTypes.USER_UPSERT_FAILURE:
            return {
                ...state,
                loading: false,
                user: null,
                token: '',
                error: action.payload
            };
        case AuthActionTypes.LOGOUT:
            return {
                forceLogout: true
            };
        default:
            return state;
    }
};

export default authReducer;