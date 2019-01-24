import React from 'react'
import * as ReactBootstrap from 'react-bootstrap'

export default class NotAuthorized extends React.Component {
    render() {
        return (
            <ReactBootstrap.Row className="paddedRow">
                <ReactBootstrap.Col lg={6} lgOffset={3}>
                    <h3>You are not authorized to view this page.</h3>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        );
    }
}