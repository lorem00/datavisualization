import axios from 'axios';
import _sortBy from 'lodash/sortBy';
import * as d3 from 'd3';
import rest from '../../common/utils/restconfig';
import mnemonics from '../../common/utils/types'



const colors = ['#2A92A6', '#8D9A9F', '#0F655F', '#00C0E0', '#446F81', '#9A88A2', '#1AD7CA', '#17A59B', '#C99D6E', '#38484E'];
/*const mnemonics = {
    printing: {
        label: 'Printing',
        color: '#95dfd8',
    },
    audio_video: {
        label: 'Audio/Video',
        color: '#3dbfdf',
    },
    'low-power_computer': {
        label: 'Low Power Computer',
        color: '#0F655F',
    },
    accessories: {
        label: 'Accessories',
        color: '#00C0E0',
    },
    computer: {
        label: 'Computer',
        color: '#8fc6c1',
    },
    Uncategorized: {
        label: 'Uncategorized',
        color: '#9A88A2',
    },
    mobile_phone: {
        label: 'Mobile phone',
        color: '#1AD7CA',
    },
    networking_equipment: {
        label: 'Networking Equipment',
        key: 'networking-equipment',
        color: '#17A59B',
    },
    wootcloud: {
        label: 'Wootcloud',
        key: 'wootcloud',
        color: '#C99D6E',
    },
    server: {
        label: 'Server',
        key: 'server',
        color: '#38484E',
    },
    medical_health: {
        label: 'Medical Health',
        key: 'medical_health',
        color: '#9A88A2',
    },
    gaming: {
        label: 'Gaming',
        color: '#446F81',
    },
    imaging: {
        label: 'Imaging',
        color: '#00C0E0',
    },
};*/

export function getDeviceTypes(data) {

    return (dispatch) => {
        dispatch(getDeviceTypesHasStarted());
        let options = {
            headers: Object.assign({'Content-Type': 'application/json'})
        };
        axios.post(rest.DEVICE_TYPES, data, options)
            .then(function (response) {
                console.log("response",response)
                dispatch(getDeviceTypesHasFinished());
                if (response.data) {
                    let data = [], trend = []
                    if (Array.isArray(response.data.data)) {
                        data = response.data.data[0].keys;
                    } else {
                        data = response.data.data.keys
                    }
                    trend = response.data['trend-detail'];
                    //console.log(formatDeviceTypesData(data));
                    dispatch(setDeviceTypesData(formatDeviceTypesData(data)));
                    dispatch(setDeviceTypes(data));
                    dispatch(setDeviceTypesPageNumber(1));
                    dispatch(setDeviceTypesTrendData(formatTrendData(trend)));
                } else {
                    dispatch(setDeviceTypesData([]));
                    dispatch(setDeviceTypes([]));
                }

            })
            .catch(function (error) {
              
                if (error.response.data.type === 'error') {
                    if (error.response.data.errorno === 1) {
                        window.sessionStorage.removeItem('user');
                        window.location = '/login';
                    }
                    dispatch(showError(error.response.data));
                } else {
                    dispatch(showError({message: 'Unknown error.'}));
                }
            });
    }

}

export function getDeviceManufacturers(data) {

    return (dispatch) => {
        dispatch(getDeviceManufacturersHasStarted());
        let options = {
            headers: Object.assign({'Content-Type': 'application/json'})
        };
        axios.post(rest.GET_DEVICE_MANUFACTURERS, data, options)
            .then(function (response) {
                dispatch(getDeviceManufacturersHasFinished());
                if (response.data) {
                    let data = []
                    if (Array.isArray(response.data.data)) {
                        data = response.data.data[0].keys;
                    } else {
                        data = response.data.data.keys
                    }
                    dispatch(setDeviceManufacturersData(data));
                    dispatch(setDeviceManufacturersChartData(getChartData(data)));
                } else {
                    dispatch(setDeviceTypesData(formatDeviceTypesData([])));
                    dispatch(setDeviceManufacturersChartData([]));
                }

            })
            .catch(function (error) {
                dispatch(showError("Unable to get device types data"));
            });
    }

}

