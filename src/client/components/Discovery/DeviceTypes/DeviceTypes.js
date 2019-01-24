import React, { Component } from 'react';
import Highcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import SolidGuage from 'highcharts-solid-gauge';
import Exporting from 'highcharts-exporting';
import * as RB from 'react-bootstrap';
import { connect } from 'react-redux';
import Delay from 'react-delay';
import _isEqual from 'lodash/isEqual';
import { getDeviceOs, getDeviceTypes, getDeviceManufacturers } from './deviceTypesActions';
import Utility from '../../common/utils/Utility';
import './DeviceTypes.scss';
import DeviceTypesTrendChart from './DeviceTypesTrendChart';
import DeviceTypesChart from './DeviceTypesChart';
import DeviceManufacturerChart from './DeviceManufacturerChart';
import DeviceOSChart from './DeviceOSChart';


class DeviceTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceTypes: [],
            deviceTypesData: [],
        };
        HighchartsMore(Highcharts.Highcharts);
        SolidGuage(Highcharts.Highcharts);
        Exporting(Highcharts.Highcharts);
    }

    componentWillMount() {
        this.constructObjectAndCallJAX(this.props);
    }

    componentWillReceiveProps(props) {
        if (
            props.filter !== this.props.filter ||
            props.interval !== this.props.interval ||
            props.starttime !== this.props.starttime ||
            props.endtime !== this.props.endtime ||
            props.noiseFilter !== this.props.noiseFilter
        ) {
            this.constructObjectAndCallJAX(props);
        }

        if (!_isEqual(props, this.state)) {
            this.setState(props);
        }
    }

    constructObjectAndCallJAX(props) {
        try {
            const obj = Utility.createQueryStringObject(props, 'type');
            this.props.getDeviceTypes(obj);

            const obj2 = Object.assign({}, obj, { type: 'manufacturer' });
            this.props.getDeviceManufacturers(obj2);

            const obj3 = Object.assign({}, obj, { type: 'os' });
            this.props.getDeviceOs(obj3);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <section className="subcontainer">
                <RB.Row>
                    <RB.Col md={4} lg={4} sm={4} className="col1">
                        <h5></h5>
                    </RB.Col>
                    <RB.Col md={4} lg={4} sm={4} className="col2">
                      <Delay wait={50}>
                    <div><DeviceTypesChart data={this.state.deviceTypesData} history={this.props.history} /></div>
                      </Delay>
                    </RB.Col>
                    <RB.Col md={4} lg={4} sm={4} >
                        <Delay wait={50}>
                            <div className="test">
                                <DeviceTypesTrendChart data={this.state.DeviceTypesTrendData} />
                            </div>
                        </Delay>
                        <Delay wait={500}>
                            <ul className="device-type-legends">

                                {this.state.deviceTypesData.map((device) => { const st = { backgroundColor: device.color }; return <li key={device.key} className="wifi" ><span className="legend" style={st} />{device.name}</li>; })}

                            </ul>
                        </Delay>
                    </RB.Col>
                </RB.Row>
                <RB.Row>
                    <RB.Col md={4} lg={4} sm={4} className="col1">
                        <h5><strong></strong></h5>
                    </RB.Col>
                    <RB.Col md={4} lg={4} sm={4} className="col2">
                    <Delay wait={500}>
                    <div className="deviceManufacturerChart">
                      <DeviceManufacturerChart chartId="deviceManufacturerChart" data={this.state.deviceManufacturersChartData} history={this.props.history}/>
                    </div>
                    </Delay>
                    </RB.Col>
                    <RB.Col md={4} lg={4} sm={4}>
                    </RB.Col>
                </RB.Row>
                <RB.Row>
                    <RB.Col md={4} lg={4} sm={4} className="col1">
                        <h5><strong></strong></h5>
                    </RB.Col>
                    <RB.Col md={4} lg={4} sm={4} className="col2">
                        <Delay wait={500}>
                            <div className="deviceOsChart">
                                <DeviceOSChart chartId="deviceOsChart" data={this.state.deviceOSChartData}/>
                            </div>
                        </Delay>
                    </RB.Col>
                    <RB.Col md={4} lg={4} sm={4}>
                    </RB.Col>
                </RB.Row>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    filter: state.deviceSummaryReducer.filter,
    noiseFilter: state.globalFiltersReducer.noiseFilter,
    interval: state.globalFiltersReducer.interval,
    starttime: state.globalFiltersReducer.starttime,
    endtime: state.globalFiltersReducer.endtime,
    deviceTypes: state.deviceTypesReducer.deviceTypes,
    deviceTypesData: state.deviceTypesReducer.deviceTypesData,
    deviceManufacturers: state.deviceTypesReducer.deviceManufacturers,
    deviceManufacturersChartData: state.deviceTypesReducer.deviceManufacturersChartData,
    deviceOs: state.deviceTypesReducer.deviceOs,
    deviceOSChartData: state.deviceTypesReducer.deviceOSChartData,
    DeviceTypesTrendData: state.deviceTypesReducer.trendData,
})

const mapDispatchToProps = dispatch => ({
    getDeviceTypes: obj => dispatch(getDeviceTypes(obj)),
    getDeviceManufacturers: obj => dispatch(getDeviceManufacturers(obj)),
    getDeviceOs: obj => dispatch(getDeviceOs(obj)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTypes);
