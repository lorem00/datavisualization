import moment from 'moment';

export const TOGGLE_NOISE_FILTER = 'TOGGLE_NOISE_FILTER';

function setDates(intervalData) {
    let starttime;
    let endtime;
    const {
        filter,
        initTime,
    } = intervalData;
    const interval = filter.value || filter;
    switch (interval) {
        case 'hourly':
            starttime = (moment().subtract('1', 'hour').startOf('hour').unix() * 1000);
            endtime = (moment().subtract('1', 'hour').endOf('hour').unix());
            break;
        case 'daily':
            starttime = (moment().subtract('1', 'days').startOf('day').unix() * 1000);
            endtime = (moment(initTime).endOf('day').unix());
            break;
        case 'weekly':
            starttime = (moment().subtract('7', 'days').startOf('day').unix() * 1000);
            endtime = (moment(initTime).add('7', 'days').endOf('day').unix());
            break;
        case 'fortnight':
            starttime = (moment().subtract('15', 'days').startOf('day').unix() * 1000);
            endtime = (moment(initTime).add('15', 'days').endOf('day').unix());
            break;
        case 'monthly':
            starttime = (moment().subtract('30', 'days').startOf('day').unix() * 1000);
            endtime = (moment(initTime).add('30', 'days').endOf('day').unix());
            break;
        case 'bot':
            starttime = (moment().subtract('1', 'hour').startOf('hour').unix() * 1000);
            endtime = (moment(initTime).subtract('1', 'hour').endOf('hour').unix());
            break;
        default:
    }
    starttime = +initTime;
    endtime *= 1000;
    return { interval, starttime, endtime };
}


function changeFilter(data) {
    return {
        type: 'CHANGE_FILTER',
        data,
    };
}
function changeInterval(data) {
    return {
        type: 'CHANGE_INTERVAL',
        data,
    };
}
function changeStartTime(data) {
    return {
        type: 'CHANGE_STARTTIME',
        data,
    };
}
function changeEndTime(data) {
    return {
        type: 'CHANGE_ENDTIME',
        data,
    };
}

function showError(error) {
    return {
        type: 'SHOW_ERROR',
        error,
    };
}

export function setFilter(filter) {
    return (dispatch) => {
        dispatch(changeFilter(filter));
    };
}

export function setInterval(intervalData) {
    const dates = setDates(intervalData);
    return (dispatch) => {
        dispatch(changeInterval(dates));
    };
}


export function setStartTime(timestamp) {
    return (dispatch) => {
        dispatch(changeStartTime(timestamp));
    };
}

export function setEndTime(timestamp) {
    return (dispatch) => {
        dispatch(changeEndTime(timestamp));
    };
}

export function toggleNoiseFilter(data) {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_NOISE_FILTER,
            data: data.value === 'true',
        });
    };
}
