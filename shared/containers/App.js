import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

import * as actions from '../actions';
import DevTools from '../components/DevTools';

/**
 *  Save that state
 */
function mapStateToProps(state) {
  return {
    auth: {
      isFetching: state.auth.isFetching
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

/**
 * Bind all the actions from authActions, deviceActions and globalActions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  }
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.actions.getSessionToken();
    },
    2500);
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {...this.props})}
        {process.env.NODE_ENV === "development" && <DevTools />}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(App));
