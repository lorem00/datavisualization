import React, {Component} from 'react';
import Highcharts from 'react-highcharts';
import {connect} from 'react-redux';
import {getDeviceTypesData} from './deviceTypesActions';
import {History, Router, Route} from 'react-router';

let ReactTreeMap = require('react-highcharts');


var HighchartsMore = require('highcharts-treemap');
HighchartsMore(ReactTreeMap.Highcharts);


class DeviceTypesChart extends React.Component {

  constructor(props) {
    super(props);


  }

  componentWillReceiveProps(props) {
    console.log(props);
    if (props.data) {
      let {data}=props;
    }
  }


  render() {
    console.log(this.props);
    let {getDeviceTypesData, deviceTypes, page,history}=this.props;

    let config = {
      chart: {
        backgroundColor: "#ffffff"
      },
      series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: this.props.data,
        events: {
          click: function (event) {
            console.log(event.point.key);
            if (event.point.key == 'Others') {
              page++;
              getDeviceTypesData(deviceTypes, page);
            }else{

              history.push("/type/"+event.point.key);
            }

          }
        }
      }
    ],
    plotOptions: {
      series: {
        cursor: 'pointer'}
      },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.count:,.0f}</b><br/>',
          shared: true
        },
        title: {
          text: ''
        },
        exporting: {enabled: false}
      };
      var deviceTypesLink = [];
      if (page > 1) {
        deviceTypesLink.push(<span className='devices-link'
        onClick={() => this.props.getDeviceTypesData(deviceTypes, 1)}>Device Types </span>);

      }

      var othersLink = [];
      for (var i = 0; i < (page - 1); i++) {
        var pageIndex = i + 1
        if (i == (page - 2)) {
          othersLink.push(<span className='devices-link' key={i}> > Others</span>);
        }
        else {
          othersLink.push(<span className='devices-link' key={i}
          onClick={() => this.props.getDeviceTypesData(deviceTypes, pageIndex)}> > Others</span>);
        }
      }

      ReactTreeMap.Highcharts.setOptions({lang:{thousandsSep: ','}});


      return (

        <div>
        <span className="breadcrumbs"> {deviceTypesLink} {othersLink}</span>
        <ReactTreeMap config={config} ref="chart2">b</ReactTreeMap>
        </div>

      );
    }
  }


  const mapStateToProps = (state) => {

    return {
      deviceTypesData: state.deviceTypesReducer.deviceTypesData,
      deviceTypes: state.deviceTypesReducer.deviceTypes,
      page: state.deviceTypesReducer.page,
    };

  }

  const mapDispatchToProps = (dispatch) => {
    return {
      getDeviceTypesData: (devices, page) => dispatch(getDeviceTypesData(devices, page))
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(DeviceTypesChart);
