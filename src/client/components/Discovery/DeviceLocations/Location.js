import React from 'react';

export default class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                {this.props.name} - {this.props.lat}  - {this.props.lon}
            </div>
        );
    }
}
