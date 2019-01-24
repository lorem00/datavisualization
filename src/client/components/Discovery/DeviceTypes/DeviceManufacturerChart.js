import React, { Component } from 'react';
import Highcharts from 'react-highcharts'
import HighchartsMore from 'highcharts-more'
let ReactHighchart = require('react-highcharts/ReactHighcharts.src');
let configOptions={};

class DeviceManufacturerChart extends React.Component {

  constructor(props) {
    super(props);
    this.state={};

  }



render(){

  let {data,history}=this.props;
  configOptions={
   chart: {
     type: 'bar',
    "backgroundColor":"#ffffff"
   },
   lang: {
      thousandsSep: ','
  },
   exporting: {
          enabled: false
   },

   title: {
     text: ''
   },
   xAxis: {
  //   categories: data.categories,
     gridLineWidth: 0,
    minorGridLineWidth: 0,

   },
   yAxis: {
     gridLineWidth: 0,
     minorGridLineWidth: 0,
     min: 0,
     title: {
       text: ''
     },
   },
   legend: {
      enabled: false
  },
  plotOptions: {
       series: {
           cursor: 'pointer',
           events: {
               click: function (event) {
                  console.log(event);
                  history.push("/manufacturer/"+event.point.category);

               }
           }
       },
       bar: {
            dataLabels: {
                enabled: true
            }
        }
   },

   series: [{
     name: 'Devices',
     //data:data.data
   }]
 };
    //console.log("Device  Manufacturers Chart ",data)

if(data){
  console.log(data);
  configOptions.xAxis.categories=data.categories;
  configOptions.series[0]={name:'Devices',data:data.data};
}

ReactHighchart.Highcharts.setOptions({lang:{thousandsSep: ','}});

console.log("configOptions",configOptions)

  return (
    <ReactHighchart config={configOptions} ref="chart3" >b</ReactHighchart>
  );
}

}

export default (DeviceManufacturerChart);
