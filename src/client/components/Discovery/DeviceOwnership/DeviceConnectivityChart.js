import React, { Component } from 'react';
import Highcharts from 'react-highcharts'
import HighchartsMore from 'highcharts-more';
import moment from 'moment';

let ReactHighstock = require('react-highcharts/ReactHighstock.src');
let configOptions={};

class DeviceConnectivityChart extends React.Component {

  constructor(props) {
    super(props);
    this.state={};

  }



render(){
  console.log(this.props)
  let {data}=this.props;
  configOptions={
      "chart": {
          backgroundColor: '#ffffff',
          height: 300,
      }, rangeSelector: {
          enabled: false
      },
      navigator: {
          enabled: false
      },
      scrollbar: {
          enabled: false
      },

      tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b><br/>',
          formatter: function () {
              var s = '<span style="font-size: 10px">' + moment(this.x).format('LLLL')  + '</span>';

              this.points.forEach(function (point) {
                  s += '<br/><span style="color:' + point.color + '">\u25CF</span>: ' + point.series.name + ': ' + Math.abs(point.y);
              });

              return s;
          },
          shared: true
      },

      title: {
          text: ''
      },
      series: [],
      yAxis: [{
          opposite: false,
          labels: {
              formatter: function () {
                  var val = this.value
                  if (val < -1)
                      val = val * -1;

                  return val;
              }
          },
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          gridLineColor: 'transparent',
          min:-data.yRange,
          max:data.yRange
      },
          {
              title: {
                  enabled: true,
                  text: 'Corp Network | Out of Network',
                  style: {
                      fontWeight: 'normal'
                  }
              }
          }],
      xAxis: {
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
      }
  };


    ////console.log("Device  Manufacturers Chart ",data)

if(data){
  //console.log(data);
  configOptions.series=data.data;
}


console.log("configOptions",configOptions)

  return (
    <ReactHighstock config={configOptions}  ref="chart">b</ReactHighstock>
  );
}

}

export default (DeviceConnectivityChart);
