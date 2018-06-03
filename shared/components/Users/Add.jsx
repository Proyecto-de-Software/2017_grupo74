import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Icon,
  Segment,
} from 'semantic-ui-react';

class Add extends Component {
  constructor(props) {
    super(props);

    this.props.onMount();

    this.state = {
      isValid: this.props.isValid,
      isFetching: this.props.isFetching,
      fields: this.props.fields,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const { fields, isValid, isFetching } = props;

    this.setState({
      fields,
      isValid,
      isFetching,
    });
  }

  componentDidMount() {
    const { fields, isValid, isFetching } = this.props;

    this.setState({
      fields,
      isValid,
      isFetching,
    });
  }

  handleChange(e, {name, value}) {
    this.props.onFormFieldChange(name, value);

    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { fields } = this.state;

    this.props.addUser(
      fields.username,
      fields.email,
      fields.password,
      fields.firstName,
      fields.lastName,
      null
    );
  }

  render() {
    const { fields, isValid, isFetching } = this.state;

    return(
      <Segment padded>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              label={fields.firstNameErrorMsg || 'Nombre'}
              name='firstName'
              placeholder='Nombre'
              width={8}
              onChange={this.handleChange}
              value={fields.firstName}
              error={fields.firstNameHasError} />
            <Form.Input
              label={fields.usernameErrorMsg || 'Apellido'}
              name='lastName'
              placeholder='Apellido'
              width={8}
              onChange={this.handleChange}
              value={fields.lastName}
              error={fields.lastNameHasError} />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label={fields.usernameErrorMsg || 'Nombre de Usuario'}
              name='username'
              required
              placeholder='Nombre de Usuario'
              width={5}
              onChange={this.handleChange}
              value={fields.username}
              error={fields.usernameHasError} />
            <Form.Input
              label={fields.emailErrorMsg || 'Email'}
              name='email'
              required
              placeholder='Email'
              width={6}
              onChange={this.handleChange}
              value={fields.email}
              error={fields.emailHasError} />
            <Form.Input
              label={fields.passwordErrorMsg || 'Contraseña'}
              name='password'
              placeholder='Contraseña'
              width={5}
              onChange={this.handleChange}
              value={fields.password}
              error={fields.passwordHasError} />
          </Form.Group>
          <Button disabled={!isValid || isFetching} color='teal' fluid size='large'>
            <Icon name='save' size='small' />
            Guardar
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default Add;
