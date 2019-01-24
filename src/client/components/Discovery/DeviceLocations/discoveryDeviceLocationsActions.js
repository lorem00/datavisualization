import axios from 'axios'
import rest from '../../common/utils/restconfig'

export const GET_DEVICE_LOCATIONS_PENDING = 'GET_DEVICE_LOCATIONS_PENDING';
export const GET_DEVICE_LOCATIONS_SUCCESS = 'GET_DEVICE_LOCATIONS_SUCCESS';
export const GET_DEVICE_LOCATIONS_ERROR= 'GET_DEVICE_LOCATIONS_ERROR';
export const GET_DEVICE_LOCATIONS = 'GET_DEVICE_LOCATIONS';

export const GET_DEVICE_CONNECTIONS_PENDING = 'GET_DEVICE_CONNECTIONS_PENDING';
export const GET_DEVICE_CONNECTIONS_SUCCESS = 'GET_DEVICE_CONNECTIONS_SUCCESS';
export const GET_DEVICE_CONNECTIONS_ERROR= 'GET_DEVICE_CONNECTIONS_ERROR';
export const GET_DEVICE_CONNECTIONS = 'GET_DEVICE_CONNECTIONS';

/**
 * getDevicesWithLocations
 * @param params
 * @returns {function(*)}
 */
export function getDevicesWithLocations(params) {
    return dispatch => {
        dispatch(setDeviceLocationsPending(true));
        dispatch(setDeviceLocationsSuccess(false));
        dispatch(setDeviceLocationsError(false));

        getDeviceLocationsApi(params, function(error, locations) {
            dispatch(setDeviceLocationsPending(false));
            if (!error) {
                dispatch(setDeviceLocationsSuccess(true));
                dispatch(getAllDeviceLocations(locations));
            } else {
                dispatch(setDeviceLocationsError(true));
            }
        });
    }
}

function getDeviceLocationsApi( params, callback ) {
    let options = {
        headers: Object.assign({'Content-Type': 'application/json'})
    };
    axios.post(rest.GET_DEVICE_LOCATIONS, params, options)
        .then((response) => {
            if(response.data != null){
                return callback(null, response.data);
            }else{
                return callback(new Error('Could not get Device Locations'));
            }
        }).catch((error) => {
        if(error.response.data.errorno === 1) {
            window.sessionStorage.removeItem('user');
            window.location = '/login';
        }
        return callback(new Error('Could not get Device Locations', error));
    });
}

function setDeviceLocationsPending(isPending) {
    return {
        type: GET_DEVICE_LOCATIONS_PENDING,
        isPending
    };
}

function setDeviceLocationsSuccess(isSuccess) {
    return {
        type: GET_DEVICE_LOCATIONS_SUCCESS,
        isSuccess
    };
}

function setDeviceLocationsError(isError) {
    return {
        type: GET_DEVICE_LOCATIONS_ERROR,
        isError
    }
}

function getAllDeviceLocations(geoLocations){
    return {
        type: GET_DEVICE_LOCATIONS,
        geoLocations
    }
}

