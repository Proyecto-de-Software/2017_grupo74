import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { CookiesProvider, withCookies } from 'react-cookie';

import * as actions from '../../actions';

export default function(ComposedComponent) {
  class Authentication extends Component {
    constructor(props) {
      super(props);
      const { fetchUser } = this.props;
      fetchUser();

      const connectedUser = new Object(Cookies.getJSON('connectedUser'));
      this.state = {
        connectedUser: connectedUser,
      };
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent { ...this.props } user={this.state.connectedUser} />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
    };
  }

  return withCookies(withRouter(connect(mapStateToProps, actions)(Authentication)));
}
