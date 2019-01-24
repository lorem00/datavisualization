import Location from './Location';
import React from 'react';

const LocationComponent = ({ name, lat, lng }) => <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 40, width: 60, top: -20, left: 20,
}} >{name}{lat}{lng}</div>;

export default  class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                {this.props.devices.map((location) => (

                    <LocationComponent
                    key={location.id}
                    lat={location.lat}
                    lng={location.lon}
                    name={location.name}
                    />
                ))}
            </div>
        );
    }
}