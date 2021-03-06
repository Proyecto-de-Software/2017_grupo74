import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Confirm,
  Divider,
  Form,
  Header,
  Message,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';

const totalPages = (props) => !props.count ? 0 : props.totalCount / props.count;

const options = (props) => {
  return Array.from(props.documentTypes || []).map((elem) => {
    return { key: elem.name, value: elem._id, icon: 'genderless', text: elem.name };
  });
};

class PatientsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      patientSelected: null,
      visible: false,
    };
  }

  handleDismiss() {
    this.setState({
      visible: false,
    });
  }

  open(e, data) {
    const { patient } = data;
    this.setState({
      open: true,
      visible: true,
      patientSelected: patient,
    });
  }

  close() {
    this.setState({
      open: false,
      patientSelected: null,
    });
  }

  onConfirm() {
    const { patientSelected } = this.state;
    if (patientSelected == null) {
      return;
    }
    this.props.deleteAction(patientSelected._id);
    this.setState({
        open: false,
    });
  }

  render() {
    const props = this.props;
    return(
      <Segment>
        <Header as='h2' content='Listado de Pacientes' />
        <Button
          color='teal'
          icon='add user'
          title='Registrar paciente'
          onClick={props.onAddButtonClick}
          content='Registrar paciente' />
        <Divider horizontal section>Búsqueda</Divider>
        <Form>
          <Form.Group>
            <Form.Input
              name='firstName'
              onChange={props.onSearchFieldChange}
              placeholder='Nombre del paciente' />
            <Form.Input
              name='lastName'
              onChange={props.onSearchFieldChange}
              placeholder='Apellido del paciente' />
            <Form.Select
              placeholder='Tipo de documento'
              name='documentType'
              onChange={props.onSearchFieldChange}
              options={options(props)} />
            <Form.Input
              name='documentNumber'
              onChange={props.onSearchFieldChange}
              placeholder='Número de documento' />
          </Form.Group>
        </Form>
        {this.props.success && this.state.visible && <Message positive icon='check' onDismiss={this.handleDismiss.bind(this)} content='La operación fué realizada con éxito.' />}
        {this.props.error && this.state.visible && <Message negative icon='warning sign' onDismiss={this.handleDismiss.bind(this)} content={this.props.error} />}
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nombre del paciente</Table.HeaderCell>
              <Table.HeaderCell>Domicilio</Table.HeaderCell>
              <Table.HeaderCell>Teléfono</Table.HeaderCell>
              <Table.HeaderCell>Género</Table.HeaderCell>
              <Table.HeaderCell>Tipo de documento</Table.HeaderCell>
              <Table.HeaderCell>Número de documento</Table.HeaderCell>
              <Table.HeaderCell>Opciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {props.patients && props.patients.map((patient, id) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Header as='h5' content={<Link to={`${props.url}/${patient._id}`}>{patient.firstName} {patient.lastName}</Link>} />
                </Table.Cell>
                <Table.Cell>{patient.address}</Table.Cell>
                <Table.Cell>{patient.phone}</Table.Cell>
                <Table.Cell>{patient.sex}</Table.Cell>
                <Table.Cell>{patient.documentType ? patient.documentType.name : '' }</Table.Cell>
                <Table.Cell>{patient.documentNumber}</Table.Cell>
                <Table.Cell>
                  <Button
                    circular
                    size='tiny'
                    color='teal'
                    disabled={!this.props.granted.show}
                    as={Link}
                    to={`${props.url}/${patient._id}`}
                    icon='heartbeat'
                    title={'Ver paciente'} />
                  <Button
                    circular
                    size='tiny'
                    color='red'
                    icon='remove user'
                    disabled={!this.props.granted.destroy}
                    title={`Eliminar ${patient.firstName} ${patient.lastName}`}
                    onClick={this.open.bind(this)}
                    patient={patient} />
                </Table.Cell>
              </Table.Row>
            ))}
            <Confirm
              open={this.state.open}
              onCancel={this.close.bind(this)}
              onConfirm={this.onConfirm.bind(this)}
              content={this.state.patientSelected
                && `¿Está seguro que quiere borrar al paciente ${this.state.patientSelected.firstName} ${this.state.patientSelected.lastName}?`
              } />
          </Table.Body>
        </Table>
        {this.props.patients && this.props.patients.length === 0 && <Message info>
          <Message.Header>No hay pacientes que mostrar</Message.Header>
        </Message>}
        <Divider hidden />
        <Container textAlign='center'>
          <Pagination
            defaultActivePage={props.pageNumber + 1}
            ellipsisItem={undefined}
            totalPages={totalPages(props)}
            onPageChange={(e, { activePage }) => {
              props.onSearchFieldChange(e, { name: 'pageNumber', value: activePage - 1 });
            }} />
        </Container>
      </Segment>
    );
  }
};

export default PatientsList;
