import React from 'react';
import { connect } from 'react-redux';
import Authorization from '../../components/common/utils/Authorization';

class Analyze extends React.Component {
    static defaultProps = {
        serversLastUpdate: null,
    };

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <PageHeading title="Analyze" url="/analyse" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Authorization(Analyze, ['CUSTOMER']));
