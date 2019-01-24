import React, { Component } from 'react';
import d3  from 'd3';
let c3 =require("../../../assets/js/c3/c3.js");

class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state={};

  }
  componentWillReceiveProps(props) {
    if(props.data){
      if(props.data){
        let label=['data1'];
        let chart = c3.generate({
          bindto: '#'+props.chartId,
          data: {
            columns:[label.concat(props.data)],
            type: 'bar',
            labels: false
          },
          legend:{
            show: false
          },tooltip:{
            show: false
          },size:{
            height: 30,
            width: 30
          },axis:{
            x:{
              show:false
            },
            y:{
              show:false
            }
          },color:{
            pattern:['#000'],
          }
        });
      }
    }
  }

  componentDidMount(){

  }

  render() {


    return (
      <div id={this.props.chartId}></div>
    );
  }

}

export default (Chart);
