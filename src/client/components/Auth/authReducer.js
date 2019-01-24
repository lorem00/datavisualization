import {USER_LOGIN_PENDING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGOUT} from './authActions'

const INITIAL_STATE = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginError: false,
    user: '',
    modules: [],
    permissions: [],
    token: '',
    message:''
};
export default function authenticationReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case USER_LOGIN_PENDING:
            return Object.assign({}, state, {
                isLoginPending: action.isLoginPending
            });

        case USER_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoginSuccess: action.isLoginSuccess
            });

        case USER_LOGIN_ERROR:
            return Object.assign({}, state, {
                loginError: action.loginError,
                message:'Invalid email or password.'
            });

        default:
            return state;
    }
}