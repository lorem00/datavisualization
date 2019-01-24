import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import Paper from 'material-ui/Paper';

import AppBar from 'containers/AppBar';


export class App extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  };

  render() {
    const {loading} = this.props;

    return (
      <section>
        <Paper zDepth={1} style={{position: 'fixed', width: '100%', zIndex: 10}}>
          <AppBar>
          </AppBar>
          {loading }
        </Paper>
        <section style={{paddingTop: 50}}>
        </section>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.api.get('loading')
  };
}

export default connect(mapStateToProps)(App);
