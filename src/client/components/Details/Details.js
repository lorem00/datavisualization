import React from 'react';
import Highcharts from 'react-highcharts';
import HighchartsTreemap from 'highcharts-treemap';
import HighchartsMore from 'highcharts-more';
import SolidGuage from 'highcharts-solid-gauge';

import * as RB from 'react-bootstrap';
import { connect } from 'react-redux';
import Delay from 'react-delay';
import LabeledIcon from './../common/LabeledIcon';
import Authorization from '../../components/common/utils/Authorization';
import Utility from './../common/utils/Utility';
import { getSpectrumList, getDeviceDetailData } from './DetailsActions';
import { getDeviceOs } from '../../components/Discovery/DeviceTypes/deviceTypesActions';
import mnemonics from './../common/utils/types';
import DetailList from './DetailList';
import DetailListItem from './DetailListItem';

class Protocols extends React.Component {
    constructor(props) {
        super(props);
        HighchartsTreemap(Highcharts.Highcharts);

        // solid gauge depends on highcharts more
        HighchartsMore(Highcharts.Highcharts);
        SolidGuage(Highcharts.Highcharts);
        const type=this.props.location.pathname.split('/')[1];
        const protocol = this.props.location.pathname.split('/')[2];
        console.log(type);
        let prettyproto = '',pretttype='';
        if (props == undefined) {
            throw 'Protocol Not Defined or Unrecognized';
        } else {
            prettyproto = protocol.charAt(0).toUpperCase() + protocol.slice(1);
              pretttype = type.charAt(0).toUpperCase() + type.slice(1);
        }
        this.osFormatter = this.osFormatter.bind(this);
        this.mnemonicFormatter = this.mnemonicFormatter.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.checkManagement = this.checkManagement.bind(this);
        console.log(protocol);
        this.state = {
            selectedRowId: '',
            type,
            protocol,
            pretttype,
            prettyproto,
            legends: [],
            treemap: {
                chart: {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    exporting: { enabled: false },
                    height: 300,
                    marginTop: 1,
                    style: {
                        fontFamily: 'SymFont',
                    },
                },
                exporting: {
                    enabled: false,
                },
                colorAxis: {
                    minColor: '#FFFFFF',
                },
                series: [{
                    type: 'treemap',
                    layoutAlgorithm: 'squarified',
                }],
                title: {
                    text: '',
                },
            },
            gauge: {
                chart: {
                    type: 'solidgauge',
                    width: 200,
                    height: 150,
                    backgroundColor: '#ffffff',
                },
                exporting: {
                    enabled: false,
                },
                title: null,
                pane: {
                    center: ['50%', '85%'],
                    size: '140%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: '#EEE',
                        innerRadius: '80%',
                        outerRadius: '100%',
                        shape: 'arc',
                    },
                },

                tooltip: {
                    enabled: false,
                },

                // the value axis
                yAxis: {
                    stops: [
                        [0.1, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'], // red
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickAmount: 2,
                    labels: {
                        y: 16,
                    },
                    min: 0,
                    max: 100,
                    title: {
                        text: '<b>High</b><br/>Risk Score',
                        style: {
                            marginTop: 10,
                        },
                    },
                },

                plotOptions: {
                    solidgauge: {
                        innerRadius: '80%',
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true,
                        },
                    },
                },
                credits: {
                    enabled: false,
                },

                series: [{
                    name: 'Risk Score',
                    data: [80],
                    dataLabels: {
                        format: '{y}',
                    },
                    tooltip: {
                        valueSuffix: ' km/h',
                    },
                }],
            },
        };
    }

    componentWillMount() {
        this.constructObjectAndCallJAX(this.props);
    }

    componentWillReceiveProps(props) {
        if (
            props.filter !== this.props.filter ||
            props.interval !== this.props.interval ||
            props.starttime !== this.props.starttime ||
            props.endtime !== this.props.endtime
        ) {
            this.constructObjectAndCallJAX(props);
        }
        if (props.treeMapData !== this.props.treeMapData) {
            const deviceOS = props.treeMapData;
            const treemap = { ...this.state.treemap };
            const { series } = treemap;
            series[0].data = [];
            const legends = [];
            for (const key in deviceOS) {
                const count = deviceOS[key];
                if (mnemonics[key] !== undefined) {
                    legends.push({
                        label: mnemonics[key].label,
                        key,
                        color: mnemonics[key].color,
                    });
                    series[0].data.push({
                        name: mnemonics[key].label,
                        value: count,
                        color: mnemonics[key].color,
                    });
                } else {
                    legends.push({
                        label: key,
                        key,
                        color: key,
                    });
                    series[0].data.push({
                        name: key,
                        key,
                        value: count,
                    });
                }
            }

            this.setState({
                treemap,
                legends,
            });
        }
    }