export function getDeviceOs(data) {

    return (dispatch) => {
        dispatch(getDeviceOSHasStarted());
        let options = {
            headers: Object.assign({'Content-Type': 'application/json'})
        };
        axios.post(rest.GET_DEVICE_OS, data, options)
            .then(function (response) {
                dispatch(getDeviceOSHasFinished());
                if (response.data) {
                    let data = []
                    if (Array.isArray(response.data.data)) {
                        data = response.data.data[0].keys;
                    } else {
                        data = response.data.data.keys
                    }

                    dispatch(setDeviceOSData(data));
                    dispatch(setDeviceOSChartData(getChartData(data)));

                } else {
                    dispatch(setDeviceOSData(formatDeviceTypesData([])));
                    dispatch(setDeviceOSChartData([]));
                }

            })
            .catch(function (error) {
                dispatch(showError("Unable to get device types data"));
            });
    }

}

function getChartData(data) {
    let chartData = {categories: [], data: []}, sortedData, total = 0;
    if (data.length > 10) {
        data = _sortBy(data, 'count').reverse();
    }

    data.forEach(function (d, i) {
        if (i >= 9) {
            total = total + d.count;
        } else {
            chartData.categories.push((d.key=="")?'Unknown':d.key);
            if(d.key==""){
                chartData.data.push({y: d.count, color: "#ff8d6d"});
            }else{
                chartData.data.push({y: d.count, color: colors[i]});
            }

        }
    })
    if (total > 0) {
        chartData.categories.push('Others');
        chartData.data.push({y: total, color: colors[9]});
    }

    // console.log("chartData ",chartData);
    return chartData;
}

function formatDeviceTypesData(devices, page = 1) {

    let deviceTypes = [];
    console.log(devices);
    if (devices.length > 9) {
        let others = 0;
        const end = page * 9;
        const start = end - 9;
        let topDeviceTypes = devices.slice(start, end);

        if (topDeviceTypes.length == 9) {
            for (let i = end; i < devices.length; i += 1) {
                others += devices[i].count;
            }
            topDeviceTypes = topDeviceTypes.concat([{ key: 'Others', count: others, cursor: 'pointer' }]);
        }
        deviceTypes = addColors(topDeviceTypes);
    } else {
        deviceTypes = addColors(devices);
    }


    return deviceTypes;

}

export function getDeviceTypesData(devices, page = 1) {
    // console.log("page",page);
    return (dispatch) => {
        const deviceTypes = formatDeviceTypesData(devices, page);
        dispatch(setDeviceTypesData(deviceTypes));
        dispatch(setDeviceTypesPageNumber(page));
    }

}


function addColors(devices) {
    const min = d3.min(devices, function(d) {return d.count;});
    const max = d3.max(devices, function(d) {return d.count;});
    const x = d3.scaleLinear().domain([min, max]).range([5, 100]);

    return devices.map((device, i) => {
        console.log(mnemonics[device.key]);
        let label = (mnemonics[device.key]) ? mnemonics[device.key].label : (device.key=="")?'Unknown':device.key;

        let color = (mnemonics[device.key]) ? mnemonics[device.key].color :(device.key=="")? "#ff8d6d":'#000';
        // console.log({"name":label,"value":device.count,"color":color});
        if (min < (max * .05)) {
            return Object.assign({}, device, {
                key: device.key,
                name: label,
                value: x(device.count),
                count: device.count,
                key:device.key,
                color,
            });
        }
        return Object.assign({}, device, {
            name: label,
            key: device.key,
            value: device.count,
            count: device.count,
            key:device.key,
            color,
        });
    });
}

function formatTrendData(trend) {
    const series = {};
    let trendData = [];
    console.log('trend ', trend);

    trend.forEach(function (t) {

        t.keys.forEach(function (key) {
            if (series[key.key]) {
                series[key.key].data.push([new Date(t.timestamp).getTime()-(new Date(t.timestamp).getTimezoneOffset()*60*1000), key.count]);
            } else {
                let label = (mnemonics[key.key]) ? mnemonics[key.key].label : key.key;
                let color = (mnemonics[key.key]) ? mnemonics[key.key].color : "#000";
//console.log(new Date(t.timestamp).getTime(), Date(t.timestamp- (t.timestamp.getTimezoneOffset()*60*1000)).getTime());
                series[key.key] = {
                    name: label,
                    color: color,
                    key: key.key,
                    data: [[new Date(t.timestamp).getTime()-(new Date(t.timestamp).getTimezoneOffset()*60*1000), key.count]],
                    "type": "areaspline",
                    "tooltip": {"valueDecimals": 0}
                }
            }
        });

    });

    trendData = Object.values(series);

    return trendData;
}

