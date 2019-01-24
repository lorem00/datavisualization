const INITIAL_STATE = {
    deviceTypes: [],
    deviceTypesData: [],
    page: 1,
    deviceManufacturers: [],
    deviceOS: {},
    deviceOSChartData: [],
    trendData: [],
};

export default function deviceTypesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_DEVICE_TYPES':
            return Object.assign({}, state, { deviceTypes: action.data });
        case 'GET_DEVICE_TYPES_DATA':
            return Object.assign({}, state, { deviceTypesData: action.data });
        case 'GET_DEVICE_TYPES_PAGE_NUMBER':
            return Object.assign({}, state, { page: action.data });
        case 'GET_DEVICE_MANUFACTURERS':
            return Object.assign({}, state, { deviceManufacturers: action.data });
        case 'GET_DEVICE_MANUFACTURERS_CHART_DATA':
            return Object.assign({}, state, { deviceManufacturersChartData: action.data });
        case 'GET_DEVICE_OS':
            return Object.assign({}, state, { deviceOS: action.data });
        case 'GET_DEVICE_OS_CHART_DATA':
            return Object.assign({}, state, { deviceOSChartData: action.data });
        case 'GET_DEVICE_TYPES_TREND_DATA':
            return Object.assign({}, state, { trendData: action.data });
        default:
            return state;
    }
}
