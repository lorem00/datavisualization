import React from 'react';
import Highcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import SolidGuage from 'highcharts-solid-gauge';
import * as RB from 'react-bootstrap';
import Delay from 'react-delay';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getDiscoveryProtocols } from './deviceSpectrumActions';
import Authorization from '../../../components/common/utils/Authorization';
import Utility from '../../common/utils/Utility';

const ReactHighstock = require('react-highcharts/ReactHighstock.src');

class DeviceSpectrum extends React.Component {
    constructor(props) {
        super(props);
        HighchartsMore(Highcharts.Highcharts);
        SolidGuage(Highcharts.Highcharts);

        this.state = {
            totalCount: 0,
            legends: [],
            mnemonics: {
                wifi: {
                    label: 'WiFi',
                    color: '#95dfd8',
                    count: 0,
                },
                bt: {
                    label: 'Bluetooth',
                    color: '#3dbfdf',
                    count: 0,
                },
                wire: {
                    label: 'Wired',
                    color: '#8fc6c1',
                    count: 0,
                },
                wired: {
                    label: 'Wired',
                    color: '#8fc6c1',
                    count: 0,
                },
                ble: {
                    label: 'Bluetooth LE',
                    color: '#8ebcc5',
                    count: 0,
                },
                zigb: {
                    label: 'Zigbee',
                    color: '#bcc2c4',
                    count: 0,
                },
                udp: {
                    label: 'UDP',
                    color: '#95dfd8',
                    count: 0,
                },
                tcp: {
                    label: 'TCP',
                    color: '#3dbfdf',
                    count: 0,
                },
                icmp: {
                    label: 'ICMP',
                    color: '#c0c0c0',
                    count: 0,
                },
                unknown: {
                    label: 'Unknown',
                    color: '#000',
                    count: 0,
                },
                keyMissing: {
                    label: 'Unknown *',
                    color: '#ff8d6d',
                    count: 0,
                },
            },
            protocols: {},
            radial: {
                chart: {
                    type: 'solidgauge',
                    backgroundColor: '#ffffff',
                    marginTop: 1,
                    style: {
                        fontFamily: 'SymFont',
                    },
                },
                exporting: { enabled: false },
                title: {
                    text: '',
                    style: {
                        fontSize: '24px',
                    },
                },
                tooltip: {
                    enabled: false,
                    borderWidth: 0,
                    backgroundColor: 'none',
                    shadow: false,
                    style: {
                        fontSize: '16px',
                    },
                    pointFormat: '{series.name}<br><span style="font-size:12px; color: {#000};">{point.y}%</span>',
                    positioner(labelWidth) {
                        return {
                            x: 200 - (labelWidth / 2),
                            y: 180,
                        };
                    },
                },
                pane: {
                    startAngle: 180,
                    endAngle: 540,
                    background: [{ // Track for Move
                        outerRadius: '112%',
                        innerRadius: '96%',
                        backgroundColor: '#f6f6f6',
                        borderWidth: 0,
                    }, { // Track for Exercise
                        outerRadius: '96%',
                        innerRadius: '79%',
                        backgroundColor: '#f6f6f6',
                        borderWidth: 0,
                    }, { // Track for Stand
                        outerRadius: '79%',
                        innerRadius: '62%',
                        backgroundColor: '#f6f6f6',
                        borderWidth: 0,
                    }, { // Track for Stand
                        outerRadius: '62%',
                        innerRadius: '45%',
                        backgroundColor: '#f6f6f6',
                        borderWidth: 0,
                    }, { // Track for Stand
                        outerRadius: '45%',
                        innerRadius: '29%',
                        backgroundColor: '#f6f6f6',
                        borderWidth: 0,
                    }],
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    lineWidth: 0,
                    tickPositions: []
                },

                plotOptions: {
                    solidgauge: {
                        animation: 1000,
                        dataLabels: {
                            enabled: false,
                        },
                        linecap: 'round',
                        stickyTracking: true,
                        rounded: true,
                    },
                },

                series: [{
                    name: 'WiFi',
                    data: [{
                        color: '#93dfd9',
                        radius: '112%',
                        innerRadius: '96%',
                        y: 0,
                    }],
                }, {
                    name: 'Bluetooth',
                    data: [{
                        color: '#33bfe1',
                        radius: '95%',
                        innerRadius: '79%',
                        y: 0,
                    }],
                }, {
                    name: 'Wired',
                    data: [{
                        color: '#8dc7c2',
                        radius: '78%',
                        innerRadius: '62%',
                        y: 0,
                    }],
                }, {
                    name: 'Bluetooth <br/> Low Energy',
                    data: [{
                        color: '#8dbcc6',
                        radius: '61%',
                        innerRadius: '46%',
                        y: 0,
                    }],
                }, {
                    name: 'Zigbee',
                    data: [{
                        color: '#bcc2c4',
                        radius: '45%',
                        innerRadius: '29%',
                        y: 0,
                    }],
                }],
            },
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
                        visibility: 'hidden',
                    },
                    labelStyle: {
                        visibility: 'hidden',
                    },
                },
                plotOptions: {},
                series: [],
            },
        };
    }

    prepareRadial(protocols) {
        if (protocols && protocols.data) {
            let series = [];
            let radius = 112;
            let radialLength = 16;
            let innerRadius = radius - radialLength;
            // let keys = (protocols.data.find((obj) => obj.spectrums!=undefined)[0]).spectrums;
            let keys = protocols.data[0].keys;
            for (let x in keys) {
                let color = (this.state.mnemonics[keys[x].key] === undefined ? "#000" : this.state.mnemonics[keys[x].key].color)
                color = keys[x].key === '' ? '#ff8d6d' : color;
                let data = [{
                    color,
                    radius: radius + '%',
                    innerRadius: innerRadius + '%',
                    y: keys[x].count
                }];
                series.push({
                    name: keys[x].key,
                    data
                });
                radius -= radialLength + 1;
                innerRadius = radius - radialLength;
            }
            //TODO: enable counting max when aggregation is corrected
            let max = series[0].data[0].y * 1.05;
            max = ((series[0].data[0].y * 1.05) == 0 ? 1 : max);
            return Object.assign({}, this.state.radial, {
                series,
                yAxis: {
                    min: 0,
                    max,
                    lineWidth: 0,
                    tickPositions: []
                }
            });
        }
    }

    prepareSpatial(protocols) {
        const series = [];
        const that = this;
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
        // fill 0s for unassigned protocols
        // find the earliest start time in all series
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
        // add the earliest minTime in all series
        for (let x in series) {
            if (series[x].data[0] != minTime) {
                series[x].data.unshift([minTime, 0]);
            }
            if (series[x].data[series[x].data.length - 1][0] != maxTime) {
                series[x].data.push([maxTime, 0]);
            }
        }

        return Object.assign({}, this.state.spatial, {
            series,
        });
    }

    prepareBubblesAndLegend(protocols) {
        let legends = {};
        let totalCount = 0;
        for (let w in protocols.data) {
            for (let x in protocols.data[w]['keys']) {
                let key = protocols.data[w]['keys'][x].key;
                if(key==""){
                    key="keyMissing";
                }
                legends[key] = protocols.data[w]['keys'][x].count; //overwrite the count to latest aggregated count
                if(this.state.mnemonics[key]==undefined){
                    this.state.mnemonics["unknown"].count += protocols.data[w]['keys'][x].count;
                }else {
                    this.state.mnemonics[key].count = protocols.data[w]['keys'][x].count;
                }
            }
        }
        for (let x in legends) {
            totalCount += legends[x];
        }
        this.setState({
            legends: Object.keys(legends),
            totalCount,
        });
    }

    constructObjectAndCallJAX(props) {
        try {
            this.props.getDiscoveryProtocols(Utility.createQueryStringObject(props, 'spectrum'));
        } catch (err) {
            console.log(err);
        }
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
        const protocols = Object.assign({}, props.protocols);
        if (JSON.stringify(protocols) !== JSON.stringify(this.state.protocols)) {
            this.setState({ protocols });
            if (!Array.isArray(protocols.data)) {
                protocols.data = [protocols.data];
            }
            if (protocols.data === undefined ||
                protocols.data.length === 0 ||
                protocols.data == null) {
                protocols.data = [];
                // don't need timestamp in aggregate data
                protocols.data.push({ keys: [] });
                protocols.data[0].keys.push({ key: 'bt', count: 0 });
                protocols.data[0].keys.push({ key: 'wifi', count: 0 });
                protocols.data[0].keys.push({ key: 'wire', count: 0 });
                protocols.data[0].keys.push({ key: 'ble', count: 0 });
                protocols.data[0].keys.push({ key: 'zigb', count: 0 });
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
                if (protocols.data[x].keys) {
                    protocols.data[x].keys.sort(compare);
                }
            }
            this.prepareBubblesAndLegend(protocols);
            this.setState({
                radial: this.prepareRadial(protocols),
                spatial: this.prepareSpatial(protocols),
            });
        }
    }

    getTotalCount() {
        let { totalCount } = this.state;
        if (totalCount > 999 && totalCount < 999999) {
            totalCount = `${(totalCount / 1000).toFixed(1)}K`;
        } else if (totalCount > 999999 && totalCount < 999999999) {
            totalCount = `${(totalCount / 1000000).toFixed(1)}M`;
        } else if (totalCount > 999999999 && totalCount < 999999999999) {
            totalCount = `${(totalCount / 1000000000).toFixed(1)}B`;
        }
        return totalCount;
    }

    render() {
        let state = this.state;
        return (
            <section className="subcontainer">
                <RB.Row>
                    <RB.Col md={4} lg={4} sm={4}>
                      
                    </RB.Col>
                    <RB.Col md={3} lg={3} sm={3}>
                        <Delay wait={125}>
                            <div>
                                <div className="disc-tooltip">
                                    <div className="main">{this.getTotalCount()}</div>
                                    <div className="sub">Total Devices</div>
                                </div>
                                <Highcharts config={this.state.radial} ref='radial'>a</Highcharts>
                            </div>
                        </Delay>
                    </RB.Col>
                    <RB.Col md={1} lg={1} sm={1}>
                        <div className="bubble-container">
                            {this.state.legends.map((name, index) => {
                                return (
                                    <LinkContainer to={`/spectrum/${name}`} key={`protocols-${name}-${index}`}>
                                        <div className={`svg-container svg-container${(index + 1)} ${name}`}>
                                            <svg width="100" height="100" className="svg">
                                                <circle cx="50" cy="50" r="40" strokeWidth="4" className="symbol">
                                                    <title>{(state.mnemonics[name]==undefined?name:state.mnemonics[name].label)}: {(state.mnemonics[name]==undefined?"":state.mnemonics[name].count)}</title>
                                                </circle>
                                                <text
                                                    className="bubble-text"
                                                    x="45%"
                                                    y="45%"
                                                    dy=".3em">
                                                    {(state.mnemonics[name]==undefined?"":state.mnemonics[name].count)}</text>
                                            </svg>
                                        </div>
                                    </LinkContainer>
                                );
                            })}
                        </div>
                    </RB.Col>
                    <RB.Col md={4} lg={4} sm={4}>
                        <Delay wait={125}>
                            <div>
                                <ReactHighstock config={this.state.spatial} ref="spatial">b</ReactHighstock>
                                <h5>Protocols</h5>
                                <ul className="legend-zelda">
                                    {this.state.legends.map((name, index) => (
                                        <li key={`protocols-${name}-${index}`} className={name}>{(state.mnemonics[name] === undefined ? '' : state.mnemonics[name].label)}</li>
                                    ))}
                                </ul>
                            </div>
                        </Delay>
                    </RB.Col>
                </RB.Row>
            </section>
        );
    }
}


const mapStateToProps = state => ({
    protocols: state.deviceSpectrumReducer.protocols,
    filter: state.deviceSummaryReducer.filter,
    noiseFilter: state.globalFiltersReducer.noiseFilter,
    interval: state.globalFiltersReducer.interval,
    starttime: state.globalFiltersReducer.starttime,
    endtime: state.globalFiltersReducer.endtime,
});

const mapDispatchToProps = dispatch => ({
    getDiscoveryProtocols: obj => dispatch(getDiscoveryProtocols(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorization(DeviceSpectrum, ['CUSTOMER']));
