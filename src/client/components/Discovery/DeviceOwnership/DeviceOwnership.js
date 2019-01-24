import React from 'react'
import Highcharts from 'react-highcharts'
import HighchartsMore from 'highcharts-more'
import SolidGuage from 'highcharts-solid-gauge'
import Exporting from 'highcharts-exporting'
import * as RB from 'react-bootstrap'
import ReactDOM from 'react-dom';
import DeviceOwnershipBubbles from  './DeviceOwnershipBubbles';
import DeviceOwnershipTrendChart from './DeviceOwnershipTrendChart';
import DeviceConnectivityChart from './DeviceConnectivityChart';
import DeviceTypesChart from '../DeviceTypes/DeviceTypesChart';
import {Checkbox,Glyphicon} from 'react-bootstrap';
import { connect } from 'react-redux';
import Delay from 'react-delay';
import _isEqual from 'lodash/isEqual';
import moment from 'moment';
import {getDeviceOwnershipData} from './deviceOwnershipActions' ;
import {getDeviceConnectivityData} from './deviceOwnershipActions' ;
import './DeviceOwnership.scss';
import Utility from '../../common/utils/Utility';

let ReactHighstock = require('react-highcharts/ReactHighstock.src');

class DeviceOwnership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceOwnershipData: [],
            deviceConnectivityData:{"unmanaged":{"data":[],"yRange":0},"managed":{"data":[],"yRange":0}},
            managedDevicesCheckBoxFlag: [1, 1, 1, 1, 1, 1],
            unmanagedDevicesCheckBoxFlag: [1, 1, 1, 1, 1, 1]

        },
        HighchartsMore(Highcharts.Highcharts)
        SolidGuage(Highcharts.Highcharts)
        Exporting(Highcharts.Highcharts)


    }

    addUnmanagedDevice(index) {
      let chart = this.refs.unmanagedDeviceChart.refs.chart.getChart();
        let series = chart.series;
        series[index].show();
        let unmanagedDevicesCheckBoxFlag = this.state.unmanagedDevicesCheckBoxFlag.slice() //copy the array
        unmanagedDevicesCheckBoxFlag[index] = 1 //execute the manipulations
        this.setState({unmanagedDevicesCheckBoxFlag: unmanagedDevicesCheckBoxFlag}) //set the new state
    }

    removeUnmanagedDevice(index) {
        let chart = this.refs.unmanagedDeviceChart.refs.chart.getChart();
        //console.log(chart);
        let series = chart.series;
        series[index].hide();
        let unmanagedDevicesCheckBoxFlag = this.state.unmanagedDevicesCheckBoxFlag.slice() //copy the array
        unmanagedDevicesCheckBoxFlag[index] = 0 //execute the manipulations
        this.setState({unmanagedDevicesCheckBoxFlag: unmanagedDevicesCheckBoxFlag}) //set the new state
        //console.log(this.state.unmanagedDevicesCheckBoxFlag);

    }

    addManagedDevice(index) {
        let chart = this.refs.managedDeviceChart.refs.chart.getChart();
        let series = chart.series;
        series[index].show();
        let managedDevicesCheckBoxFlag = this.state.managedDevicesCheckBoxFlag.slice() //copy the array
        managedDevicesCheckBoxFlag[index] = 1 //execute the manipulations
        this.setState({managedDevicesCheckBoxFlag: managedDevicesCheckBoxFlag}) //set the new state
        //console.log(this.state.managedDevicesCheckBoxFlag);
      }
    removeManagedDevice(index) {
        let chart = this.refs.managedDeviceChart.refs.chart.getChart();
        let series = chart.series;
        series[index].hide();
        let managedDevicesCheckBoxFlag = this.state.managedDevicesCheckBoxFlag.slice() //copy the array
        managedDevicesCheckBoxFlag[index] = 0 //execute the manipulations
        this.setState({managedDevicesCheckBoxFlag: managedDevicesCheckBoxFlag}) //set the new state
        //console.log(this.state.managedDevicesCheckBoxFlag);

    }

    constructObjectAndCallJAX(props) {
        try {
          const obj = Utility.createQueryStringObject(props, 'ownership');
          console.log(this.props);
          this.props.getDeviceOwnershipData(obj);
          const obj1=Object.assign({},obj,{type:"connectivity,asset"});
          this.props.getDeviceConnectivityData(obj1)
            //this.props.getDeviceTypes(Utility.createQueryStringObject(props, 'category'));
        } catch (err) {
            console.log(err);
        }
    }



    componentWillReceiveProps(props) {
        if (
            props.filter !== this.props.filter ||
            props.interval !== this.props.interval ||
            props.starttime !== this.props.starttime ||
            props.endtime !== this.props.endtime||
            props.noiseFilter !== this.props.noiseFilter

        ) {
            this.constructObjectAndCallJAX(props);
        }

        if (!_isEqual(props, this.state)) {
            this.setState(props);
        }
    }

componentWillMount() {
    this.constructObjectAndCallJAX(this.props);
}


