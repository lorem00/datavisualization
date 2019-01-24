import axios from 'axios'
import rest from '../common/utils/restconfig'
import __countBy from 'lodash/countBy';


export const GET_SPECTRUM_LIST_PENDING = 'GET_SPECTRUM_LIST_PENDING';
export const GET_SPECTRUM_LIST_SUCCESS = 'GET_SPECTRUM_LIST_SUCCESS';
export const GET_SPECTRUM_LIST_ERROR = 'GET_SPECTRUM_LIST_ERROR';
export const GET_SPECTRUM_LIST = 'GET_SPECTRUM_LIST';
export const GET_TREEMAP_DATA = 'GET_TREEMAP_DATA';
export const GET_DEVICE_DETAIL_DATA = 'GET_DEVICE_DETAIL_DATA';

function setPending(isPending) {
    return {
        type: GET_SPECTRUM_LIST_PENDING,
        isPending,
    };
}

function setSuccess(isSuccess) {
    return {
        type: GET_SPECTRUM_LIST_SUCCESS,
        isSuccess,
    };
}

function setError(isError) {
    return {
        type: GET_SPECTRUM_LIST_ERROR,
        isError,
    };
}

function setData(data) {
    return {
        type: GET_SPECTRUM_LIST,
        data,
    };
}

function setTreeMapData(data) {
    return {
        type: GET_TREEMAP_DATA,
        data,
    };
}

function setDeviceDetailData(data) {
    return {
        type: GET_DEVICE_DETAIL_DATA,
        data,
    };
}

function callApiPost(endpoint, data, callback) {
    const options = {
        headers: Object.assign({ 'Content-Type': 'application/json' }),
    };
    axios.post(endpoint, data, options)
        .then((response) => {
            if (response.data != null) {
                return callback(null, response.data);
            }
            return callback(null, []);
        }).catch((error) => {
            if (error.response && error.response.data.type === 'error') {
                if (error.response.data.errorno === 1) {
                    window.sessionStorage.removeItem('user');
                    window.location = '/login';
                }
            }
            return callback(new Error(`Could not get fetch data for '${endpoint}' endpoint`));
        });
}

export function getDeviceDetailData(id) {
    return (dispatch) => {

        callApiPost(rest.GET_DEVICE_DETAIL_DATA, { deviceKey: id }, (error, data) => {
            dispatch(setDeviceDetailData(data));
        });
    };
}

export function getSpectrumList(getdata) {
    return (dispatch) => {
        dispatch(setPending(true));
        dispatch(setSuccess(false));
        dispatch(setError(false));

        callApiPost(rest.GET_SPECTRUM_LIST, getdata, (error, list) => {
            dispatch(setPending(false));
            if (!error) {
                dispatch(setSuccess(true));
                const treeMapData = __countBy(list, 'type');
                dispatch(setTreeMapData(treeMapData));
                dispatch(setData(list));
            } else {
                dispatch(setError(true));
            }
        });
    };
}
