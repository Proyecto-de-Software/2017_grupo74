import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Segment,
  Tab
} from 'semantic-ui-react';

import * as usersActions from 'reducers/actions/users-actions';

import Footer from 'components/Footer';
import TopMenu from 'components/TopMenu';
import UserShow from 'components/Users/Show';
import UserEdit from 'components/Users/Edit';
import UsersList from 'components/Users/List';

const panes = ({ loading, originalUser, fields, isValid, isFetching }, actions) => [
  {
    menuItem: { key: 'user', icon: 'user', content: 'Ver perfil' },
    render: () => <Tab.Pane loading={loading} padded='very'><UserShow user={originalUser} /></Tab.Pane>
  },
  {
    menuItem: { key: 'edit', icon: 'edit', content: 'Editar perfil' },
    render: () => (
      <Tab.Pane loading={loading} padded='very'>
        <UserEdit
          user={originalUser}
          fields={fields}
          isValid={isValid}
          isFetching={isFetching}
          onFormFieldChange={actions.onUserFormFieldChange}
          updateUser={actions.updateUser} />
      </Tab.Pane>
    ),
  },
];

class UsersContainer extends Component {
  constructor(props) {
    super(props);

    const { originalUser, fields, isFetching, isValid, users } = this.props.users;

    this.state = {
      loading: true,
      pageNumber: 0,
      username: '',
      active: true,
      users,
      originalUser,
      fields,
      isValid,
      isFetching,
    };
  }

  componentWillReceiveProps(props) {
    const { originalUser, fields, isFetching, isValid, users } = props.users;

    this.setState({
      loading: fields.username === '',
      originalUser,
      fields,
      isValid,
      isFetching,
      users,
    });
  }

  componentDidMount() {
    const { originalUser, fields, isFetching, isValid, users } = this.props.users;

    if (this.props.match.params.username && originalUser.username === '') {
      this.props.actions.getUser(this.props.match.params.username);
      return;
    }

    if (!this.props.match.params.username && this.state.users === null) {
      const { pageNumber, username, active } = this.state;

      this.props.actions.getUsers(pageNumber, username, active);
      return;
    }

    this.setState({
      loading: false,
      originalUser,
      fields,
      isValid,
      isFetching,
      users
    });
  }

  onSearchFieldChange(e, {name, value}) {
    const prevState = {
      ...this.state,
      [name]: value,
    };
    const { pageNumber, username, active } = prevState;

    this.props.actions.getUsers(pageNumber, username, active);

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { actions } = this.props;

    return (
      <div>
        {
          this.props.match.params.username ?
          <Tab menu={{ secondary: true, pointing: true }} panes={panes(this.state, actions)} /> :
          <UsersList
            users={this.state.users}
            onSearchFieldChange={this.onSearchFieldChange.bind(this)} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...usersActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);