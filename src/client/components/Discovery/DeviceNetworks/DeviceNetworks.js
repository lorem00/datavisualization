import React from 'react';
import Highcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import SolidGuage from 'highcharts-solid-gauge';
import * as RB from 'react-bootstrap';
import Delay from 'react-delay';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as d3 from 'd3';
import { getDiscoveryProtocols } from './action';
import Authorization from '../../../components/common/utils/Authorization';
import Utility from './../../common/utils/Utility';
import DeviceBubbles from './DeviceBubbles';
import LabeledIcon from '../../common/LabeledIcon';

const ReactHighstock = require('react-highcharts/ReactHighstock.src');

class DeviceNetworks extends React.Component {
    constructor(props) {
        super(props);
        HighchartsMore(Highcharts.Highcharts);
        SolidGuage(Highcharts.Highcharts);

        this.state = {
            totalCount: 0,
            legends: [],
            mnemonics: {
                http: {
                    label: 'HTTP',
                    color: '#95dfd8',
                },
                tls: {
                    label: 'TLS',
                    color: '#3dbfdf',
                },
                dns: {
                    label: 'DNS',
                    color: '#8fc6c1',
                },
                smb: {
                    label: 'SMB',
                    color: '#8ebcc5',
                },
                smtp: {
                    label: 'SMTP',
                    color: '#bcc2c4',
                },
                failed: {
                    label: 'Failed',
                    color: '#c0c0c0',
                },
                tcp: {
                    label: 'TCP',
                    color: '#3dbfdf',
                },
                icmp: {
                    label: 'ICMP',
                    color: '#c0c0c0',
                },
                unknown: {
                    label: 'Unknown',
                    color: '#ff8d6d',
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
                plotOptions:{

                },
                series: []
            },
            col1: {
                chart: {
                    type: 'column',
                    backgroundColor: '#ffffff',
                    height: 200,
                },
                exporting: { enabled: false },
                title: {
                    text: '',
                },
                subtitle: {
                    text: '',
                },
                xAxis: {
                    categories: [
                        'Phones',
                        'Laptops',
                        'Desktops',
                        'Cameras',
                        'Printers',
                    ],
                    lineWidth: 0,
                    minorGridLineWidth: 0,
                    lineColor: 'transparent',
                    minorTickLength: 0,
                    tickLength: 0,
                    crosshair: true,
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',
                    },
                    labels: {
                        enabled: false,
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
                        animation:{
                            duration:3000
                        }
                    }
                },
                series: [{
                    name: 'Hotspots',
                    color: '#c2e8e4',
                    data: [144.0 ,129, 246, 71, 50],

                }, {
                    name: 'Rogue',
                    color: '#9adee3',
                    data: [121.0 ,149, 176, 31, 40],

                }]
            },
            bubbledata: [

            ]
        };
    }

