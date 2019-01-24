import axios from 'axios'
import rest from '../../common/utils/restconfig'

export const GET_DEVICE_CONNECTIONS_PENDING = 'GET_DEVICE_CONNECTIONS_PENDING';
export const GET_DEVICE_CONNECTIONS_SUCCESS = 'GET_DEVICE_CONNECTIONS_SUCCESS';
export const GET_DEVICE_CONNECTIONS_ERROR= 'GET_DEVICE_CONNECTIONS_ERROR';
export const GET_DEVICE_CONNECTIONS = 'GET_DEVICE_CONNECTIONS';

/**
 * getDevicesWithConnections
 * @param params
 * @returns {function(*)}
 */

export function getDevicesWithConnections(params) {
    return dispatch => {
        dispatch(setDeviceConnectionsPending(true));
        dispatch(setDeviceConnectionsSuccess(false));
        dispatch(setDeviceConnectionsError(false));
        getDeviceConnectionsApi(params, function(error, connections) {
            dispatch(setDeviceConnectionsPending(false));
            if (!error) {
                dispatch(setDeviceConnectionsSuccess(true));
                dispatch(getAllDeviceConnections(connections));
            } else {
                dispatch(setDeviceConnectionsError(true));
            }
        });
    }
}

function getDeviceConnectionsApi( params, callback ) {
    let options = {
        headers: Object.assign({'Content-Type': 'application/json'})
    };
    axios.post(rest.GET_DEVICE_CONNECTIONS, params, options)
        .then((response) => {
            if(response.data != null){
                return callback(null, response.data);
            }else{
                return callback(new Error('Could not get Device Locations'));
            }
        }).catch((err) => {
        return callback(new Error('Could not get Device Locations', err));
    });
}

function setDeviceConnectionsPending(isPending) {
    return {
        type: GET_DEVICE_CONNECTIONS_PENDING,
        isPending
    };
}

function setDeviceConnectionsSuccess(isSuccess) {
    return {
        type: GET_DEVICE_CONNECTIONS_SUCCESS,
        isSuccess
    };
}

function setDeviceConnectionsError(isError) {
    return {
        type: GET_DEVICE_CONNECTIONS_ERROR,
        isError
    }
}

function getAllDeviceConnections(connections){
    return {
        type: GET_DEVICE_CONNECTIONS,
        connections
    }
}