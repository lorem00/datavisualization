/**
 * Created by ali_jalbani on 10/18/17.
 */
import {
    GET_DISCOVERYPROTOCOLS_PENDING,
    GET_DISCOVERYPROTOCOLS_SUCCESS,
    GET_DISCOVERYPROTOCOLS_ERROR,
    GET_DISCOVERY_SPECTRUM,
} from './deviceSpectrumActions';

const INITIAL_STATE = {
    isSuccess: false,
    isPending: false,
    isError: false,
    protocols: {
        data: {
            timestamp: '',
            keys: [
                {
                    key: '',
                    count: 0,
                },
            ],
            'trend-detail': [
                {
                    timestamp: '',
                    keys: [
                        {
                            key: '',
                            count: 0,
                        },
                    ],
                },
            ],
        },
    },
    token: '',
    message: '',
};
export default function deviceSpectrumReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_DISCOVERYPROTOCOLS_PENDING:
            return Object.assign({}, state, {
                isPending: action.isPending,
            });

        case GET_DISCOVERYPROTOCOLS_SUCCESS:
            return Object.assign({}, state, {
                isSuccess: action.isSuccess,
            });

        case GET_DISCOVERYPROTOCOLS_ERROR:
            return Object.assign({}, state, {
                isError: action.isError,
                message: action.message,
            });

        // case GET_DISCOVERYPROTOCOLS:
        //     return Object.assign({}, state, {
        //         protocols: action.protocols
        //     });

        case GET_DISCOVERY_SPECTRUM:
            return Object.assign({}, state, {
                protocols: action.spectrum,
            });

        default:
            return state;
    }
}
