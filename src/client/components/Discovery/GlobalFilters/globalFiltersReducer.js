import moment from 'moment';

const INITIAL_STATE = {

    filter: 'total',
    noiseFilter: false,
    interval: 'daily',
    starttime: (moment().subtract('1', 'days').startOf('day').unix() * 1000),
    endtime: (moment().subtract('1', 'days').endOf('day').unix() * 1000),
};

export default function globalFiltersReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'CHANGE_INTERVAL':
            return Object.assign({}, state, {
                interval: action.data.interval,
                starttime: action.data.starttime,
                endtime: action.data.endtime,
            });
        case 'CHANGE_STARTTIME':
            return Object.assign({}, state, {
                starttime: action.data,
            });
        case 'CHANGE_ENDTIME':
            return Object.assign({}, state, {
                endtime: action.data,
            });
        case 'TOGGLE_NOISE_FILTER':
            return Object.assign({}, state, {
                noiseFilter: action.data,
            });
        default:
            return state;
    }
}
