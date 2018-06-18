import moment from 'moment';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Message,
  Icon,
} from 'semantic-ui-react';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: this.props.isValid,
      isFetching: this.props.isFetching,
      originalPatient: this.props.patient,
      fields: this.props.fields,
      error: this.props.error,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const { patient, fields, isValid, isFetching, error } = props;

    this.setState({
      originalPatient: patient,
      fields,
      isValid,
      isFetching,
      error,
    });
  }

  componentDidMount() {
    const { patient, fields, isValid, isFetching, error, } = this.props;

    this.setState({
      originalPatient: patient,
      fields,
      isValid,
      isFetching,
      error,
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

    const { originalPatient, fields } = this.state;

    this.props.updatePatient(
      originalPatient.id,
      fields.firstName,
      fields.lastName,
      fields.address,
      fields.phone,
      fields.birthday,
      fields.sex,
      fields.medicalInsurance,
      fields.documentType,
      fields.documentNumber,
      null
    );
  }

  render() {
    const { fields, isValid, isFetching, error } = this.state;

    const sexOptions = [
      { key: "m", value: "Masculino", icon: 'man',text: "Masculino" },
      { key: "f", value: "Femenino", icon: 'woman', text: "Femenino" },
      { key: "o", value: "Otro", icon: 'other gender', text: "Otro" },
    ];

    const documentTypesOptions = Array.from(this.props.documentTypes || []).map((elem) => {
      return { key: elem.name, value: elem._id, icon: 'genderless', text: elem.name };
    });

    const medicalInsurancesOptions = Array.from(this.props.medicalInsurances || []).map((elem) => {
      return { key: elem.name, value: elem._id, text: elem.name };
    });

    console.log("fields: ", fields);
    return(
      <Form onSubmit={this.handleSubmit}>
        {error && <Message negative>
          <Message.Header>Existen errores</Message.Header>
          <p>{error}</p>
        </Message>}
        <Form.Group>
          <Form.Input
            label={fields.firstNameErrorMsg || 'Nombre'}
            name='firstName'
            placeholder='Nombre'
            required
            width={8}
            onChange={this.handleChange}
            value={fields.firstName || ''}
            error={fields.firstNameHasError} />
          <Form.Input
            label={fields.lastNameErrorMsg || 'Apellido'}
            name='lastName'
            placeholder='Apellido'
            required
            width={8}
            onChange={this.handleChange}
            value={fields.lastName || ''}
            error={fields.lastNameHasError} />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label={fields.addressErrorMsg || 'Dirección'}
            name='address'
            placeholder='Direccion'
            width={4}
            onChange={this.handleChange}
            value={fields.address || ''}
            error={fields.addressHasError} />
          <Form.Input
            label={fields.phoneErrorMsg || 'Teléfono'}
            name='phone'
            placeholder='Teléfono'
            width={4}
            onChange={this.handleChange}
            value={fields.phone || ''}
            error={fields.phoneHasError} />
          <Form.Input
            type='date'
            label={fields.birthdayErrorMsg || 'Fecha de nacimiento'}
            name='birthday'
            placeholder='Fecha de nacimiento'
            required
            width={4}
            onChange={this.handleChange}
            value={moment(fields.birthday).format('YYYY-MM-DD')}
            error={fields.birthdayHasError} />
          <Form.Select
            label={fields.sexErrorMsg || 'Sexo'}
            name='sex'
            placeholder='Sexo'
            width={4}
            onChange={this.handleChange}
            value={fields.sex}
            options={sexOptions}
            error={fields.sexHasError} />
        </Form.Group>
        <Form.Group>
          <Form.Select
            label={fields.documentTypeErrorMsg || 'Tipo de documento'}
            name='documentType'
            placeholder='Tipo de documento'
            required
            width={5}
            onChange={this.handleChange}
            value={fields.documentType ? fields.documentType._id : fields.documentType}
            options={documentTypesOptions}
            error={fields.documentTypeHasError} />
          <Form.Input
            label={fields.documentNumberErrorMsg || 'Número de documento'}
            name='documentNumber'
            placeholder='Número de documento'
            required
            width={6}
            onChange={this.handleChange}
            value={fields.documentNumber || ''}
            error={fields.documentNumberHasError} />
          <Form.Select
            label={fields.medicalInsuranceErrorMsg || 'Obra social'}
            name='medicalInsurance'
            placeholder='Obra social'
            required
            width={5}
            onChange={this.handleChange}
            value={fields.medicalInsurance ? fields.medicalInsurance._id : fields.medicalInsurance}
            options={medicalInsurancesOptions}
            error={fields.medicalInsuranceHasError} />
        </Form.Group>
        <Button disabled={!isValid || isFetching} color='teal' fluid size='large'>
          <Icon name='save' size='small' />
          Guardar
        </Button>
      </Form>
    );
  }
}

export default Edit;