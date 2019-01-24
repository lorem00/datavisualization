

import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router-dom';
import {
  Grid,
  Row,
  Col,
  NavItem
} from 'react-bootstrap';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMenuClass: '',
            msgMenuClass: '',
            langMenuClass: '',
            statusBarClass: ''
        }
    }

    resetMenu() {
        this.setState({
            msgMenuClass: '',
            userMenuClass: '',
            langMenuClass: '',
            statusBarClass: ''
        });
    }

    toggleMessageMenu() {
        this.setState({
            msgMenuClass: this.state.msgMenuClass == 'open' ? '' : 'open',
            userMenuClass: '',
            langMenuClass: '',
            statusBarClass: ''
        });
    }

    toggleLanguagesMenu() {
        console.log(this);
        this.setState({
            langMenuClass: this.state.langMenuClass === 'open' ? '' : 'open',
            userMenuClass: '',
            msgMenuClass: '',
            statusBarClass: ''
        });
    }

    toggleUserMenu() {
        console.log(this);
        this.setState({
            userMenuClass: this.state.userMenuClass === 'open' ? '' : 'open',
            msgMenuClass: '',
            langMenuClass: '',
            statusBarClass: ''
        })
    }

    toggleStatusBar() {
        console.log(this);
        this.setState({
            statusBarClass: this.state.statusBarClass === 'open' ? '' : 'open',
            msgMenuClass: '',
            langMenuClass: '',
            userMenuClass: ''
        });
    }

    logout() {
      window.sessionStorage.removeItem('user');
      this.props.history.push('/login');
    }

    render() {
        const user = window.sessionStorage.getItem('user');
        const userObj = JSON.parse(user);
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top topnav">
                <Grid fluid>
                    <Row>
                        <Col className="branding">
                            <a className="navbar-brand" href="/">
                                <span className="logoimage">&nbsp;</span>
                                <span className="logoheading"></span>
                            </a>
                        </Col>
                        <Col sm={4} md={4}>
                            <ul className="nav navbar-nav">
                                <li>
                                    <a
                                      className="sidebar-control sidebar-main-toggle hidden-xs iconbutton"
                                      onClick={this.props.toggleSideBar}
                                    >
                                        <span className="icon-paragraph-justify3" />
                                    </a>
                                </li>
                                <li className={`dropdown ${this.state.statusBarClass}`}>
                                    <a
                                      className="sidebar-control sidebar-main-toggle hidden-xs iconbutton"
                                      onClick={this.toggleStatusBar.bind(this)}
                                    >
                                        <span className="icon-git-compare" />
                                    </a>
                                    <div
                                        className={`dropdown-menu dropdown-content width-350 ${this.state.statusBarClass}`}>
                                        <div className="dropdown-content-heading">
                                        </div>

                                        <ul className="media-list dropdown-content-body">

                                        </ul>

                                        <div className="dropdown-content-footer">
                                            <a
                                              href="#"
                                              data-popup="tooltip"
                                              title=""
                                              data-original-title="All messages">
                                              <i className="icon-menu display-block"></i></a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <p className="navbar-text"><span className="label bg-success">Online</span></p>
                        </Col>

                        <ul className="nav-right-menu nav navbar-nav navbar-right">
                            <li className={`dropdown language-switch ${this.state.langMenuClass}`}>
                                <a className="dropdown-toggle" onClick={this.toggleLanguagesMenu.bind(this)}>
                                    <img src={require('./../../assets/images/gb.png')} className="position-left"
                                         alt=""/>
                                    &nbsp;
                                    English
                                    <span className="caret"></span>
                                </a>

                                <ul className="dropdown-menu menudd">
                                    <li><a className="deutsch"><img src={require('./../../assets/images/de.png')}
                                                                    alt=""/> Deutsch</a></li>
                                    <li><a className="ukrainian"><img src={require('./../../assets/images/ua.png')}
                                                                      alt=""/> Українська</a></li>
                                    <li><a className="english"><img src={require('./../../assets/images/gb.png')}
                                                                    alt=""/> English</a></li>
                                    <li><a className="espana"><img src={require('./../../assets/images/es.png')}
                                                                   alt=""/> España</a></li>
                                    <li><a className="russian"><img src={require('./../../assets/images/ru.png')}
                                                                    alt=""/> Русский</a></li>
                                </ul>
                            </li>

                            <li className={`dropdown ${this.state.msgMenuClass}`}>
                                <a href="#" className="dropdown-toggle" onClick={this.toggleMessageMenu.bind(this)}>
                                    <i className="icon-bubbles4"></i>
                                    <span className="visible-xs-inline-block position-right">Messages</span>
                                    <span className="badge bg-warning-400">0</span>
                                </a>
                                {/*<div className="dropdown-menu dropdown-content width-350">*/}
                                    {/*<div className="dropdown-content-heading">*/}
                                        {/*Messages*/}
                                        {/*<ul className="icons-list">*/}
                                            {/*<li><a href="#"><i className="icon-compose"></i></a></li>*/}
                                        {/*</ul>*/}
                                    {/*</div>*/}

                                    {/*<ul className="media-list dropdown-content-body">*/}

                                    {/*</ul>*/}

                                    {/*<div className="dropdown-content-footer">*/}
                                        {/*<a href="#" data-popup="tooltip" title="" data-original-title="All messages"><i*/}
                                            {/*className="icon-menu display-block"></i></a>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            </li>

                            <li className={`dropdown dropdown-user ${this.state.userMenuClass}`}>
                                <a className="dropdown-toggle" onClick={this.toggleUserMenu.bind(this)}>
                                    <img src="assets/images/demo/users/face11.jpg" alt=""/>
                                    <span>{userObj ? userObj.email : ''}</span>
                                    <i className="caret"></i>
                                </a>

                                <ul className="dropdown-menu dropdown-menu-right menudd" onClick={this.resetMenu.bind(this)}>
                                    <LinkContainer exact to="/profile" className="sidebar-brand">
                                        <NavItem>
                                            <i className="icon-user-plus"/>
                                            <span className="menutext">My Profile</span>
                                        </NavItem>
                                    </LinkContainer>
                                    <li className="divider"></li>
                                    <LinkContainer exact to="/" className="sidebar-brand">
                                        <NavItem>
                                            <i className="icon-cog5"/>
                                            <span className="menutext">Account Settings</span>
                                        </NavItem>
                                    </LinkContainer>
                                    <LinkContainer exact to="/login" className="sidebar-brand">
                                        <NavItem onClick={this.logout.bind(this)}>
                                            <i className="icon-switch2"/>
                                            <span className="menutext">Logout</span>
                                        </NavItem>
                                    </LinkContainer>
                                </ul>
                            </li>
                        </ul>
                    </Row>
                </Grid>
            </nav>

        );
    }
}
