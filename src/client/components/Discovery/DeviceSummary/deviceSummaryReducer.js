import {
    GET_DEVICE_SUMMARY,
    GET_CHART_DATA,
    CHANGE_FILTER,
    GET_TREND_DATA,
    SHOW_ERROR,
} from './deviceSummaryActions';

const INITIAL_STATE = {
    devices: {
        total: 0,
        new: 0,
        managed: 0,
        unmanged: 0,
        user: 0,
        automated: 0,
        trendDetails: [],
        trend: {
            total: 0,
            new: 0,
            managed: 0,
            unmanaged: 0
        }
    },
    chartData: {},
    trendData: {},
    filter: 'total',
    noiseFilter: false,
    error: {},
};

export default function deviceSummaryReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_DEVICE_SUMMARY:
            return Object.assign({}, state, { devices: action.data });
        case GET_CHART_DATA:
            return Object.assign({}, state, { chartData: action.data });
        case GET_TREND_DATA:
            return Object.assign({}, state, { trendData: action.data });
        case CHANGE_FILTER:
            return Object.assign({}, state, { filter: action.data });
        case SHOW_ERROR:
            return Object.assign({}, state, { error: action.error });
        default:
            return state;
    }
}
