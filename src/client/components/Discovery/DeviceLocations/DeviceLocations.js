import React from 'react';
import { getDevicesWithLocations } from './discoveryDeviceLocationsActions';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Authorization from '../../../components/common/utils/Authorization';
import DeviceLocationsMap from './DeviceLocationsMap'
import DeviceTopology from './../DeviceTopology/DeviceTopology'
import {Redirect, Route, Switch} from 'react-router-dom'
import { Nav, NavItem, Glyphicon } from 'react-bootstrap'

class DeviceLocations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {

    }

    componentWillReceiveProps(props) {

    }

    render() {
        return (
            <section className="subcontainer">
                <Nav bsStyle="tabs" className="container-fluid maptoplink">
                    <LinkContainer to="/discovery/location/map">
                        <NavItem>
                            <i className="icon-earth"/>
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/discovery/location/topology">
                        <NavItem>
                            <i className="icon-target"/>
                        </NavItem>
                    </LinkContainer>
                </Nav>
                <Switch>
                    <Route path="/discovery/location/topology" name="location" component={DeviceTopology}/>
                    <Route path="/discovery/location/map" name="location" component={DeviceLocationsMap}/>
                    <Redirect from="/discovery/location" to="/discovery/location/map"/>
                </Switch>
            </section>
        )
    }

}

/**
 * mapStateToProps
 * @param state
 * @returns {{locations: (DeviceLocations.state.locations|{}|*|boolean|Array), connections: (DeviceLocations.state.connections|{}|*|Array|number)}}
 */
const mapStateToProps = (state) => {
    return {}
};
/**
 * mapDispatchToProps
 * @param dispatch
 * @returns {{}}
 */
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Authorization(DeviceLocations, ['CUSTOMER']));


