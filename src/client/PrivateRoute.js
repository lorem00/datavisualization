import React from 'react';
import {Route, Redirect} from 'react-router-dom';
const isTrue = true;
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        window.sessionStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)