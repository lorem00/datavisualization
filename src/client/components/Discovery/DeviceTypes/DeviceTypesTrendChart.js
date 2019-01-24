import React, { Component } from 'react';
import Highcharts from 'react-highcharts'
import HighchartsMore from 'highcharts-more'
let ReactHighstock = require('react-highcharts/ReactHighstock.src');
let configOptions={};

class DeviceTypesTrendChart extends React.Component {

  constructor(props) {
    super(props);
    this.state={};

  }



render(){

  let {data}=this.props;
  configOptions={
    chart: {
        backgroundColor: '#ffffff',
    },
    title: {
        text: '',
        marginTop: -10,
    },
    rangeSelector: {
        selected: 4,
        inputEnabled: false,
        buttonTheme: {
            visibility: 'hidden'
        },
        labelStyle: {
            visibility: 'hidden'
        }
    },
    plotOptions: {},
    series: []
  };


    //console.log("Device  Manufacturers Chart ",data)

if(data){
  console.log(data);
  configOptions.series=data;
}


console.log("configOptions",configOptions)
ReactHighstock.Highcharts.setOptions({lang:{thousandsSep: ','}});

  return (
    <ReactHighstock config={configOptions} ref="chart3" >b</ReactHighstock>
  );
}

}

export default (DeviceTypesTrendChart);
