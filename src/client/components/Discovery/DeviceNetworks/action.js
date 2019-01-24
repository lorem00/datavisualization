import axios from 'axios'
import rest from '../../common/utils/restconfig'
import Utility from '../../common/utils/Utility'

export const GET_DISCOVERY_CONTROL_PENDING = 'GET_DISCOVERY_CONTROL_PENDING';
export const GET_DISCOVERY_CONTROL_SUCCESS = 'GET_DISCOVERY_CONTROL_SUCCESS';
export const GET_DISCOVERY_CONTROL_ERROR = 'GET_DISCOVERY_CONTROL_ERROR';
export const GET_DISCOVERY_CONTROL = 'GET_DISCOVERY_CONTROL';

export function getDiscoveryProtocols(getdata) {
    return dispatch => {
        dispatch(setDiscoveryProcolsPending(true));
        dispatch(getDiscoveryProtocolApiHasStarted());

        getDiscoveryProtocolApi(getdata, function (error, list) {
          //dispatch(getDiscoveryProtocolApiHasFinished());
            dispatch(setDiscoveryProcolsPending(false));

            if (!error) {
                dispatch(setDiscoveryProcolsSuccess(true));
                dispatch(getDiscoverSpectrum(list));
            } else {
                dispatch(setDiscoveryProcolsError(true));

            }
            dispatch(getDiscoveryProtocolApiHasFinished());
        });
    }
}

export function getDiscoveryCategoryCounts(getdata) {
    return dispatch => {
        dispatch(setDiscoveryProcolsPending(true));
        dispatch(getDiscoveryCategoryCountsApiHasStarted());

        getDiscoveryCategoryCountsApi(getdata, function (error, list) {
            dispatch(getDiscoveryCategoryCountsApiHasFinished());
            dispatch(setDiscoveryProcolsPending(false));
            if (!error) {
                dispatch(setDiscoveryProcolsSuccess(true));
                dispatch(getCategoryCount(list));
            } else {
                dispatch(setDiscoveryProcolsError(true));
            }
        });
    }
}

function getDiscoveryProtocolApi(data, callback) {
    let options = {
        headers: Object.assign({'Content-Type': 'application/json'})
    };
    axios.post(rest.GET_DEVICE_CONTROL, data, options)
        .then((response) => {
            if (response.data != null) {
                return callback(null, response.data);
            } else {
                return callback(new Error('Could not get Discovery Controls'));
            }
        }).catch((error) => {
        if (error.response.data.type === 'error') {
            if(error.response.data.errorno === 1) {
                window.sessionStorage.removeItem('user');
                window.location = '/login';
            }
        }
        return callback(new Error('Could not get All Discovery Controls'));
    });
}


function getDiscoveryCategoryCountsApi(data, callback) {
    let options = {
        headers: Object.assign({'Content-Type': 'application/json'})
    };
    axios.post(rest.GET_DEVICE_CATEGORY_CONTROL, data, options)
        .then((response) => {
            if (response.data != null) {
                return callback(null, response.data);
            } else {
                return callback(new Error('Could not get Discovery Category Controls'));
            }
        }).catch((err) => {
        return callback(new Error('Could not get All Discovery Category Controls'));
    });
}

function setDiscoveryProcolsPending(isPending) {
    return {
        type: GET_DISCOVERY_CONTROL_PENDING,
        isPending
    };
}

function setDiscoveryProcolsSuccess(isSuccess) {
    return {
        type: GET_DISCOVERY_CONTROL_SUCCESS,
        isSuccess
    };
}

function setDiscoveryProcolsError(isError) {
    return {
        type: GET_DISCOVERY_CONTROL_ERROR,
        isError
    }
}

function getDiscoverSpectrum(controls) {
    return {
        type: GET_DISCOVERY_CONTROL,
        controls
    }
}

function getCategoryCount(category) {
    return {
        type: GET_DISCOVERY_CATEGORY_CONTROL,
        category
    }
}

function getDiscoveryProtocolApiHasStarted() {
    return {
        type: 'GET_DISCOVERY_PROTOCOLS_API_HAS_STARTED',
    };
}

function getDiscoveryProtocolApiHasFinished() {
    return {
        type: 'GET_DISCOVERY_PROTOCOLS_API_HAS_FINISHED',
    };
}

function getDiscoveryCategoryCountsApiHasStarted() {
    return {
        type: 'GET_DISCOVERY_CATEGORY_COUNTS_API_HAS_STARTED',
    };
}

function getDiscoveryCategoryCountsApiHasFinished() {
    return {
        type: 'GET_DISCOVERY_CATEGORY_COUNTS_API_HAS_FINISHED',
    }
}
