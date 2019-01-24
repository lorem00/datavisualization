import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import userlogo from './../../assets/images/user-young-male-avatar-person-man-7096.ico';
import IsoLogo from '../../assets/images/Isologo-White.svg';
import Logo from '../../assets/images/Logo-White.svg';

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserMenuOpen: false
        }
        this.toggleUserMenu = this.toggleUserMenu.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        const user =  window.sessionStorage.getItem('user');
        const userObj = JSON.parse(user);
        this.setState({ roles: userObj.roles });
    }

    allowedFor(allowedRoles = []) {
        return (allowedRoles.some(r => this.state.roles.indexOf(r) >= 0));
    }

    toggleUserMenu() {
        this.setState({
            isUserMenuOpen: !this.state.isUserMenuOpen
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
            <div id="sidebar">
                <div className="content-wrapper">
                    <div className="sidebar-logo">
                        <img src={IsoLogo} alt={'Wootcloud'} className="isologo" /><img src={Logo} alt={'Wootcloud'} className={`logo ${this.props.open ? '' : 'hidden-label'}`} />
                    </div>
                    { this.allowedFor(['CUSTOMER']) ?
                        <Nav bsStyle="pills" stacked className="sidebar-nav">
                            <div className="menuheader">
                                {this.props.open ? <span>MAIN</span> : <span>&nbsp;</span>}
                            </div>
                            <LinkContainer to="/dashboard" className="sidebar-brand">
                                <NavItem>
                                    <i className="icon-home4" />
                                    {this.props.open ? <span className="menutext">Dashboard</span> : ''}
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/discovery" className="sidebar-brand">
                                <NavItem>
                                    <i className="icon-search4" />
                                    {this.props.open ? <span className="menutext">Discovery</span> : ''}
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/analyze" className="sidebar-brand">
                                <NavItem>
                                    <i className="icon-graph" />
                                    {this.props.open ? <span className="menutext">Analyze</span> : ''}

                                </NavItem>
                            </LinkContainer>
                            <div className="menuheader">&nbsp;</div>
                        </Nav>
                    : null }
                    { this.allowedFor(['ADMINISTRATOR']) ?
                        <Nav bsStyle="pills" stacked className="sidebar-nav">
                            <div className="menuheader">
                                {this.props.open ? <span>ADMINISTRATION</span> : <span>&nbsp;</span>}
                            </div>
                            <LinkContainer to="/admin" className="sidebar-brand">
                                <NavItem>
                                    <i className="icon-key" />
                                    {this.props.open ? <span className="menutext">User Management</span> : ''}
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/customers" className="sidebar-brand">
                                <NavItem>
                                    <i className="icon-user" />
                                    {this.props.open ? <span className="menutext">Customer Management</span> : ''}
                                </NavItem>
                            </LinkContainer>
                        </Nav>
                    : null }
                    <div className="user-profile">
                        <div className="category-content">
                            <div className="media">
                                <div className={`dropdown dropdown-user ${this.state.isUserMenuOpen && this.props.open ? 'open' : ''}`}>
                                    <ul className="dropdown-menu dropdown-menu-right menudd">
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
                                            <NavItem onClick={this.logout}>
                                                <i className="icon-switch2"/>
                                                <span className="menutext">Logout</span>
                                            </NavItem>
                                        </LinkContainer>
                                    </ul>
                                    <div className="dropdown-toggle" onClick={this.toggleUserMenu}>
                                        <img src={userlogo} className="img-circle img-sm" alt=""/>
                                        <div className={`media-body ${this.props.open ? '' : 'no-margin'}`}>
                                            <span
                                                className={`media-heading text-semibold ${this.props.open ? '' : 'hidden-label'}`}
                                            >
                                                {userObj ? userObj.email : ''}
                                            </span>
                                        </div>
                                        <i className="caret" />
                                    </div>

                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