function setDeviceTypes(data) {
    return {
        type: 'GET_DEVICE_TYPES',
        data,
    };
}

function getDeviceTypesHasStarted() {
    return {
        type: 'GET_DEVICE_TYPES_HAS_STARTED',
    };
}

function getDeviceTypesHasFinished() {
    return {
        type: 'GET_DEVICE_TYPES_HAS_FINISHED',
    }
}

function setDeviceTypesData(data) {
    return {
        type: 'GET_DEVICE_TYPES_DATA',
        data,
    };
}

function getDeviceTypesDataHasStarted() {
    return {
        type: 'GET_DEVICE_TYPES_DATA_HAS_STARTED',
    };
}

function getDeviceTypesDataHasFinished() {
    return {
        type: 'GET_DEVICE_TYPES_DATA_HAS_FINISHED',
    };
}

function setDeviceManufacturersData(data) {
    return {
        type: 'GET_DEVICE_MANUFACTURERS',
        data,
    };
}

function getDeviceManufacturersHasStarted() {
    return {
        type: 'GET_DEVICE_MANUFACTURERS_HAS_STARTED',
    };
}

function getDeviceManufacturersHasFinished() {
    return {
        type: 'GET_DEVICE_MANUFACTURERS_HAS_FINISHED',
    };
}


function setDeviceManufacturersChartData(data) {
    return {
        type: 'GET_DEVICE_MANUFACTURERS_CHART_DATA',
        data,
    };
}

function getDeviceManufacturersChartDataHasStarted() {
    return {
        type: 'GET_DEVICE_MANUFACTURERS_CHART_DATA_HAS_STARTED',
    };
}

function getDeviceManufacturersChartDataHasFinished() {
    return {
        type: 'GET_DEVICE_MANUFACTURERS_CHART_DATA_HAS_FINISHED',
    };
}

function setDeviceOSData(data) {
    return {
        type: 'GET_DEVICE_OS',
        data,
    };
}

function getDeviceOSHasStarted() {
    return {
        type: 'GET_DEVICE_OS_HAS_STARTED',
    };
}

function getDeviceOSHasFinished() {
    return {
        type: 'GET_DEVICE_OS_HAS_FINISHED',
    };
}

function setDeviceOSChartData(data) {
    return {
        type: 'GET_DEVICE_OS_CHART_DATA',
        data,
    };
}

function getDeviceOSChartDataHasStarted() {
    return {
        type: 'GET_DEVICE_OS_CHART_DATA_HAS_STARTED',
    };
}

function getDeviceOSChartDataHasFinished() {
    return {
        type: 'GET_DEVICE_OS_CHART_DATA_HAS_FINISHED',
    };
}

function setDeviceTypesPageNumber(data) {
    // console.log("deviceTypes Page",data);

    return {
        type: 'GET_DEVICE_TYPES_PAGE_NUMBER',
        data,
    };
}

function getDeviceTypesPageNumberHasStarted() {
    return {
        type: 'GET_DEVICE_TYPES_PAGE_NUMBER_HAS_STARTED',
    };
}

function getDeviceTypesPageNumberHasFinished() {
    return {
        type: 'GET_DEVICE_TYPES_PAGE_NUMBER_HAS_FINISHED',
    };
}

function setDeviceTypesTrendData(data) {
    // console.log("deviceTypes Trend",data);

    return {
        type: 'GET_DEVICE_TYPES_TREND_DATA',
        data,
    };
}

function geteviceTypesTrendDataHasStarted() {
    return {
        type: 'GET_DEVICE_TYPES_TREND_DATA_HAS_STARTED',
    };
}

function geteviceTypesTrendDataHasFinished() {
    return {
        type: 'GET_DEVICE_TYPES_TREND_DATA_HAS_FINISHED',
    };
}

function showError(error) {
    return {
        type: 'SHOW_ERROR',
        error,
    };
}