render(){
    let bubbleChartData=[{"cat":"visitor","count":200,"color":'#2A92A6'},{"cat":"unmanaged","count":600,"color":'#8D9A9F'},{"cat":"Transiant","count":150,"color":'#0F655F'},{"cat":"Managed","count":250,"color":'#00C0E0'}]
    let data1=[20,30,50,10,140,20];
    let data2=[170,90,10,70,10,20];
    return (
        <section className="subcontainer">
            <RB.Row>
                <RB.Col md={4} lg={4} sm={4} className="col1">
                </RB.Col>
                <RB.Col md={4} lg={4} sm={4} className="col2">
                    <Delay wait={50}>
                    <div>{/*<DeviceTypesChart data={this.state.deviceOwnershipData} />*/}<DeviceOwnershipBubbles data={this.state.deviceOwnershipData} history={this.props.history}/></div>
                </Delay>
                </RB.Col>
                <RB.Col md={4} lg={4} sm={4} >
                    <div className="test">
                        <DeviceOwnershipTrendChart data={this.state.deviceOwnershipTrendData} />
                        <Delay wait={500}>
                            <ul className="device-type-legends">
                            {this.state.deviceOwnershipData.map((device) =>{ var st={backgroundColor:device.color}; return <li  key={device.name} className="wifi" ><span className="legend" style={st}></span>{device.name}</li>})}
                            </ul>
                        </Delay>
                    </div>
                </RB.Col>
            </RB.Row>
            <RB.Row>
                    <RB.Col md={4} lg={4} sm={4} className="col1">
                        <p></p>
                    </RB.Col>
                    <RB.Col md={4} lg={4} sm={4} className="col2">
                        <Delay wait={500}>
                            <div className="deviceManufacturerChart">
                                <DeviceConnectivityChart data={this.state.deviceConnectivityData["unmanaged"]} ref="unmanagedDeviceChart"/>
                            </div>
                        </Delay>
                    </RB.Col>
                    <RB.Col md={4} lg={4} sm={4}>
                        <div className="deviceTypesCheckBoxes">
                        {this.state.deviceConnectivityData["unmanaged"].data.map((c,i)=>{

                          return(
                            <div key={c.id} className={(c.data.length>0)?'show':'disabled'}>
                          <div className={(this.state.unmanagedDevicesCheckBoxFlag[i]) ? 'active' : 'inactive'}>
                              <Glyphicon glyph="check" onClick={() => this.removeUnmanagedDevice(i)}/>
                              <span className={c.id} >{c.name}</span>
                          </div>
                          <div className={(!this.state.unmanagedDevicesCheckBoxFlag[i]) ? 'active' : 'inactive'}>
                              <Glyphicon glyph="unchecked" onClick={() => this.addUnmanagedDevice(i)}/>
                              <span className={c.id} >{c.name}</span>
                          </div>
                          </div>)
                        })}
                        </div>



                    </RB.Col>
                </RB.Row>
                <RB.Row>
                    <RB.Col md={4} lg={4} sm={4} className="col1">
                    </RB.Col>
                    <RB.Col md={4} lg={4} sm={4} className="col2">
                        <Delay wait={500}>
                            <div className="deviceOsChart">
                             <DeviceConnectivityChart data={this.state.deviceConnectivityData["managed"]} ref="managedDeviceChart"/>
                            </div>
                        </Delay>
                    </RB.Col>
                    <RB.Col md={4} lg={4} sm={4}>
                    <div className="deviceTypesCheckBoxes">
                    {this.state.deviceConnectivityData["managed"].data.map((c,i)=>{
                      return(
                        <div key={c.id} className={(c.data.length>0)?'show':'disabled'}>
                      <div className={(this.state.managedDevicesCheckBoxFlag[i]) ? 'active' : 'inactive'}>
                          <Glyphicon glyph="check" onClick={() => this.removeManagedDevice(i)}/>
                          <span className={c.id}>{c.name}</span>
                      </div>
                      <div className={(!this.state.managedDevicesCheckBoxFlag[i]) ? 'active' : 'inactive'}>
                          <Glyphicon glyph="unchecked" onClick={() => this.addManagedDevice(i)}/>
                          <span className={c.id} >{c.name}</span>
                      </div>
                      </div>)
                    })}
                    </div>
                    </RB.Col>
                </RB.Row>
            </section>
        )
    }
}

const mapStateToProps = (state) => {

  return {
    deviceOwnershipData:state.deviceOwnershipReducer.deviceOwnershipData,
    deviceOwnershipTrendData:state.deviceOwnershipReducer.trendData,
    deviceConnectivityData:state.deviceOwnershipReducer.deviceConnectivityData,
    noiseFilter: state.globalFiltersReducer.noiseFilter,
    filter: state.deviceSummaryReducer.filter,
    interval: state.globalFiltersReducer.interval,
    starttime: state.globalFiltersReducer.starttime,
    endtime: state.globalFiltersReducer.endtime
  };

}

const mapDispatchToProps = (dispatch) => {
  return {
    getDeviceOwnershipData: (obj) => dispatch(getDeviceOwnershipData(obj)),
    getDeviceConnectivityData:(obj)=>dispatch(getDeviceConnectivityData(obj))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceOwnership);
