import React from "react";
import { connect } from "react-redux";
import Authorization from "../../../components/common/utils/Authorization";
import { getDeviceTopologyData } from "./deviceTopologyActions";
import { filterNodes } from "./deviceTopologyActions";
import { filterConnections } from "./deviceTopologyActions";
import * as RB from "react-bootstrap";
import DeviceTopologyChart from "./DeviceTopologyChart";
import moment from "moment-timezone";
import _isEqual from "lodash/isEqual";
import _findIndex from "lodash/findIndex";
import { Checkbox, Glyphicon } from "react-bootstrap";
import Highcharts from "react-highcharts";
import HighchartsMore from "highcharts-more";
import Delay from "react-delay";

import "./DeviceTopology.scss";

let ReactHighstock = require("react-highcharts/ReactHighstock.src");

class DeviceTopology extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeFilters: {},
            connectionFilters: {},
            nodefiltersFlag: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            connectionfiltersFlag: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            spatial: {
                chart: {
                    backgroundColor: "#f6f6f6"
                },
                title: { text: "", marginTop: -10 },
                rangeSelector: {
                    selected: 4,
                    inputEnabled: false,
                    buttonTheme: { visibility: "hidden" },
                    labelStyle: { visibility: "hidden" }
                },
                plotOptions: {},
                series: [
                    {
                        name: "Computer",
                        color: "#3dbfdf",
                        data: [
                            [1507766400000, 3],
                            [1508926011000, 50],
                            [1508954811000, 5],
                            [1509127611000, 15]
                        ],
                        type: "areaspline",
                        tooltip: { valueDecimals: 2 }
                    },
                    {
                        name: "Phone",
                        color: "#95dfd8",
                        data: [
                            [1507766400000, 28],
                            [1508926011000, 1],
                            [1508954811000, 19],
                            [1509127611000, 29]
                        ],
                        type: "areaspline",
                        tooltip: { valueDecimals: 2 }
                    }
                ],
                marker: {
                    enabled: null, // auto
                    radius: 3,
                    lineWidth: 1,
                    lineColor: "#FFFFFF"
                },
                xAxis: {
                    events: {
                        setExtremes: function(e) {
                            console.log(
                                new Date(e.min) + " - " + new Date(e.max)
                            );
                            if (typeof e.rangeSelectorButton !== "undefined") {
                                alert(
                                    "count: " +
                                        e.rangeSelectorButton.count +
                                        "text: " +
                                        e.rangeSelectorButton.text +
                                        " type:" +
                                        e.rangeSelectorButton.type
                                );
                            }
                        }
                    }
                }
            },
            filterCounts: 0
        };
    }

    componentWillMount() {
        this.constructObjectAndCallJAX(this.props);
    }

    addFilter(filters, prop, val) {
        if (filters[prop]) {
            if (filters[prop] != val) {
                var prevVal = filters[prop];
                if (!Array.isArray(filters[prop])) {
                    filters[prop] = [prevVal, val];
                } else {
                    if (!filters[prop].includes(val)) {
                        filters[prop].push(val);
                    }
                }
            }
        } else {
            filters[prop] = val;
        }

        return filters;
    }

    removeFilter(filters, prop, val) {
        if (Array.isArray(filters[prop])) {
            var index = filters[prop].indexOf(val);
            if (index > -1) {
                filters[prop].splice(index, 1);
                if (filters[prop].length === 1) {
                    filters[prop] = filters[prop][0];
                }
            }
        } else {
            if (filters[prop] == val) {
                delete filters[prop];
            }
        }
        return filters;
    }

    addNodeFilter(prop, val, filterIndex) {
        console.log(prop, val, filterIndex);
        let nodefiltersFlag = this.state.nodefiltersFlag.slice(); //copy the array
        nodefiltersFlag[filterIndex] = 0; //execute the manipulations
        this.setState({ nodefiltersFlag: nodefiltersFlag }); //
        var nodeFilters = this.addFilter(this.state.nodeFilters, prop, val);
        var nodeFiltersVal = Object.assign(
            {},
            this.state.nodeFilters,
            nodeFilters
        );
        this.setState({ nodeFilters: nodeFiltersVal });
        this.filterNodes(nodeFiltersVal);
    }

    removeNodeFilter(prop, val, filterIndex) {
        let nodefiltersFlag = this.state.nodefiltersFlag.slice(); //copy the array
        nodefiltersFlag[filterIndex] = 1; //execute the manipulations
        this.setState({ nodefiltersFlag: nodefiltersFlag }); //
        if (this.state.nodeFilters[prop]) {
            var nodeFiltersVal = this.removeFilter(
                Object.assign({}, this.state.nodeFilters),
                prop,
                val
            );
            this.setState({ nodeFilters: nodeFiltersVal });
            this.filterNodes(nodeFiltersVal);
        }
    }

    addConnectionFilter(prop, val, filterIndex) {
        let connectionfiltersFlag = this.state.connectionfiltersFlag.slice(); //copy the array
        connectionfiltersFlag[filterIndex] = 0; //execute the manipulations
        this.setState({ connectionfiltersFlag: connectionfiltersFlag }); //

        var connectionFilters = this.addFilter(
            this.state.connectionFilters,
            prop,
            val
        );
        var connectionFiltersVal = Object.assign(
            {},
            this.state.connectionFilters,
            connectionFilters
        );
        this.setState({ connectionFilters: connectionFiltersVal });
        console.log("connectionFiltersVal", connectionFiltersVal);
        this.filterConnections(connectionFiltersVal);
    }

    removeConnectionFilter(prop, val, filterIndex) {
        //console.log(this.state);
        //console.log("removing connection filters",prop,val);
        let connectionfiltersFlag = this.state.connectionfiltersFlag.slice(); //copy the array
        connectionfiltersFlag[filterIndex] = 1; //execute the manipulations
        this.setState({ connectionfiltersFlag: connectionfiltersFlag }); //

        if (this.state.connectionFilters[prop]) {
            var connectionFiltersVal = this.removeFilter(
                Object.assign({}, this.state.connectionFilters),
                prop,
                val
            );
            this.setState({ connectionFilters: connectionFiltersVal });
            this.filterConnections(connectionFiltersVal);
        }
    }

    checkFilters(node, nodeFilters) {
      
        if (!node["filter"]) {
            return false;
        }
        for (var key in nodeFilters) {
            if (
                Array.isArray(nodeFilters[key]) &&
                !Array.isArray(node["filter"][key])
            ) {
                if (nodeFilters[key].includes(node["filter"][key]))
                    return false;
            } else if (
                Array.isArray(nodeFilters[key]) &&
                Array.isArray(node["filter"][key])
            ) {
                if (
                    _isEqual(
                        nodeFilters[key].sort(),
                        node["filter"][key].sort()
                    )
                )
                    return false;
                console.log(nodeFilters[key] + "---" + node["filter"][key]);
                if (
                    node["filter"][key].every(
                        elem => nodeFilters[key].indexOf(elem) > -1
                    )
                )
                    return false;
            } else {
                if (_isEqual(nodeFilters[key], node["filter"][key]))
                    return false;
            }
        }
        return true;
    }

    filterNodes(nodeFilters) {
        let data = { nodes: [], links: {} },removedNodes=[];
        console.log(this.props);
        if (
            Object.keys(nodeFilters).length === 0 &&
            nodeFilters.constructor === Object
        )
            data.nodes = this.props.topologyData.nodes;
        else
            data.nodes = this.props.topologyData.nodes.filter(node =>
                this.checkFilters(node, nodeFilters)
            );
            removedNodes=this.props.topologyData.nodes.filter(node =>
                !this.checkFilters(node, nodeFilters)
            );
        data.links = this.props.topologyData.links;
        console.log("filtered nodes data -", data);


        this.props.filterNodes(data);
    }

    filterConnections(connectionFilters) {
        let data = { nodes: [], links: {} };
        console.log(this.props.topologyData);
        let nodesToremove = [];
        if (
            Object.keys(connectionFilters).length === 0 &&
            connectionFilters.constructor === Object
        )
            data.links = this.props.topologyData.links;
        else
            data.links = this.props.topologyData.links.filter(link =>
                this.checkFilters(link, connectionFilters)
            );
        data.nodes = this.props.topologyData.nodes;
        console.log("filtered connections data -", data);
        this.props.filterConnections(data);
    }

    constructObjectAndCallJAX(props) {
        let obj = {
            starttime: moment
                .tz(props.starttime, "America/Los_Angeles")
                .utc()
                .format("YYYY-MM-DD[T]HH:mm:ss[-00:00]"),
            endtime: moment
                .tz(props.endtime, "America/Los_Angeles")
                .utc()
                .format("YYYY-MM-DD[T]HH:mm:ss[-00:00]")
        };
        console.log(obj);
        console.log(this.props);
        this.props.getDeviceTopologyData(obj);
    }

    componentWillReceiveProps(props) {
        console.log(props);

        if (
            props.starttime !== this.props.starttime ||
            props.endtime !== this.props.endtime
        ) {
            this.constructObjectAndCallJAX(props);
        }

        if (!_isEqual(props, this.state)) {
            this.setState(props);
        }
    }

    renderFilters(filters, type) {
        let filterIndex = {};
        var counter = 0;
        filterIndex[type] = counter;
        return Object.keys(filters).map((key, index) => {
            return (
                <div key={index} className="filter">
                    <div className="filter-name">{key}</div>
                    {filters[key].map(filter => {
                        counter++;
                        let filterIndex = counter;
                        if (
                            this.state.nodefiltersFlag[filterIndex] ===
                            undefined
                        ) {
                            let nodefiltersFlag = this.state.nodefiltersFlag.slice(); //copy the array
                            nodefiltersFlag[filterIndex] = 1; //execute the manipulations
                            this.setState({ nodefiltersFlag: nodefiltersFlag });
                        }
                        if (
                            this.state.connectionfiltersFlag[filterIndex] ===
                            undefined
                        ) {
                            let connectionfiltersFlag = this.state.connectionfiltersFlag.slice(); //copy the array
                            connectionfiltersFlag[filterIndex] = 1; //execute the manipulations
                            this.setState({
                                connectionfiltersFlag: connectionfiltersFlag
                            });
                        }
                        if (type == "node") {
                            return (
                                <div>
                                    <div
                                        className={
                                            this.state.nodefiltersFlag[
                                                filterIndex
                                            ]
                                                ? "active"
                                                : "inactive"
                                        }
                                    >
                                        {" "}
                                        <Glyphicon
                                            glyph="check"
                                            onClick={() =>
                                                this.addNodeFilter(
                                                    key,
                                                    filter,
                                                    filterIndex
                                                )
                                            }
                                        />{" "}
                                        <span className="guest">{filter}</span>
                                    </div>
                                    <div
                                        className={
                                            !this.state.nodefiltersFlag[
                                                filterIndex
                                            ]
                                                ? "active"
                                                : "inactive"
                                        }
                                    >
                                        {" "}
                                        <Glyphicon
                                            glyph="unchecked"
                                            onClick={() =>
                                                this.removeNodeFilter(
                                                    key,
                                                    filter,
                                                    filterIndex
                                                )
                                            }
                                        />{" "}
                                        <span className="guest">{filter}</span>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div>
                                    <div
                                        className={
                                            this.state.connectionfiltersFlag[
                                                filterIndex
                                            ]
                                                ? "active"
                                                : "inactive"
                                        }
                                    >
                                        {" "}
                                        <Glyphicon
                                            glyph="check"
                                            onClick={() =>
                                                this.addConnectionFilter(
                                                    key,
                                                    filter,
                                                    filterIndex
                                                )
                                            }
                                        />{" "}
                                        <span className="guest"> {filter}</span>
                                    </div>
                                    <div
                                        className={
                                            !this.state.connectionfiltersFlag[
                                                filterIndex
                                            ]
                                                ? "active"
                                                : "inactive"
                                        }
                                    >
                                        {" "}
                                        <Glyphicon
                                            glyph="unchecked"
                                            onClick={() =>
                                                this.removeConnectionFilter(
                                                    key,
                                                    filter,
                                                    filterIndex
                                                )
                                            }
                                        />{" "}
                                        <span className="guest">{filter}</span>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            );
        });
    }

    render() {
        let st = { backgroundColor: "#00C0E0" },
            st1 = { backgroundColor: "#44D5CA" };
        console.log(this.props);
        let { topologyChartData } = this.props;
        let { topologyChartFilters } = this.props;
        let nodeFiltersDisplay = [];

        console.log(topologyChartData);
        return (
            <section className="subcontainer">
                <RB.Row>
                    <RB.Col md={8} lg={8} sm={8} className="col1">
                        <Delay wait={1000}>
                            <DeviceTopologyChart data={topologyChartData} />
                        </Delay>
                    </RB.Col>
                    <RB.Col md={4} lg={4} sm={4} className="col1">
                        {/*  <Delay wait={500}>

              <ReactHighstock config=  {this.state.spatial} ref="chart2" >b</ReactHighstock>
                </Delay>*/}
                        <div>
                            <div>Nodes:</div>
                            {this.renderFilters(
                                topologyChartFilters.nodeFilters,
                                "node"
                            )}
                        </div>
                        <div>
                            <div>Connections:</div>
                            {this.renderFilters(
                                topologyChartFilters.connectionFilters,
                                "connections"
                            )}
                        </div>
                    </RB.Col>
                </RB.Row>
                <RB.Row>
                    <RB.Col md={8} lg={8} sm={8} className="col1" />
                    <RB.Col md={4} lg={4} sm={4} className="col1" />
                </RB.Row>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        topologyChartData: state.deviceTopologyReducer.topologyChartData,
        topologyData: state.deviceTopologyReducer.topologyData,
        topologyChartFilters: state.deviceTopologyReducer.topologyChartFilters,
        filter: state.deviceSummaryReducer.filter,
        interval: state.globalFiltersReducer.interval,
        starttime: state.globalFiltersReducer.starttime,
        endtime: state.globalFiltersReducer.endtime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDeviceTopologyData: params =>
            dispatch(getDeviceTopologyData(params)),
        filterNodes: params => dispatch(filterNodes(params)),
        filterConnections: params => dispatch(filterConnections(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    Authorization(DeviceTopology, ["CUSTOMER"])
);
