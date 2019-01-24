/**
 * Created by ali_jalbani on 10/18/17.
 */
import {GET_DISCOVERY_CONTROL_PENDING,
    GET_DISCOVERY_CONTROL_SUCCESS,
    GET_DISCOVERY_CONTROL_ERROR,
    GET_DISCOVERY_CONTROL,
    GET_DISCOVERY_CATEGORY_CONTROL} from './action'

const INITIAL_STATE = {
    isSuccess: false,
    isPending: false,
    isError: false,
    protocols: [],
    token: '',
    message:''
};
export default function discoveryProtocolsReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_DISCOVERY_CONTROL_PENDING:
            return Object.assign({}, state, {
                isPending: action.isPending
            });

        case GET_DISCOVERY_CONTROL_SUCCESS:
            return Object.assign({}, state, {
                isSuccess: action.isSuccess
            });

        case GET_DISCOVERY_CONTROL_ERROR:
            return Object.assign({}, state, {
                isError: action.isError,
                message: action.message
            });

        case GET_DISCOVERY_CONTROL:
              return Object.assign({}, state, {
                controls: action.controls
              });

        case GET_DISCOVERY_CATEGORY_CONTROL:
              return Object.assign({}, state, {
                  category: action.category
              });

        default:
            return state;
    }
}
