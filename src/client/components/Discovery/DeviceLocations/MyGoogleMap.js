import React, {Component} from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps'
import darkMapTheme from './darkMapTheme'
import { getDevicesWithLocations } from './discoveryDeviceLocationsActions';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Authorization from '../../../components/common/utils/Authorization';


class MyGoogleMap extends Component {

    renderGoogleMap() {
        const key = "sample";
        const lat = 10;
        const lng = 10;
        const markers = [{
            position: {
                lat,
                lng,
            },
            key,
            defaultAnimation: 2,
        }];

        const GettingStartedGoogleMap = withScriptjs(withGoogleMap(props => (
            <GoogleMap
                defaultZoom={2}
                defaultCenter={{ lat, lng }}
                defaultOptions={{ styles: darkMapTheme }}
            >
                <Marker position={{ lat: 37.7749, lng: -122.4194 }} key="San Francsisco" defaultAnimation={2} />
                <Marker position={{ lat: 37.370524, lng: -121.924172 }} key="San Jose" defaultAnimation={2}/>
            </GoogleMap>
        )));

        return (
            <GettingStartedGoogleMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAsTgKRIma95cjQ_9tz1E_P-75kUFzJGyE"
                loadingElement={<div style={{ height: `100%`, backgroundColor: "#96968f" }} />}
                containerElement={
                    <div className="map" />
                }
                mapElement={
                    <div style={{ height: '100%', backgroundColor: "#96968f"  }} />
                }
            />
        );
    }

    render() {
        return (
            <div>
                {this.renderGoogleMap()}
            </div>
        );
    }
}

/**
 * mapStateToProps
 * @param state
 * @returns {{locations: (DeviceLocations.state.locations|{}|*|boolean|Array), connections: (DeviceLocations.state.connections|{}|*|Array|number)}}
 */
const mapStateToProps = (state) => {
    return {
        geoLocations:  state.discoveryDeviceLocationsReducer.geoLocations  // connections: state.discoveryDeviceConnectionsReducer.connections
    }
};
/**
 * mapDispatchToProps
 * @param dispatch
 * @returns {{}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        getDevicesWithLocations: ( params ) => dispatch(getDevicesWithLocations( params ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authorization(MyGoogleMap, ['CUSTOMER']));