    onRowClick(row) {
        this.props.getDeviceDetailData(row.id);
        this.setState({
            selectedRowId: row.id,
        });
    }

    constructObjectAndCallJAX(props) {
        try {
            const obj = {
                ...Utility.createQueryStringObject(props, this.state.type),
                subtype: this.state.protocol,
            };
            obj.subtype = this.state.protocol;
            this.props.getSpectrumList(obj);
            if (!this.props.deviceDetailData || !this.props.deviceDetailData.id) {
                const deviceKeyId = this.props.spectrums[0].id;
                this.props.getDeviceDetailData(deviceKeyId);
                this.setState({
                    selectedRowId: deviceKeyId,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    osFormatter(cell) {
        const normalizedKey = Utility.normalizeString(cell);
        return (
            <LabeledIcon
                label={mnemonics[cell].label}
                labelClass={normalizedKey}
                icon={normalizedKey}
            />
        );
    }

    mnemonicFormatter(cell) {
        if (mnemonics[cell] && mnemonics[cell].label) {
            return mnemonics[cell].label;
        }
        return cell;
    }

    checkManagement(data) {
        if (!Utility.isEmpty(data)) {
            return data.managed_info ? 'Managed' : 'Unmanaged';
        }
        return null;
    }

    render() {
        const devices = this.props.spectrums;
        return (
            <div>
                <div className="header-container">
                </div>
                <section className="paddedRow">
                    <RB.Row>
                        <RB.Col md={8} sm={8} lg={8}>
                            <RB.Row>
                                <RB.Col md={8} sm={8} lg={8}>
                                    <div className="treecontainer">
                                        <Delay wait={150}>
                                            <Highcharts isPureConfig config={this.state.treemap}>t</Highcharts>
                                        </Delay>
                                    </div>
                                </RB.Col>
                                <RB.Col md={4} sm={4} lg={4}>
                                    <ul className="">
                                        {this.state.legends.map((obj) => {
                                            const color = { backgroundColor: obj.color, borderRadius: 0 };
                                            return (
                                                <li><span className="legend" style={color} />{obj.label}</li>
                                            );
                                        })}
                                    </ul>
                                </RB.Col>
                            </RB.Row>
                            <RB.Row>
                                <BootstrapTable
                                    ref="deviceList"
                                    data={devices}
                                    options={{
                                        onRowClick: this.onRowClick,
                                    }}
                                    trClassName={row => (row.id === this.state.selectedRowId ? 'selected' : '')}
                                    pagination
                                    striped
                                    search
                                >
                                    <TableHeaderColumn dataField="address" isKey dataSort>Address</TableHeaderColumn>
                                    <TableHeaderColumn dataField="os" dataSort dataFormat={this.osFormatter}>OS</TableHeaderColumn>
                                    <TableHeaderColumn dataField="type" dataSort dataFormat={this.mnemonicFormatter}>Type</TableHeaderColumn>
                                    <TableHeaderColumn dataField="category" dataSort dataFormat={this.mnemonicFormatter}>Category</TableHeaderColumn>
                                    <TableHeaderColumn dataField="user" dataSort>User</TableHeaderColumn>
                                </BootstrapTable>
                            </RB.Row>
                        </RB.Col>
                        <RB.Col md={4} sm={4} lg={4}>
                            <div className="leftborder">
                                <h4>Details of {this.props.deviceDetailData.address}</h4>
                                <div className="pictureblock left">
                                    <i className="icon-user" />
                                </div>
                                <div className="pictureblock left">
                                    <i className="icon-unlocked2" />
                                </div>
                                <div className="pictureblock left clear">
                                    <i className="icon-user-lock" />
                                </div>
                                <div className="pictureblock left">
                                    <i className="icon-map" />
                                </div>
                                <Highcharts ref="dial" isPureConfig config={this.state.gauge}>dial</Highcharts>
                                <DetailList title="Host Classification">
                                    <DetailListItem
                                        title="Address"
                                        description={this.props.deviceDetailData.address}
                                    />
                                    <DetailListItem
                                        title="Category"
                                        description={this.props.deviceDetailData.category &&
                                            mnemonics[this.props.deviceDetailData.category] ?
                                            mnemonics[this.props.deviceDetailData.category].label :
                                            null}
                                    />
                                    <DetailListItem
                                        title="Type"
                                        description={this.props.deviceDetailData.type &&
                                            mnemonics[this.props.deviceDetailData.type] ?
                                            mnemonics[this.props.deviceDetailData.type].label :
                                            null}
                                    />
                                    <DetailListItem
                                        title="Control"
                                        description={this.props.deviceDetailData.control &&
                                            mnemonics[this.props.deviceDetailData.control] ?
                                            mnemonics[this.props.deviceDetailData.control].label :
                                            null}
                                    />
                                    <DetailListItem
                                        title="Management"
                                        description={this.checkManagement(this.props.deviceDetailData)}
                                    />
                                    <DetailListItem
                                        title="SSID"
                                        description={this.props.deviceDetailData.ssid}
                                    />
                                    <DetailListItem
                                        title="Operating System"
                                        description={this.props.deviceDetailData.os &&
                                            mnemonics[this.props.deviceDetailData.os] ?
                                            mnemonics[this.props.deviceDetailData.os].label :
                                            null}
                                    />
                                </DetailList>
                                {this.props.deviceDetailData.manufacturer ?
                                    <DetailList title="Manufacturer">
                                        <DetailListItem
                                            title="MAC Prefix"
                                            description={this.props.deviceDetailData.manufacturer.mac_prefix}
                                        />
                                        <DetailListItem
                                            title="Short Name"
                                            description={this.props.deviceDetailData.manufacturer.short_name}
                                        />
                                        <DetailListItem
                                            title="Full Name"
                                            description={this.props.deviceDetailData.manufacturer.full_name}
                                        />
                                    </DetailList>
                                    : null}
                                {this.props.deviceDetailData.managed_info ?
                                    <DetailList title="Managed Info">
                                        <DetailListItem
                                            title="Hostname"
                                            description={this.props.deviceDetailData.managed_info.hostname}
                                        />
                                        <DetailListItem
                                            title="User"
                                            description={this.props.deviceDetailData.managed_info.user}
                                        />
                                        <DetailListItem
                                            title="Manufacturer"
                                            description={this.props.deviceDetailData.managed_info.make}
                                        />
                                        <DetailListItem
                                            title="Model"
                                            description={this.props.deviceDetailData.managed_info.model}
                                        />
                                    </DetailList>
                                    : null}
                                {this.props.deviceDetailData.app_protos ?
                                    <DetailList title="Protocols">
                                        {this.props.deviceDetailData.app_protos.map((proto, i) => (
                                            <DetailListItem
                                                title={`Protocol ${i + 1}`}
                                                description={proto}
                                            />
                                        ))}
                                    </DetailList>
                                    : null}
                                {this.props.deviceDetailData.tcp_ports ?
                                    <DetailList title="TCP Ports">
                                        {this.props.deviceDetailData.tcp_ports.map((port, i) => (
                                            <DetailList title={`TCP PORT ${i + 1}`}>
                                                <DetailListItem
                                                    title="Port Number"
                                                    description={port.port}
                                                />
                                                <DetailListItem
                                                    title="Status"
                                                    description={port.state}
                                                />
                                                <DetailListItem
                                                    title="Reason"
                                                    description={port.reason}
                                                />
                                            </DetailList>
                                        ))}
                                    </DetailList>
                                    : null}
                                {this.props.deviceDetailData.udp_ports ?
                                    <DetailList title="UDP Ports">
                                        {this.props.deviceDetailData.udp_ports.map((port, i) => (
                                            <DetailList title={`UDP PORT ${i + 1}`}>
                                                <DetailListItem
                                                    title="Port Number"
                                                    description={port.port}
                                                />
                                                <DetailListItem
                                                    title="Status"
                                                    description={port.state}
                                                />
                                                <DetailListItem
                                                    title="Reason"
                                                    description={port.reason}
                                                />
                                            </DetailList>
                                        ))}
                                    </DetailList>
                                    : null}
                            </div>
                        </RB.Col>
                    </RB.Row>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        spectrums: state.discoverySpectrumDrillDownReducer.spectrums,
        treeMapData: state.discoverySpectrumDrillDownReducer.treeMapData,
        deviceDetailData: state.discoverySpectrumDrillDownReducer.deviceDetailData,
        filter: state.deviceSummaryReducer.filter,
        noiseFilter: state.globalFiltersReducer.noiseFilter,
        interval: state.globalFiltersReducer.interval,
        starttime: state.globalFiltersReducer.starttime,
        endtime: state.globalFiltersReducer.endtime,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getSpectrumList: obj => dispatch(getSpectrumList(obj)),
        getDeviceOs: obj => dispatch(getDeviceOs(obj)),
        getDeviceDetailData: id => dispatch(getDeviceDetailData(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization(Protocols, ['CUSTOMER']));
