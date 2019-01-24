import {GET_DEVICE_LOCATIONS_PENDING,
    GET_DEVICE_LOCATIONS_SUCCESS,
    GET_DEVICE_LOCATIONS_ERROR,
    GET_DEVICE_LOCATIONS,} from './discoveryDeviceLocationsActions'

const INITIAL_STATE = {
    isSuccess: false,
    isPending: false,
    isError: false,
    geoLocations: [],
    token: '',
    message:''
};
export default function discoveryDeviceLocationsReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_DEVICE_LOCATIONS_PENDING:
            return Object.assign({}, state,{
                isPending: action.isPending
            });

        case GET_DEVICE_LOCATIONS_SUCCESS:
            return Object.assign({}, state, {
                isSuccess: action.isSuccess
            });

        case GET_DEVICE_LOCATIONS_ERROR:
            return Object.assign({}, state, {
                isError: action.isError,
                message: action.message
            });

        case GET_DEVICE_LOCATIONS:
            return Object.assign({}, state, {
                geoLocations: action.geoLocations
            });

        default:
            return state;
    }
}