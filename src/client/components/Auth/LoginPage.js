import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormGroup } from 'react-bootstrap';

import { authenticate } from './authActions';

import { helpers } from '../common/utils/Utility';

import Logo from '../../assets/images/Logo-Full-White.svg';


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getRedirectTo(userObj) {
        if (userObj) {
            if (userObj.roles.indexOf('CUSTOMER') > -1) {
                return helpers.getRoleHomePage('CUSTOMER');
            } else if (userObj.roles.indexOf('ADMINISTRATOR') > -1) {
                return helpers.getRoleHomePage('ADMINISTRATOR');
            }
            return '/dashboard';
        }
        return false;
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.authenticate(email, password);
    }

    render() {
        const user = window.sessionStorage.getItem('user');
        const userObj = JSON.parse(user);
        const { email, password } = this.state;
        const { isLoginSuccess, loginError, message } = this.props;
        if (isLoginSuccess && userObj) {
            return (
                <Redirect to={this.getRedirectTo(userObj)} />
            );
        }
        return (
            <div className="login-outer-wrapper">
                <div className="login-container">
                    <div className="container">
                        <div className="row" id="pwd-container">
                            <div className="widget-wrapper">
                                <section className="login-form">
                                    <form className="login" onSubmit={this.handleSubmit}>
                                        
                                        <FormGroup>
                                            <input
                                                name="email"
                                                placeholder="Username"
                                                onChange={e => this.setState({
                                                    email: e.target.value,
                                                })}
                                                value={email}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={e => this.setState({
                                                    password: e.target.value,
                                                })}
                                                value={password}
                                            />
                                        </FormGroup>
                                        <div>
                                            { loginError && <div className="login-error">Error {message}</div> }
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Sign In
                                        </button>
                                    </form>
                                </section>
                            </div>
                            <div className="copyright">
                                Copyright © 2017 Wootcloud.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoginPending: state.authenticationReducer.isLoginPending,
    isLoginSuccess: state.authenticationReducer.isLoginSuccess,
    loginError: state.authenticationReducer.loginError,
    message: state.authenticationReducer.message,
});

const mapDispatchToProps = dispatch => ({
    authenticate: (email, password) => dispatch(authenticate(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
