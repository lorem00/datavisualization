import React from 'react'
import Highcharts from 'react-highcharts'
import HighchartsMore from 'highcharts-more'
import SolidGuage from 'highcharts-solid-gauge'
import Exporting from 'highcharts-exporting'
import * as RB from 'react-bootstrap'
import Delay from 'react-delay'
import {getDiscoveryProtocols, getDiscoveryCategoryCounts} from './action'
import {connect} from 'react-redux'
import Authorization from '../../../components/common/utils/Authorization'
import moment from 'moment'
import Utility from './../../common/utils/Utility';
import {LinkContainer} from 'react-router-bootstrap'

let ReactHighstock = require('react-highcharts/ReactHighstock.src');

class DeviceFunctions extends React.Component {
    constructor(props) {
        super(props);
        HighchartsMore(Highcharts.Highcharts)
        SolidGuage(Highcharts.Highcharts)

        this.state = {
            user: 0,
            auto: 0,
            totalCount: 0,
            legends: [],
            mnemonics: {
                auto: {
                    label: "Automated",
                    color: '#95dfd8',
                },
                user: {
                    label: "User Driven",
                    color: '#3dbfdf'
                },
                computer: {
                    label: "Computer",
                    color: '#3dbfdf'
                },
                "networking_equipment": {
                    label: "Networking Equipment",
                    color: '#3dbfdf'
                },
                accessories: {
                    label: "Accessories",
                    color: '#3dbfdf'
                },
                Uncategorized: {
                    label: "Uncategorized",
                    color: '#3dbfdf'
                },
                "audio_video": {
                    label: "Audio/Video",
                    color: '#3dbfdf'
                },
                "low-power_computer": {
                    label: "Low Power Computer",
                    color: '#3dbfdf'
                },
                mobile_phone: {
                    label: "Cellphones",
                    color: '#3dbfdf'
                },
                printing: {
                    label: "Printers",
                    color: '#3dbfdf'
                },
                wootcloud: {
                    label: "WootCloud",
                    color: '#3dbfdf'
                },
            },
            protocols: {},
            spatial: {
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
            },
            col1: {
                chart: {
                    type: 'column',
                    backgroundColor: '#ffffff',
                    height: 200
                },
                exporting: {enabled: false},
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: [],
                    lineWidth: 0,
                    minorGridLineWidth: 0,
                    lineColor: 'transparent',
                    minorTickLength: 0,
                    tickLength: 0,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    },
                    labels: {
                        enabled: false
                    },
                    gridLineColor: 'transparent',
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        color: '#c0c0c0',
                        animation: {
                            duration: 3000
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'x',
                    color: '#33bfe1',
                    data: [0],
                    pointWidth: 68

                }]
            },
            col2: {
                chart: {
                    type: 'column',
                    backgroundColor: '#ffffff',
                    height: 200
                },
                exporting: {enabled: false},
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: [],
                    lineWidth: 0,
                    minorGridLineWidth: 0,
                    lineColor: 'transparent',
                    minorTickLength: 0,
                    tickLength: 0,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    },
                    labels: {
                        enabled: false
                    },
                    gridLineColor: 'transparent',
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        color: '#c0c0c0',
                        animation: {
                            duration: 3000
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'x',
                    color: '#35a59b',
                    data: [],
                    pointWidth: 58

                }]
            }
        };
    }

    prepareSpatial(protocols) {
        let series = [];
        let that = this;
        for (let x in protocols['trend-detail']) {
            for (let y in protocols['trend-detail'][x].keys) {
                let serie;
                if (that.state.mnemonics[protocols['trend-detail'][x].keys[y].key] == undefined) {
                    console.log(`Unrecognized protocol ${protocols['trend-detail'][x].keys[y].key}`);
                    continue;
                }
                serie =
                    series.filter(function (obj) {
                        if (obj.name == that.state.mnemonics[protocols['trend-detail'][x].keys[y].key].label) {
                            return obj;
                        }
                    })[0];
                //Could not find any series add a new one

                if (serie == undefined) {
                    series.push({
                        name: this.state.mnemonics[protocols['trend-detail'][x].keys[y].key].label,
                        color: this.state.mnemonics[protocols['trend-detail'][x].keys[y].key].color,
                        data: [[(new Date(protocols['trend-detail'][x].timestamp)).getTime()-(new Date(protocols['trend-detail'][x].timestamp).getTimezoneOffset()*60*1000), protocols['trend-detail'][x].keys[y].count]],
                        type: 'areaspline',
                        tooltip: {
                            valueDecimals: 0
                        }
                    })
                } else {
                    serie.data.push([(new Date(protocols['trend-detail'][x].timestamp)).getTime()-(new Date(protocols['trend-detail'][x].timestamp).getTimezoneOffset()*60*1000), protocols['trend-detail'][x].keys[y].count]);
                }
            }
        }
        //fill 0s for unassigned protocols
        //find the earliest start time in all series
        let minTime = Number.POSITIVE_INFINITY;
        let maxTime = Number.NEGATIVE_INFINITY;
        for (let x in series) {
            if (series[x].data[0][0] < minTime) {
                minTime = series[x].data[0][0];
            }
            if (series[x].data[series[x].data.length - 1][0] > maxTime) {
                maxTime = series[x].data[series[x].data.length - 1][0];
            }
        }
        //add the earliest minTime in all series
        for (let x in series) {
            if (series[x].data[0] != minTime) {
                series[x].data.unshift([minTime, 0]);
            }
            if (series[x].data[series[x].data.length - 1][0] != maxTime) {
                series[x].data.push([maxTime, 0]);
            }
        }
        return Object.assign({}, this.state.spatial, {
            series
        });
    }

    prepareBubblesAndLegend(protocols) {
        let legends = {};
        let totalCount = 0;
        for (let w in protocols.data) {
            for (let x in protocols.data[w]['keys']) {
                legends[protocols.data[w]['keys'][x].key] = protocols.data[w]['keys'][x].count; //overwrite the count to latest aggregated count
            }
        }
        for (let x in legends) {
            totalCount += legends[x];
        }
        this.setState({
            legends: Object.keys(legends),
            totalCount
        })
    }

    constructObjectAndCallJAX(props) {
        try {
            const obj = Utility.createQueryStringObject(props, 'control');
            this.props.getDiscoveryProtocols(obj);

            const obj2 = { ...obj, type: 'category,control'};
            this.props.getDiscoveryCategoryCounts(obj2);
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
        console.log(props);
        let protocols = Object.assign({}, props.controls);
        if (!Array.isArray(protocols.data)) {
            protocols.data = [protocols.data];
        }
        let category = Object.assign({}, props.category);
        console.log("protocols -", protocols)
        if (protocols.data == undefined || protocols.data.length == 0 || protocols.data == null) {
            protocols.data = [];
            //don't need timestamp in aggregate data
            protocols.data.push({"keys": []})
            protocols.data[0].keys.push({"key": "user", "count": 0});
            protocols.data[0].keys.push({"key": "auto", "count": 0});
        }
        function compare(a, b) {
            if (a.count > b.count)
                return -1;
            if (a.count < b.count)
                return 1;
            return 0;
        }
        console.log("protocols",protocols);
        //sort so highest series shows up first on both graphs
        for (let x in protocols.data) {
            if(protocols.data[x])
            protocols.data[x].keys.sort(compare);
        }
        let auton, usern;
        auton = usern = 0;

        let auto =(protocols.data[0])? protocols.data[0].keys.find((obj) => obj.key == "auto"):0;
        let user = (protocols.data[0])?protocols.data[0].keys.find((obj) => obj.key == "user"):0;
        if (auto) {
            auton = auto.count;
        }
        if (user) {
            usern = user.count;
        }
        this.prepareBubblesAndLegend(protocols);
        this.setState({
            user: usern,
            auto: auton,
            spatial: this.prepareSpatial(protocols),
            col1: this.prepareCols(category, "user"),
            col2: this.prepareCols(category, "auto"),
        })
    }

    prepareCols(category, type) {
        let categories = [];
        let data = [];
        for (let x in category.data) {
            for (let y in category.data[x].keys) {
                if (category.data[x].keys[y].keys.find((obj) => obj.key == type)) {
                    categories.push(
                        (this.state.mnemonics[category.data[x].keys[y].item] != undefined) ?
                            this.state.mnemonics[category.data[x].keys[y].item].label :
                            category.data[x].keys[y].item
                    );
                    data.push(category.data[x].keys[y].keys.find((obj) => obj.key == type).count);
                }
            }
        }
        let ret;
        if (type == "user") {
            let series = Object.assign({}, this.state.col1.series);
            series[0].data = data;
            ret = {...this.state.col1, xAxis: {...this.state.col1.xAxis, categories}};
        }
        if (type == "auto") {
            let series = Object.assign({}, this.state.col2.series);
            series[0].data = data;
            ret = {...this.state.col2, xAxis: {...this.state.col2.xAxis, categories}};
        }
        return ret;

    }

    componentWillMount() {
        this.constructObjectAndCallJAX(this.props);
    }

    render() {
        let state = this.state;
        return (
            <section className="subcontainer">
                <RB.Row>
                    <RB.Col md={4} sm={4} lg={4}>


                    </RB.Col>
                    <RB.Col md={4} sm={4} lg={4}>

                        <div className="center-block container-of-containers">
                            <div className="circlecontainer c1">
                              <LinkContainer to={"/control/user"} >
                                <i className="wootcloud-user magimage">
                                    <span className="bubbletext">{Utility.strumberify(this.state.user)}</span>
                                </i>
                                  </LinkContainer>
                                { this.state.auto ?
                                  <LinkContainer to={"/control/auto"} >
                                    <div className="circlecontainer c2">
                                        <i className="wootcloud-automated magimage">
                                            <span className="bubbletext">{Utility.strumberify(this.state.auto)}</span>
                                        </i>
                                    </div>
                                      </LinkContainer>
                                    : null }
                            </div>
                        </div>

                    </RB.Col>
                    <RB.Col md={4} sm={4} lg={4}>
                        <Delay wait={125}>
                            <div>
                                <ReactHighstock config={this.state.spatial} ref="spatial">b</ReactHighstock>
                                <h5>Devices</h5>
                                <ul className="legend-zelda">
                                    <li key={`auto-${1}`} className="auto">{state.mnemonics.auto.label}</li>
                                    <li key={`user-${2}`} className="user">{state.mnemonics.user.label}</li>
                                    {/* {this.state.legends.map((name, index) => {
                                        console.log(name);
                                        return (
                                            <li key={`${name} - ${index}`} className={name}>{state.mnemonics[name].label}</li>
                                        );
                                    })} */}
                                </ul>
                            </div>
                        </Delay>
                    </RB.Col>
                </RB.Row>
                <RB.Row>
                    <RB.Col md={4} sm={4} lg={4}>

                    </RB.Col>
                    <RB.Col md={5} sm={5} lg={5}>
                        <Delay wait={125}>
                            <Highcharts config={this.state.col1}/>
                        </Delay>
                    </RB.Col>
                </RB.Row>
                <RB.Row>
                    <RB.Col md={4} sm={4} lg={4}>
                      
                    </RB.Col>
                    <RB.Col md={5} sm={5} lg={5}>
                        <Delay wait={125}>
                            <Highcharts config={this.state.col2}/>
                        </Delay>
                    </RB.Col>
                </RB.Row>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        controls: state.deviceFunctions.controls,
        category: state.deviceFunctions.category,

        filter: state.deviceSummaryReducer.filter,
        noiseFilter: state.globalFiltersReducer.noiseFilter,
        interval: state.globalFiltersReducer.interval,
        starttime: state.globalFiltersReducer.starttime,
        endtime: state.globalFiltersReducer.endtime
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDiscoveryProtocols: (obj) => dispatch(getDiscoveryProtocols(obj)),
        getDiscoveryCategoryCounts: (obj) => dispatch(getDiscoveryCategoryCounts(obj))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Authorization(DeviceFunctions, ['CUSTOMER']));
