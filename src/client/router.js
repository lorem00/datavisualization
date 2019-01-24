import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App/App';
import LoginPage from './components/Auth/LoginPage';
import { PrivateRoute } from './PrivateRoute';


export default function ({ history }) { // eslint-disable-line react/prop-types
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path="/" component={App} />
                <Route path="/home" name="home" component={App} />
                <Route path="/dashboard" name="dashboard" component={App} />
                <Route path="/discovery" name="discovery" component={App} />
                <Route path="/admin" name="admin" component={App} />
                <Route path="/analyze" component={App} />
                <Route path="/customers" name="customers" component={App} />
                <Route path="/profile" name="profile" component={App} />
                <Route path="/spectrum" name="spectrum" component={App} />
                <Route path="/type" name="types" component={App} />
                <Route path="/ownership" name="ownership" component={App} />
                <Route path="/appproto" name="applicationprotocol" component={App} />
                <Route path="/manufacturer" name="devicemanufacturer" component={App} />
                <Route path="/control" name="control" component={App} />
                <Route path="/login" name="login" component={LoginPage} />
            </Switch>
        </BrowserRouter>
    );
}
