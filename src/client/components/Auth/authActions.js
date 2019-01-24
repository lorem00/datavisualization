import axios from 'axios'
import rest from '../../components/common/utils/restconfig'
import querystring from 'querystring'
import ls from 'localstorage-ttl'
import Constants from '../../components/common/utils/Constants'

export const USER_LOGIN_PENDING = 'USER_LOGIN_PENDING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';

export function authenticate(email, password) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(false));

        authenticateApi(email, password, error => {
            dispatch(setLoginPending(false));
            if (!error) {
                dispatch(setLoginSuccess(true));
            } else {
                dispatch(setLoginError(true));
            }
        });
    }
}

function authenticateApi(email, password, callback) {
    var options = {
        headers: Object.assign({'Content-Type': 'application/json'})
    };
    axios.post(rest.LOGIN, {"id": email, "pass": password}, options)
        .then((response) => {
            if(response.data['account-id']!==undefined){
                let userObj = response.data;
                let map = {
                    "admin": "ADMINISTRATOR",
                    "customer": "CUSTOMER"
                };
                for(let k in userObj.roles){
                    userObj.roles[k] = map[userObj.roles[k]];
                }
                window.sessionStorage.setItem("user", JSON.stringify(response.data));
                //ls.set("auth", JSON.stringify(response.data.payload), Constants.MILLISECONDS_IN_HOUR * 3);
                return callback(null);
            }else{
                return callback(new Error('Invalid email and password'));
            }
        }).catch((err) => {
            return callback(new Error('Invalid email and password'));
        });
}

function setLoginPending(isLoginPending) {
    return {
        type: USER_LOGIN_PENDING,
        isLoginPending
    };
}

function setLoginSuccess(isLoginSuccess) {
    return {
        type: USER_LOGIN_SUCCESS,
        isLoginSuccess
    };
}

function setLoginError(loginError) {
    return {
        type: USER_LOGIN_ERROR,
        loginError
    }
}
