import {GET_DEVICE_CONNECTIONS_PENDING,
        GET_DEVICE_CONNECTIONS_SUCCESS,
        GET_DEVICE_CONNECTIONS_ERROR,
        GET_DEVICE_CONNECTIONS,} from './discoveryDeviceConnectionsActions'

const INITIAL_STATE = {
    isSuccess: false,
    isPending: false,
    isError: false,
    connections: [],
    token: '',
    message:''
};
export default function discoveryDeviceConnectionsReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_DEVICE_CONNECTIONS_PENDING:
            return Object.assign({}, state,{
                isPending: action.isPending
            });

        case GET_DEVICE_CONNECTIONS_SUCCESS:
            return Object.assign({}, state, {
                isSuccess: action.isSuccess
            });

        case GET_DEVICE_CONNECTIONS_ERROR:
            return Object.assign({}, state, {
                isError: action.isError,
                message: action.message
            });

        case GET_DEVICE_CONNECTIONS:
            return Object.assign({}, state, {
                connections: action.connections
            });

        default:
            return state;
    }
}