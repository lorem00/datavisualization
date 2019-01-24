import axios from 'axios';
import rest from '../../common/utils/restconfig';

export const GET_DISCOVERYPROTOCOLS_PENDING = 'GET_DISCOVERYPROTOCOLS_PENDING';
export const GET_DISCOVERYPROTOCOLS_SUCCESS = 'GET_DISCOVERYPROTOCOLS_SUCCESS';
export const GET_DISCOVERYPROTOCOLS_ERROR = 'GET_DISCOVERYPROTOCOLS_ERROR';
export const GET_DISCOVERYPROTOCOLS = 'GET_DISCOVERYPROTOCOLS';
export const GET_DISCOVERY_SPECTRUM = 'GET_DISCOVERY_SPECTRUM';

function setDiscoveryProcolsPending(isPending) {
    return {
        type: GET_DISCOVERYPROTOCOLS_PENDING,
        isPending,
    };
}

function setDiscoveryProcolsSuccess(isSuccess) {
    return {
        type: GET_DISCOVERYPROTOCOLS_SUCCESS,
        isSuccess,
    };
}

function setDiscoveryProcolsError(isError) {
    return {
        type: GET_DISCOVERYPROTOCOLS_ERROR,
        isError,
    };
}

function getDiscoveryProtocolApi(data, callback) {
    const options = {
        headers: Object.assign({ 'Content-Type': 'application/json' }),
    };
    axios.post(rest.GET_DEVICE_SPECTRUM, data, options)
        .then((response) => {
            console.log("response ",response);
            if (response.data != null) {
                return callback(null, response.data);
            }
            return callback(new Error('Could not get Discovery Protocols'));
        }).catch((error) => {
            if (error.response && error.response.data.type === 'error') {
                if (error.response.data.errorno === 1) {
                    window.sessionStorage.removeItem('user');
                    window.location = '/login';
                }
            }
            return callback(new Error('Could not get All Discovery Protocols'));
        });
}

function getDiscoverSpectrum(spectrum) {
    return {
        type: GET_DISCOVERY_SPECTRUM,
        spectrum,
    };
}


export function getDiscoveryProtocols(getdata) {
    return (dispatch) => {
        dispatch(setDiscoveryProcolsPending(true));
        getDiscoveryProtocolApi(getdata, (error, list) => {
            dispatch(setDiscoveryProcolsPending(false));
            if (!error) {
                dispatch(setDiscoveryProcolsSuccess(true));
                dispatch(getDiscoverSpectrum(list));
            } else {
                dispatch(setDiscoveryProcolsError(true));
            }
        });
    };
}
