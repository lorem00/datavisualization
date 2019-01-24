/**
 * Created by ali_jalbani on 11/18/17.
 */
import {
    GET_SPECTRUM_LIST_PENDING,
    GET_SPECTRUM_LIST_SUCCESS,
    GET_SPECTRUM_LIST_ERROR,
    GET_SPECTRUM_LIST,
} from './DetailsActions';

const INITIAL_STATE = {
    isSuccess: false,
    isPending: false,
    isError: false,
    spectrums: [],
    token: '',
    message: '',
    treeMapData: [],
    deviceDetailData: {},
};
export default function discoverySpectrumDrillDownReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_SPECTRUM_LIST_PENDING:
            return Object.assign({}, state, {
                isPending: action.isPending,
            });

        case GET_SPECTRUM_LIST_SUCCESS:
            return Object.assign({}, state, {
                isSuccess: action.isSuccess,
            });

        case GET_SPECTRUM_LIST_ERROR:
            return Object.assign({}, state, {
                isError: action.isError,
                message: action.message,
            });

        case GET_SPECTRUM_LIST:
            return Object.assign({}, state, {
                spectrums: action.data,
            });
        case 'GET_TREEMAP_DATA':
            return Object.assign({}, state, {
                treeMapData: action.data,
            });
        case 'GET_DEVICE_DETAIL_DATA':
            return Object.assign({}, state, {
                deviceDetailData: action.data,
            });

        default:
            return state;
    }
}
