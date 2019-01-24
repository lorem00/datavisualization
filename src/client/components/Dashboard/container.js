import React, { Component } from 'react';
import { connect } from 'react-redux';
import Authorization from '../../components/common/utils/Authorization';

export class Dashboard extends Component {
    static defaultProps = {
        serversLastUpdate: null,
    };

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="page-content" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Authorization(Dashboard, ['CUSTOMER']));
