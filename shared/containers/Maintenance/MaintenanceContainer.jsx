import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container,
  Header,
  Icon,
} from 'semantic-ui-react';

import TopMenu from 'components/TopMenu';

import * as configurationActions from 'reducers/actions/configuration-actions';

class MaintenanceContainer extends Component {
  render() {
    const { configuration } = this.props;

    return (
      <div>
        <Container style={{margin: '95px 0 0 0'}}>
          <Header as='h2'>
            <Icon name='warning' />
            <Header.Content>
              500
              <Header.Subheader>Internal Server Error</Header.Subheader>
            </Header.Content>
          </Header>
          <p>Lo sentimos, pero la página que busca se encuentra en mantenimiento actualmente.</p>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    configuration: {
      current: state.configuration.current,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...configurationActions,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceContainer);