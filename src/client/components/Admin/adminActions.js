import axios from 'axios'
import rest from '../../components/common/utils/restconfig'

export const GET_USERS_PENDING = 'GET_USERS_PENDING';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';
export const GET_USERS = 'GET_USERS';

export function getAllUsers() {
    return dispatch => {
        dispatch(setAdminPending(true));
        dispatch(setAdminSuccess(false));
        dispatch(setAdminError(false));

        getAllUsersApi(function(error, list) {
            dispatch(setAdminPending(false));
            if (!error) {
                dispatch(setAdminSuccess(true));
                dispatch(getAllUserss(list));
            } else {
                dispatch(setAdminError(true));
            }
        });
    }
}

function getAllUsersApi( callback ) {
    let options = {
        headers: Object.assign({'Content-Type': 'application/json'})
    };
    axios.get(rest.GET_ALL_USERS, options)
        .then((response) => {
            if(response.data!=null){

                return callback(null, response.data);
            }else{
                return callback(new Error('Could not get All Users'));
            }
        }).catch((err) => {
            return callback(new Error('Could not get All Users'));
        });
}

function setAdminPending(isPending) {
    return {
        type: GET_USERS_PENDING,
        isPending
    };
}

function setAdminSuccess(isSuccess) {
    return {
        type: GET_USERS_SUCCESS,
        isSuccess
    };
}

function setAdminError(isError) {
    return {
        type: GET_USERS_ERROR,
        isError
    }
}

function getAllUserss(users){
    return {
        type: GET_USERS,
        users
    }
}