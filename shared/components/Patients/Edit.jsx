import moment from 'moment';
import React, {Component} from 'react';
import {
  Button,
  Divider,
  Form,
  Label,
  Message,
  Icon,
} from 'semantic-ui-react';

import { DateInput } from 'semantic-ui-calendar-react';

import DemographicDataEdit from 'components/DemographicData/Edit';

class Edit extends Component {
  handleChange(e, {name, value}) {
    var newValue = [ 'refrigerator', 'electricity', 'pet' ].find(e => e == name) ?
      !this.props.fields[name] :
      value;

    if (name === 'birthday') {
      newValue = moment(newValue, 'DD-MM-YYYY').format('YYYY-MM-DD');
    }

    this.props.onFormFieldChange(name, newValue);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { patient, fields } = this.props;

    this.props.updatePatient(
      patient.id,
      fields.firstName,
      fields.lastName,
      fields.address,
      fields.phone,
      fields.birthday,
      fields.sex,
      fields.medicalInsurance,
      fields.documentType,
      fields.documentNumber,
      fields.refrigerator,
      fields.electricity,
      fields.pet,
      fields.apartmentType,
      fields.heatingType,
      fields.waterType,
      null
    );
  }

  render() {
    const { fields, isValid, isFetching, error, success } = this.props;

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

    const apartmentTypesOptions = Array.from(this.props.apartmentTypes || []).map((elem) => {
      return { key: elem.name, value: elem._id, text: elem.name }
    });

    const heatingTypesOptions = Array.from(this.props.heatingTypes || []).map((elem) => {
      return { key: elem.name, value: elem._id, text: elem.name }
    });

    const waterTypesOptions = Array.from(this.props.waterTypes || []).map((elem) => {
      return { key: elem.name, value: elem._id, text: elem.name }
    });

    return(
      <Form onSubmit={this.handleSubmit.bind(this)}>
        {success && <Message positive icon='check' content='La operación fué realizada con éxito.' />}
        {error && <Message negative icon='warning sign' content={error} />}
        <Form.Group>
          <Form.Input
            label={fields.firstNameErrorMsg || 'Nombre'}
            name='firstName'
            placeholder='Nombre'
            required
            width={8}
            onChange={this.handleChange.bind(this)}
            value={fields.firstName || ''}
            error={fields.firstNameHasError} />
          <Form.Input
            label={fields.lastNameErrorMsg || 'Apellido'}
            name='lastName'
            placeholder='Apellido'
            required
            width={8}
            onChange={this.handleChange.bind(this)}
            value={fields.lastName || ''}
            error={fields.lastNameHasError} />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label={fields.addressErrorMsg || 'Dirección'}
            name='address'
            placeholder='Direccion'
            width={4}
            onChange={this.handleChange.bind(this)}
            value={fields.address || ''}
            error={fields.addressHasError} />
          <Form.Input
            label={fields.phoneErrorMsg || 'Teléfono'}
            name='phone'
            placeholder='Teléfono'
            width={4}
            onChange={this.handleChange.bind(this)}
            value={fields.phone || ''}
            error={fields.phoneHasError} />
          <Form.Field>
            <Label
              basic
              style={{ border: 'none' }}
              size='medium'
              content={fields.birthdayErrorMsg || 'Fecha de nacimiento'}
            />
            <DateInput
              name='birthday'
              placeholder='Fecha de nacimiento'
              value={moment(fields.birthday).format('DD-MM-YYYY')}
              closable
              required
              popupPosition='bottom right'
              onChange={this.handleChange.bind(this)}
            error={fields.birthdayHasError} />
          </Form.Field>
          <Form.Select
            label={fields.sexErrorMsg || 'Sexo'}
            name='sex'
            placeholder='Sexo'
            width={4}
            onChange={this.handleChange.bind(this)}
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
            onChange={this.handleChange.bind(this)}
            value={fields.documentType ? fields.documentType._id : fields.documentType}
            options={documentTypesOptions}
            error={fields.documentTypeHasError} />
          <Form.Input
            label={fields.documentNumberErrorMsg || 'Número de documento'}
            name='documentNumber'
            placeholder='Número de documento'
            required
            width={6}
            onChange={this.handleChange.bind(this)}
            value={fields.documentNumber || ''}
            error={fields.documentNumberHasError} />
          <Form.Select
            label={fields.medicalInsuranceErrorMsg || 'Obra social'}
            name='medicalInsurance'
            placeholder='Obra social'
            required
            width={5}
            onChange={this.handleChange.bind(this)}
            value={fields.medicalInsurance ? fields.medicalInsurance._id : fields.medicalInsurance}
            options={medicalInsurancesOptions}
            error={fields.medicalInsuranceHasError} />
        </Form.Group>
        <Divider horizontal section>Datos demográficos</Divider>
        <DemographicDataEdit
          fields={fields}
          apartmentTypesOptions={apartmentTypesOptions}
          heatingTypesOptions={heatingTypesOptions}
          waterTypesOptions={waterTypesOptions}
          handleChange={this.handleChange.bind(this).bind(this)} />
        <Divider hidden />
        <Button disabled={!isValid || isFetching} color='teal' fluid size='large'>
          <Icon name='save' size='small' />
          Guardar
        </Button>
      </Form>
    );
  }
}

export default Edit;
