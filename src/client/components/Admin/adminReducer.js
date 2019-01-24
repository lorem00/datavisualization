/**
 * Created by ali_jalbani on 10/18/17.
 */
import {GET_USERS_PENDING,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
    GET_USERS} from './adminActions'

const INITIAL_STATE = {
    isSuccess: false,
    isPending: false,
    isError: false,
    users: [],
    token: '',
    message:''
};
export default function adminReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_USERS_PENDING:
            return Object.assign({}, state, {
                isPending: action.isPending
            });

        case GET_USERS_SUCCESS:
            return Object.assign({}, state, {
                isSuccess: action.isSuccess
            });

        case GET_USERS_ERROR:
            return Object.assign({}, state, {
                isError: action.isError,
                message:'Could not get users.'
            });

        case GET_USERS:
            // alert(JSON.stringify(action));
            return Object.assign({}, state, {
                users: action.users
            });

        default:
            return state;
    }
}