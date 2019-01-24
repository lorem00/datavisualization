import React, { Component } from 'react';
import Highcharts from 'react-highcharts'
import HighchartsMore from 'highcharts-more'
let ReactHighchart = require('react-highcharts/ReactHighcharts.src');
let configOptions={}


class DeviceOSChart extends React.Component {

  constructor(props) {
    super(props);
    this.state={};

  }


render(){
  let {data}=this.props;

//if(data){
  let configOptions={
    chart: {
      type: 'column',
     "backgroundColor":"#ffffff"
    },
    exporting: {
           enabled: false
    },
    title: {
      text: ''
    },
    xAxis: {
    //  categories: data.categories,
      lineWidth: 0,
   minorGridLineWidth: 0,
   lineColor: 'transparent',

    },
    yAxis: {
      gridLineWidth: 0,
      minorGridLineWidth: 0,
      min: 0,
      title: {
        text: ''
      }
    },
    legend: {
       enabled: false
   },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'Devices',
    //  data: data.data
    //  data: [{y:5,color:'#2A92A6'},{y:3,color:'#94819E'}, {y:4,color:'#00C0E0'}, {y:7,color:'#00C0E0'}, {y:3,color:'#446F81'}]
      //color:'#2A92A6'
    }]
  };
  if(data){
    console.log(data);
    configOptions.xAxis.categories=data.categories;
    configOptions.series[0]={name:'Devices',data:data.data};
  }
//}

ReactHighchart.Highcharts.setOptions({lang:{thousandsSep: ','}});

  return (
    <ReactHighchart config={configOptions} ref="chart2" ></ReactHighchart>
  );
}

}

export default (DeviceOSChart);
