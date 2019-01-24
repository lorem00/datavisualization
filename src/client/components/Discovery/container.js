import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Authorization from '../../components/common/utils/Authorization';
import GlobalFilters from './GlobalFilters/GlobalFilters';
import DeviceSummary from './DeviceSummary/DeviceSummary';
import DeviceSpectrum from './DeviceSpectrum/DeviceSpectrum';
import DeviceTypes from './DeviceTypes/DeviceTypes';
import DeviceOwnership from './DeviceOwnership/DeviceOwnership';
import DeviceFunctions from './DeviceFunctions/DeviceFunctions';
import DeviceLocations from './DeviceLocations/DeviceLocations';
import DeviceNetworks from './DeviceNetworks/DeviceNetworks';


class Discovery extends Component {
    static defaultProps = {
        serversLastUpdate: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            interval: 'weekly',
            starttime: '',
            endtime: '',
            filter: 'ALL',
        };
    }


    componentDidMount() {

    }

    render() {
        return (
            <div id="discovery">
                <div className="page-content">
                    <Nav bsStyle="tabs" className="container-fluid nav-hor-container">
                        <LinkContainer to="/discovery/spectrum" className="">
                            <NavItem>Tab 1</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/discovery/types" className="horbar-brand">
                            <NavItem>Tab 2</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/discovery/ownership" className="horbar-brand">
                            <NavItem>Tab 3</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/discovery/functions" className="horbar-brand">
                            <NavItem>Tab 4</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/discovery/networks" className="horbar-brand">
                            <NavItem>Tab 5</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/discovery/location" className="horbar-brand">
                            <NavItem>Tab 6</NavItem>
                        </LinkContainer>
                    </Nav>
                    <Switch>
                        <Route path="/discovery/spectrum" component={DeviceSpectrum} />
                        <Route path="/discovery/types" component={DeviceTypes} />
                        <Route path="/discovery/ownership" component={DeviceOwnership} />
                        <Route path="/discovery/functions" component={DeviceFunctions} />
                        <Route path="/discovery/networks" component={DeviceNetworks} />
                        <Route path="/discovery/location" component={DeviceLocations} />
                        <Redirect from="/discovery" to="/discovery/spectrum" />
                    </Switch>
                </div>
            </div>
        );
    }
}

function mapStateToProps() {
    return {

    };
}

function mapDispatchToProps() {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization(Discovery, ['CUSTOMER']));
