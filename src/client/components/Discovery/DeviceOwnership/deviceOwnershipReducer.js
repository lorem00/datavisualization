
const INITIAL_STATE = {
    deviceOwnershipData: [],
    trendData: [],
    deviceConnectivityData: {
        unmanaged: {
            data: [],
            yRange: 0,
        },
        managed: {
            data: [],
            yRange: 0,
        },
    },
};

export default function deviceOwnershipReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'GET_DEVICE_OWNERSHIP_DATA':
            return Object.assign({}, state, {
                deviceOwnershipData: action.data,
            });
        case 'GET_DEVICE_OWNERSHIP_TREND_DATA':
            return Object.assign({}, state, {
                trendData: action.data,
            });
        case 'GET_DEVICE_CONNECTIVITY_DATA':
            return Object.assign({}, state, {
                deviceConnectivityData: action.data,
            });
        default:
            return state;
    }

}
