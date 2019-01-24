import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-bootstrap-datetimepicker-custom-icons';
import Dropdown from 'react-bootstrap-dropdown';
import _isEqual from 'lodash/isEqual';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
    setInterval,
    toggleNoiseFilter,
    setStartTime,
} from './globalFiltersActions';


class GlobalFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 'ALL',
            starttime: '',
            endtime: '',
            interval: {
                text: '1 Day',
                value: 'daily'
            },
            options: [
                { text: '1 Day', value: 'daily' },
                { text: '7 Days', value: 'weekly' },
                { text: '15 Days', value: 'fortnight' },
                { text: '30 Days', value: 'monthly' },
                { text: 'Beginning of Time', value: 'bot' },
            ],
        };
    }

    componentWillMount() {
        this.constructObjectAndCallJAX(this.props);
        this.props.setInterval(this.props.interval, this.props.starttime);
    }

    componentWillReceiveProps(props) {
        if (
            props.filter !== this.props.filter ||
            props.interval !== this.props.interval ||
            props.starttime !== this.props.starttime ||
            props.endtime !== this.props.endtime
        ) {
            this.constructObjectAndCallJAX(props);
            this.props.setInterval(props.interval, props.starttime);
        }

        if (!_isEqual(props, this.state)) {
            this.setState(props);
        }
    }

    getTitleForSelectedInterval() {
        const { interval } = this.props;
        return this.state.options.find(obj => obj.value === interval).text;
    }

    constructObjectAndCallJAX(props) {
    }

    render() {
        const { options } = this.state;

        const noiseFilterOptions = [
            { text: 'On', value: 'true' },
            { text: 'Off', value: 'false' },
        ];

        return (

            <div id="globalFilters">
                <div className="global-filters">
                    <div className="filter-controllers">
                        <Dropdown
                            title={this.getTitleForSelectedInterval()}
                            items={options}
                            onSelect={value => this.props.setInterval(value, this.props.starttime)}
                        />
                        <span className="datePicker-label">Starting from</span>
                        <div className="datePicker">
                            {this.props.interval === 'bot' ?
                                <div className="disabledDatePicker" />
                                : null}
                            <DatePicker
                                mode="date"
                                dateTime={this.props.starttime}
                                onChange={this.props.setStartTime}
                            />
                        </div>
                    </div>
                    <div className="noise-filter">
                        <span className="label-nf">Noise:</span>
                        <Dropdown
                            title="Off"
                            items={noiseFilterOptions}
                            onSelect={this.props.toggleNoiseFilter}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

GlobalFilters.defaultProps = {
    toggleNoiseFilter: null,
    setInterval: null,
    setStartTime: null,
    interval: 'daily',
    filter: null,
    starttime: null,
    endtime: null,
};

GlobalFilters.propTypes = {
    toggleNoiseFilter: PropTypes.func,
    setInterval: PropTypes.func,
    setStartTime: PropTypes.func,
    interval: PropTypes.string,
    filter: PropTypes.string,
    starttime: PropTypes.number,
    endtime: PropTypes.number,
};

const mapStateToProps = (state) => {
    return {
        interval: state.globalFiltersReducer.interval,
        starttime: state.globalFiltersReducer.starttime,
        endtime: state.globalFiltersReducer.endtime,
        noiseFilter: state.globalFiltersReducer.noiseFilter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setInterval: (filter, initTime) => dispatch(setInterval({ filter, initTime })),
        toggleNoiseFilter: value => dispatch(toggleNoiseFilter(value)),
        setStartTime: timestamp => dispatch(setStartTime(+timestamp)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(GlobalFilters);
