import axios from 'axios';
import rest from '../../common/utils/restconfig';

export const GET_DEVICE_SUMMARY = 'GET_DEVICE_SUMMARY';
export const GET_CHART_DATA = 'GET_CHART_DATA';
export const GET_TREND_DATA = 'GET_TREND_DATA';
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const SHOW_ERROR = 'SHOW_ERROR';



export function getDeviceSummary(data) {

    return dispatch => {
        let options = {
            headers: Object.assign({'Content-Type': 'application/json'})
          };
        axios.post(rest.DEVICE_SUMMARY, data, options)
            .then(function (response) {
                let chartData = {};
                let data=[],trend=[]

                if(response.data.data==null){
                    response.data = {
                        data: [
                            {
                                automated: 0,
                                managed: 0,
                                new: 0,
                                total: 0,
                                unmanaged: 0,
                                user: 0,
                                "unmanaged-innet": 0,
                            }
                        ]
                    }
                }else{
                    //BOT Sends an object not an array
                    if(Array.isArray(response.data.data)){
                      data=response.data.data[0].keys;
                    }else{
                      data=response.data.data.keys
                    }
                    trend=response.data['trend-detail'];

                }

                dispatch(setDeviceSummaryData(formatDeviceSummaryData(data)));
                if (trend) {
                    chartData = getChartData(trend);
                    dispatch(setChartData(chartData));
                }
                if(response.data['trend']){
                    dispatch(setTrendData(formatDeviceSummaryData(response.data['trend'].keys)));
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.data.type === 'error') {
                    if(error.response.data.errorno === 1) {
                        window.sessionStorage.removeItem('user');
                        window.location = '/login';
                    }
                }
                dispatch(showError({message: 'Unknown error.'}));
            });
    }

}

export function setFilter(filter) {
    return dispatch => {
        dispatch(changeFilter(filter));
    }
}

function getChartData(trendDetails) {
    let chartData = {};
    console.log("trendDetails ",trendDetails);
    trendDetails.forEach((t, i) => {
      t.keys.forEach((k)=>{
        if(!chartData[k.key]){
            chartData[k.key] = [k.count];
        }else{
          chartData[k.key].push(k.count);
        }
      });

      /*  if (i == 0) {
            chartData["total"] = [t.total];
            chartData["new"] = [t.new];
            chartData["managed"] = [t.managed];
            chartData["unmanaged"] = [t.new];
            chartData["user"] = [t.user];
            chartData["automated"] = [t.automated];
        } else {
            chartData["total"].push(t.total);
            chartData["new"].push(t.new);
            chartData["managed"].push(t.managed);
            chartData["unmanaged"].push(t.unmanaged);
            chartData["user"].push(t.user);
            chartData["automated"].push(t.automated);
        }*/
    });
    console.log("chartData ",chartData);
    return chartData;
}
function formatDeviceSummaryData(keys){
  let data={}
  keys.forEach((key)=>{
    if(!data[key]){
      data[key.key]=key.count;
    }
  });

  console.log(data);
  return data;
}

function setDeviceSummaryData(data) {
    return {
        type: GET_DEVICE_SUMMARY,
        data
    };
}

function setChartData(data) {
    return {
        type: GET_CHART_DATA,
        data
    };
}

function setTrendData(data) {
    return {
        type: GET_TREND_DATA,
        data
    };
}

function changeFilter(data) {

    return {
        type: CHANGE_FILTER,
        data
    };
}

function showError(error) {
    return {
        type: SHOW_ERROR,
        error
    };
}
