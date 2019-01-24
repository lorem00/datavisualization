import axios from 'axios';
import rest from '../../common/utils/restconfig';
import * as d3 from "d3";

const mnemonics= {
    "employee-owned": {
        label: "Employee Owned",
        color:'#95dfd8'
    },
    neighborhood: {
        label: "Neighborhood",
        color:'#97b5bc'
    },
    transient: {
        label: "Transient",
        color:'#2da79b'
    },
    visiting: {
        label: "Visiting",
        color:'#a4ebfc'
    },
    "guest": {
        label: "Guest",
        color:'#B4E6EF'
    },
    corporate: {
        label: "Corporate",
        color:'#3dbfdf'
    },
    wired: {
        label: "Wired",
        color:'#95dfd8'
    },
    not_associated: {
        label: "Not Associated",
        color:'#FD8E5F'
    },
    hotspots:{
      label:'Hotspots',
      color:'#FAABAD'
    },
    neighbor:{
      label:'Neighbor',
      color:'#ceae7e'
    },
    infrastructure:{
      label:'Infrastructure',
      color:'#067c97'
    }
};

export function getDeviceConnectivityData(data) {

  return dispatch => {
    dispatch(getDeviceConnectivityDataHasStarted());
    let options = {
      headers: Object.assign({'Content-Type': 'application/json'})
    };
    axios.post(rest.GET_DEVICE_CONNECTIVITY_DATA,data,options)
    .then(function (response) {
      ////console.log("response",response)
      dispatch(getDeviceConnectivityDataHasFinished());
      if(response.data){
        let data=[],trend=[]
        if(Array.isArray(response.data.data)){
          data=response.data.data[0].keys;
        }else{
          data=response.data.data.keys
        }
        trend=response.data['trend-detail'];

        //formatDeviceConnectivityData(trend)
        dispatch(setDeviceConnectivityData(formatDeviceConnectivityData(trend)));
      }else{
        dispatch(setDeviceConnectivityData([]));
      //  dispatch(setDeviceTypes([]));
      }

    })
    .catch(function (error) {
      dispatch(showError("Unable to get device ownership comnectivity data"));
    });
  }

}

export function getDeviceOwnershipData(data) {

  return (dispatch) => {
    dispatch(getDeviceOwnershipDataHasStarted());
    let options = {
      headers: Object.assign({'Content-Type': 'application/json'})
    };
    axios.post(rest.GET_DEVICE_OWNERSHIP_DATA,data,options)
    .then(function (response) {
      ////console.log("response",response)
      dispatch(getDeviceOwnershipDataHasFinished());
      if(response.data){
        let data=[],trend=[]
        if(Array.isArray(response.data.data)){
          data=response.data.data[0].keys;
        }else{
          data=response.data.data.keys
        }
        trend=response.data['trend-detail'];
        //console.log("data",data)
        //formatDeviceOwnershipData(data);
        dispatch(setDeviceOwnershipData(formatDeviceOwnershipData(data)));
        dispatch(setDeviceOwnershipTrendData(formatTrendData(trend)));
      }else{
        dispatch(setDeviceOwnershipData([]));
      //  dispatch(setDeviceTypes([]));
      }

    })
    .catch((error) => {
          if(error.response && error.response.data.errorno === 1) {
              window.sessionStorage.removeItem('user');
              window.location = '/login';
          }
          console.error('Could not get All Discovery ownership');
      });

  }

}

function formatDeviceOwnershipData(keys){
  let min=d3.min(keys, function(d) {return d.count;});
  let max = d3.max(keys, function(d) {return d.count;});
  var x = d3.scaleLinear().domain([min, max]).range([5, 100]);

  let ownershipData=[];
  keys.forEach(function(key){
    //let label=device.key;
    //let color ='#000
    let label=(mnemonics[key.key])?mnemonics[key.key].label:(key.key=="")? "Unknown":key.key;
    let color=(mnemonics[key.key])?mnemonics[key.key].color:(key.key=="")? "#ff8d6d":'#000';
    console.log(mnemonics[key.key],"label ",label,x(key.count))
     if(min < (max * .05)){
      ownershipData.push({key: key.key, name:label,color:color,count:key.count,value:x(key.count)});
    }else{
      ownershipData.push({key: key.key, name:label,color:color,count:key.count, value:key.count});
    }
  });
//  console.log("ownershipData ",ownershipData);
  return ownershipData;

}


