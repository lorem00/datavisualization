import React from 'react';
import NotAuthorized from './../../NotAuthorized/NotAuthorized';
import Login from './../../Auth/LoginPage';
import {Redirect, Route, Switch} from 'react-router-dom';

const Authorization = function(WrappedComponent, allowedRoles)
{
    return class WithAuthorization extends React.Component {
        constructor(props) {
            super(props)
        }

        render() {
            const user =  window.sessionStorage.getItem('user');
            const userObj = JSON.parse(user);
            if (userObj && allowedRoles==undefined){
                return <WrappedComponent {...this.props} />
            } else if (userObj && allowedRoles.some(r=> userObj.roles.indexOf(r) >= 0)) {
                return <WrappedComponent {...this.props} />
            } else if (userObj === null) {
                window.location = '/login';
            } else {
                return <NotAuthorized />;
            }
        }
    }
};
export default Authorization;
