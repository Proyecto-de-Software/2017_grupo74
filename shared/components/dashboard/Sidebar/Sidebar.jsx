import React, { Component } from 'react';
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Icon,
  Header
} from 'semantic-ui-react';

class SidebarLeftScaleDown extends Component {
  constructor(props) {
    super(props);

    this.toggleVisibility = this.toggleVisibility.bind(this);

    this.state = {
      visible: false
    };
  }

  toggleVisibility() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const {visible} = this.state;
    return (<div>
      /*<Sidebar.Pushable as={Segment}>*/
        <Sidebar
          as={Menu}
          animation='push'
          width='thin'
          visible={visible}
          icon='labeled'
          vertical
          inverted
        >
          <Menu.Item name='home'>
            <Icon name='home'/>
            Home
          </Menu.Item>
          <Menu.Item name='gamepad'>
            <Icon name='gamepad'/>
            Games
          </Menu.Item>
          <Menu.Item name='camera'>
            <Icon name='camera'/>
            Channels
          </Menu.Item>
        </Sidebar>
        /*<Sidebar.Pusher>*/
          <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
        /*</Sidebar.Pusher>
      </Sidebar.Pushable>*/
    </div>);
  }
}

export default SidebarLeftScaleDown;
