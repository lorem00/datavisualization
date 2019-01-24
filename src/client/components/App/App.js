import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import _ from 'lodash';

import SideBar from '../common/SideBar';
import Dashboard from '../Dashboard/container';
import Discovery from '../Discovery/container';
import Analyze from '../Analyze/container';
import Admin from '../Admin/Admin';
import Profile from '../Profile/container';
import Details from '../Details/Details';
import GlobalFilters from '../Discovery/GlobalFilters/GlobalFilters';
import DeviceSummary from '../Discovery/DeviceSummary/DeviceSummary';



import Footer from '../common/Footer';

import CustomerManagement from '../CustomerManagement/container';

export class App extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isSideBarOpen: false,
        };
        this.toggleSideBar = this.toggleSideBar.bind(this);
    }

    toggleSideBar(state) {
        this.setState({
            isSideBarOpen: state,
        });
    }

    render() {
        const { isLoading } = this.props;
        const user = window.sessionStorage.getItem('user');
        const debounceToggleSidebar = _.debounce((value) => { this.toggleSideBar(value); }, 200);
        if (!user) {
            return <Redirect to="/login" />;
        }
        return (
            <BrowserRouter>
                <Grid fluid>
                    <div className={`loader-overlay ${isLoading ? 'open' : null}`}>
                        <div className="loader" />
                    </div>

                    <Row>
                        <Col
                            className={`wrapper ${this.state.isSideBarOpen ? 'toggled' : ''}`}
                            onMouseEnter={() => debounceToggleSidebar(true)}
                            onMouseLeave={() => debounceToggleSidebar(false)}
                        >

                        </Col>
                        <div
                            className={`main-content ${this.state.isSideBarOpen ? 'toggled' : ''}`}
                        >
                        <div className="header-container">
                            <div id="header">
                                <div className="page-header-content">

                                </div>

                                </div>
                                </div>

                            <Switch>
                                <Route path="/dashboard" component={Dashboard} />
                                <Route
                                    path="/discovery"
                                    name="discovery"
                                    component={Discovery}
                                />
                                <Route path="/analyze" component={Analyze} />
                                <Route path="/admin" component={Admin} />
                                <Route path="/profile" component={Profile} />
                                <Route path="/customers" component={CustomerManagement} />
                                <Route path="/spectrum" component={Details} />
                                <Route path="/type" component={Details} />
                                <Route path="/ownership" component={Details} />
                                <Route path="/control" component={Details} />
                                <Route path="/appproto" component={Details} />
                                <Route path="/manufacturer" component={Details} />
                                <Redirect to="/dashboard" />
                            </Switch>
                            <Footer />
                        </div>
                    </Row>
                </Grid>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.loadingReducer.isLoading,
    };
}

export default connect(mapStateToProps)(App);