    prepareSpatial(protocols) {
        let series = [];
        let that = this;
        for (let x in protocols['trend-detail']) {
            for (let y in protocols['trend-detail'][x].keys) {
                let serie, definedkey;
                if(this.state.mnemonics[protocols['trend-detail'][x].keys[y].key]!=undefined){
                    definedkey = this.state.mnemonics[protocols['trend-detail'][x].keys[y].key]
                }else {
                    definedkey = {
                        label: protocols['trend-detail'][x].keys[y].key,
                        color: "#000"
                    }
                }
                serie =
                    series.filter(function (obj) {
                        if (obj.name == definedkey.label) {
                            return obj;
                        }
                    })[0];
                //Could not find any series add a new one
                if (serie == undefined) {
                    series.push({
                        name: definedkey.label,
                        color: definedkey.color,

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
            this.props.getDiscoveryProtocols(Utility.createQueryStringObject(props, 'appproto'));
        } catch (err) {
            console.log(err);
        }
    }

    prepareBubbles(protocols) {
        let bubbledata = [];
        let min=d3.min(protocols['data'][0].keys, function(d) {return d.count;});
        let max = d3.max(protocols['data'][0].keys, function(d) {return d.count;});
        var x = d3.scaleLinear().domain([min, max]).range([7, 100]);
        for (let y in protocols['data'][0].keys) {
            let obj = protocols['data'][0].keys[y];
            let definedobj = this.state.mnemonics[obj.key];
            if(definedobj==undefined){
                definedobj = {
                    label: obj.key,
                    color: "#000"
                }
            }



            let cat = definedobj.label;
            let key =obj.key;
            let count = obj.count;
            let color = definedobj.color;
            let value=(min < (max * .05))?x(obj.count):obj.count;
            bubbledata.push({
                key,
                cat,
                count,
                color,
                value,
            });
        }
        return bubbledata;
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
        let protocols = Object.assign({}, props.protocols);
        //for bot
        if (!Array.isArray(protocols.data)) {
            protocols.data = [protocols.data];
        }
        if (protocols.data == undefined || protocols.data.length == 0 || protocols.data == null) {
            protocols.data = [];
            //don't need timestamp in aggregate data
            protocols.data.push({"keys": []})
            protocols.data[0].keys.push({"key": "undefined", "count": 0});
        }
        function compare(a, b) {
            if (a.count > b.count)
                return -1;
            if (a.count < b.count)
                return 1;
            return 0;
        }
        //sort so highest series shows up first on both graphs
        for (let x in protocols.data) {
            if(protocols.data[x].keys.length>0) {
                protocols.data[x].keys.sort(compare);
            }else {
                protocols.data[x].keys.push({"key":"unknown","count": 0})
            }
        }
        this.prepareBubblesAndLegend(protocols);
        this.setState({
            bubbledata: this.prepareBubbles(protocols),
            spatial: this.prepareSpatial(protocols),
        })
    }

    componentWillMount() {
        this.constructObjectAndCallJAX(this.props);
    }

    render() {
        let state = this.state;
        return(
            <section className="subcontainer">
                <RB.Row>
                    <RB.Col md={4} sm={4} lg={4}>
                    </RB.Col>
                    <RB.Col md={4} sm={4} lg={4}>
                        <DeviceBubbles data={this.state.bubbledata} history={this.props.history}/>
                    </RB.Col>
                    <RB.Col md={4} sm={4} lg={4}>
                        <Delay wait={125}>
                            <div>
                                <ReactHighstock config={this.state.spatial} ref="spatial">b</ReactHighstock>
                                <h5>Devices</h5>
                                <ul className="legend-zelda">
                                    {this.state.legends.map(function (name, index) {
                                        return (
                                            <li key={index} className={name}>{(state.mnemonics[name]!=undefined?state.mnemonics[name].label:name)}</li>
                                        )
                                    })}
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
                            {/* Highcharts area */}
                            <Highcharts config={this.state.col1} />
                        </Delay>
                    </RB.Col>
                </RB.Row>
                <RB.Row>
                    <RB.Col md={4} sm={4} lg={4}>
                    </RB.Col>
                    <RB.Col md={5} sm={5} lg={5}>
                        <RB.Row>
                            <RB.Col md={6} sm={6} lg={6}>
                                <div className="tablish">
                                    <div className="head">HTTP</div>
                                    { _.times(5, iteratee => (
                                        <div className="trow" key={`HTTP-${iteratee}`}>
                                            <LabeledIcon
                                                label={Math.random() * 100000000000000000}
                                                labelClass="deviceMAC"
                                                icon="icon-apple2"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </RB.Col>
                            <RB.Col md={6} sm={6} lg={6}>
                                <div className="tablish">
                                    <div className="head">HTTPS</div>
                                    { _.times(5, iteratee => (
                                        <div className="trow" key={`HTTPS-${iteratee}`}>
                                            <LabeledIcon
                                                label={Math.random() * 100000000000000000}
                                                labelClass="deviceMAC"
                                                icon="icon-windows8"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </RB.Col>
                        </RB.Row>
                        <p></p>
                        <p></p>
                        <RB.Row>
                            <RB.Col md={6} sm={6} lg={6}>
                                <div className="tablish">
                                    <div className="head">SSL</div>
                                    { _.times(5, iteratee => (
                                        <div className="trow" key={`SSL-${iteratee}`}>
                                            <LabeledIcon
                                                label={Math.random() * 100000000000000000}
                                                labelClass="deviceMAC"
                                                icon="icon-android"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </RB.Col>
                            <RB.Col md={6} sm={6} lg={6}>
                                <div className="tablish">
                                    <div className="head">SNMP</div>
                                    { _.times(5, iteratee => (
                                        <div className="trow" key={`SNMP-${iteratee}`}>
                                            <LabeledIcon
                                                label={Math.random() * 100000000000000000}
                                                labelClass="deviceMAC"
                                                icon="icon-windows2"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </RB.Col>
                        </RB.Row>
                    </RB.Col>
                </RB.Row>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        protocols: state.deviceNetworks.controls,

        filter: state.deviceSummaryReducer.filter,
        noiseFilter: state.globalFiltersReducer.noiseFilter,
        interval: state.globalFiltersReducer.interval,
        starttime: state.globalFiltersReducer.starttime,
        endtime: state.globalFiltersReducer.endtime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDiscoveryProtocols: (obj) => dispatch(getDiscoveryProtocols(obj))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Authorization(DeviceNetworks, ['CUSTOMER']));
