import React, { Component } from 'react';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';
import {
    getDeviceSummary,
    setFilter
} from './deviceSummaryActions';

import Chart from './Chart';
import Utility from './../../common/utils/Utility';
import {Grid, Row, Col, Button, Glyphicon, Nav, NavDropdown, MenuItem, NavItem, DropdownButton} from 'react-bootstrap';

class DeviceSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            devices: { ...this.props.devices },
            chartData: {}
        };
    }

    componentWillMount() {
        console.log("props",this.props);
        this.constructObjectAndCallJAX(this.props);
        console.log("props",this.props);

    }

    constructObjectAndCallJAX(props) {
        try {
            this.props.getDeviceSummary(Utility.createQueryStringObject(props, 'summary'));
        } catch (err) {
            console.log(err);
        }
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

    getTrendIconFor(type) {
        let classz = '';
        if(this.props.trends === undefined) {
            console.warn("Trend up/down info is missing in device summary");
        } else if(this.props.trends[type] === undefined){
            console.warn("Trend up/down info is missing in device summary");
        } else if (this.props.trends[type] > 0){
            classz = 'wootcloud-up_arrow';
        } else if(this.props.trends[type] < 0){
            classz = 'wootcloud-down_arrow';
        } else if(this.props.trends[type] === 0){
            console.warn(`0 trend in summary for ${type}`);
        }
        return classz;
    }

    render() {
        let {devices, trends, chartData, filter} = this.props;
        let devicesView = [], chartDataV = {}, trendsV = [], trendDetailsV = {};
        if (!trends) {
            trends = {
                "total": 0,
                "new": 0,
                "managed": 0,
                "unmanaged": 0
            }
        }

        return (

            <div className="summary-container">
                <div
                  className={filter === 'total' ? 'summary active' : 'summary'}
                  onClick={() => this.props.setFilter('total')}
                >
                    <span className="trend">
                        <i className={this.getTrendIconFor('total')}/>
                    </span>
                    <span className="stats">{Utility.strumberify(devices.total || 0)}</span>
                    <span className="trend-chart">
                        <Chart chartId="totalChart" data={chartData.total}/>
                    </span>
                    <div className="summary-title">Total Devices</div>
                </div>
                <div className={filter == 'managed' ? 'summary active' : 'summary'}
                     onClick={() => this.props.setFilter('managed') }>
                    <span className="trend">
                        <i className={this.getTrendIconFor('managed')}/>
                    </span>
                    <span className="stats">{Utility.strumberify(devices.managed)}</span>
                    <span className="trend-chart">
                        <Chart chartId="managedChart" data={chartData.managed}/>
                    </span>
                    <div className="summary-title">Managed Devices</div>
                </div>
                <div className={filter == 'unmanaged' ? 'summary active' : 'summary'}
                     onClick={() => this.props.setFilter('unmanaged') }>
                    <span className="trend">
                        <i className={this.getTrendIconFor('unmanaged')}/>
                    </span>
                    <span className="stats">{Utility.strumberify(devices.unmanaged)}</span>
                    <span className="trend-chart">
                        <Chart chartId="unmanagedChart" data={chartData.unmanaged} />
                    </span>
                    <div className="summary-title">Unmanaged Devices</div>
                </div>
                <div
                    className={filter == 'new' ? 'summary active' : 'summary'}
                    onClick={() => this.props.setFilter('new') }
                >
                    <span className="trend">
                        <i className={this.getTrendIconFor('new')} />
                    </span>
                    <span className="stats">{Utility.strumberify(devices.new)}</span>
                    <span className="trend-chart">
                        <Chart chartId="newChart" data={chartData.new} />
                    </span>
                    <div className="summary-title">New Devices</div>
                </div>
                <div  className={filter == 'automated' ? 'summary active' : 'summary'}
                     onClick={() => this.props.setFilter('automated')} >
                    <span className="trend">
                        <i className={this.getTrendIconFor('automated')}/>
                    </span>
                    <span className="stats">{Utility.strumberify(devices.automated)}</span>
                    <span className="trend-chart">
                        <Chart chartId="automatedChart" data={chartData.automated} />
                    </span>
                    <div className="summary-title">Automated Devices</div>
                </div>
                <div className="summary" className={filter == 'user' ? 'summary active' : 'summary'}
                     onClick={() => this.props.setFilter('user')}>
                    <span className="trend">
                        <i className={this.getTrendIconFor('user')}/>
                    </span>
                    <span className="stats">{Utility.strumberify(devices.user)}</span>
                    <span className="trend-chart">
                        <Chart chartId="usersChart" data={chartData.user} />
                    </span>
                    <div className="summary-title">User Devices</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        devices: state.deviceSummaryReducer.devices,
        trends: state.deviceSummaryReducer.trendData,
        chartData: state.deviceSummaryReducer.chartData,
        filter: state.deviceSummaryReducer.filter,
        noiseFilter: state.globalFiltersReducer.noiseFilter,
        interval: state.globalFiltersReducer.interval,
        starttime: state.globalFiltersReducer.starttime,
        endtime: state.globalFiltersReducer.endtime,
    };

}

const mapDispatchToProps = (dispatch) => {
    return {
        getDeviceSummary: (params) => dispatch(getDeviceSummary(params)),
        setFilter: (filter) => dispatch(setFilter(filter)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(DeviceSummary);
