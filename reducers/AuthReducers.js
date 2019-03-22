import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    REPEAT_PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGN_UP_USER,
    SIGN_UP_USER_FAIL,
} from '../Actions/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    repeatPassword: '',
    user: null,
    error: '',
    errorSignUp: '',
    loading: false
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case REPEAT_PASSWORD_CHANGED:
            return { ...state, repeatPassword: action.payload }
        case LOGIN_USER:
            return { ...state, loading: true, error: '' }
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload }
        case LOGIN_USER_FAIL:
            return { ...state, error: action.payload, password: '', loading: false }
        case SIGN_UP_USER:
            return { ...state, loading: true, error: '' }
        case SIGN_UP_USER_FAIL:
            return { ...state, errorSignUp: action.payload, loading: false }
        default:
            return state;
    }
};