function formatTrendData(trend){
 let series={},trendData=[];
  //console.log("trend ",trend);

  trend.forEach(function(t){

    t.keys.forEach(function(key){
      if(series[key.key]){
        series[key.key].data.push([new Date(t.timestamp).getTime()-(new Date(t.timestamp).getTimezoneOffset()*60*1000),key.count]);
      }else{
        let label=(mnemonics[key.key])?mnemonics[key.key].label:key.key;
        let color=(mnemonics[key.key])?mnemonics[key.key].color:"#ccc";
          series[key.key]={name:label,color:color,data:[[new Date(t.timestamp).getTime()-(new Date(t.timestamp).getTimezoneOffset()*60*1000),key.count]],"type":"areaspline","tooltip":{"valueDecimals":0}}
      }
    });

  });

  trendData= Object.values(series);
  //console.log("trendData ",trendData);

 return trendData;
}


function formatDeviceConnectivityData(trend){
let deviceConnectivityData={};
let deviceConnectivityChartData={unmanaged:[],managed:[]};
let max={},min={};

trend.forEach(function(t){

  t.keys.forEach(function(key){
    if(!deviceConnectivityData[key.item]){
      deviceConnectivityData[key.item]={
            "guest":{id:"guest",name:"Guest",color:"#B4E6EF",data:[],"type":"area","tooltip":{"valueDecimals":0}},
            "corporate":{id:"corporate",name:"Wifi",color:"#3dbfdf",data:[],"type":"area","tooltip":{"valueDecimals":0}},
            "wired":{id:"wired",name:"Wired",color:"#95dfd8",data:[],"type":"area","tooltip":{"valueDecimals":0}},
            "not_associated":{id:"not_associated",name:"Not Associated",color:"#FD8E5F",data:[],"type":"area","tooltip":{"valueDecimals":0}},
            "hotspots":{id:"hotspots",name:"Hotspots",color:"#FAABAD",data:[],"type":"area","tooltip":{"valueDecimals":0}},
            "neighbor":{id:"neighbor",name:"Neighbor",color:"#ceae7e",data:[],"type":"area","tooltip":{"valueDecimals":0}}
          }
        }
      key.keys.forEach(function(k){
          if(k.key =='not_associated'||k.key =='hotspots' ||k.key =='neighbor' ){
            if(!min[key.item])min[key.item]=0;
            if(k.count >  min[key.item]) min[key.item] =k.count
          deviceConnectivityData[key.item][k.key].data.push([new Date(t.timestamp).getTime(),-k.count])

          }else{
            if(!max[key.item])max[key.item]=0;
            if(k.count >  max[key.item]) max[key.item] =k.count
            deviceConnectivityData[key.item][k.key].data.push([new Date(t.timestamp).getTime(),k.count])
          }

        })

  });
});
    for(let key in deviceConnectivityData){
      max[key]=(max[key]>min[key])?max[key]:min[key];
      deviceConnectivityChartData[key].data=Object.values(deviceConnectivityData[key]);
      deviceConnectivityChartData[key].yRange=Math.ceil(max[key]/Math.pow(10,getlength(max[key])-1))*(Math.pow(10,getlength(max[key])-1));
    }




  console.log(max);
   ////console.log("ownershipConnectivityData ",deviceConnectivityChartData);
    return deviceConnectivityChartData;
}

function getlength(number) {
  return number.toString().length;
}

function setDeviceOwnershipData(data) {
    return {
        type: "GET_DEVICE_OWNERSHIP_DATA",
        data
    };
}

function getDeviceConnectivityDataHasStarted() {
    return {
        type: 'GET_DEVICE_CONNECTIVITY_DATA_HAS_STARTED'
    }
}

function getDeviceConnectivityDataHasFinished() {
    return {
        type: 'GET_DEVICE_CONNECTIVITY_DATA_HAS_FINISHED'
    }
}

function getDeviceOwnershipDataHasStarted() {
    return {
        type: 'GET_DEVICE_OWNERSHIP_DATA_HAS_STARTED'
    }
}

function getDeviceOwnershipDataHasFinished() {
    return {
        type: 'GET_DEVICE_OWNERSHIP_DATA_HAS_FINISHED'
    }
}

function setDeviceOwnershipTrendData(data) {
  ////console.log("deviceTypes Trend",data);

  return {
    type: "GET_DEVICE_OWNERSHIP_TREND_DATA",
    data
  };
}

function setDeviceConnectivityData(data){
  //console.log("deviceConnectivityData ",data);
    return {
        type: "GET_DEVICE_CONNECTIVITY_DATA",
        data
    };
}

function showError(error){
    return {
        type: "SHOW_ERROR",
        error
    };
}
