import React from 'react';
import { getDevicesWithLocations } from './discoveryDeviceLocationsActions';
import Locations from './Locations';
import { connect } from 'react-redux';
import Authorization from '../../../components/common/utils/Authorization';
import GoogleMap from 'google-map-react';
import MyGoogleMap from './MyGoogleMap'

class DeviceLocations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            geoLocations: [],
            processedLocation:{},
            connections: {},
            isMapLoading : true,
            isLocationMap : true,
            isConnectionMap:false
        }
    }

    dispatchgetDevicesWithLocationsCall(){
        let inputParams = {
            starttime:'',
            endtime:'',
            interval:''
        };
        this.props.getDevicesWithLocations(inputParams);
    }

    dispatchGetDevicesWithConnectionsCall(props){
        let inputParams = {
            starttime:'',
            endtime:'',
            interval:''
        };
        //this.props.getDevicesWithConnections(inputParams);
    }


    componentWillMount() {
        //Dispaching the API Call to get the backend data.
        this.dispatchgetDevicesWithLocationsCall(this.props);


    }

    componentWillReceiveProps(props) {

    }

    render() {
        return (
            <div className="mapcontainer">
                <MyGoogleMap></MyGoogleMap>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Authorization(DeviceLocations, ['CUSTOMER']));


