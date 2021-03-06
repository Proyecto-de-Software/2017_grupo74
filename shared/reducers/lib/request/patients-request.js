import axios from 'axios';
import _ from 'lodash';

export default class PatientsRequest {
  init(token = null) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;

    return this;
  }

  getPatients(
    pageNumber = 0,
    firstName = '',
    lastName = '',
    documentType = null,
    documentNumber = null,
    demographicData = null,
  ) {
    return axios.get(
      '/api/patients',
      {
        params: {
          pageNumber,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          documentType,
          documentNumber,
          demographicData,
        },
        headers: {
          Authorization: this._sessionToken,
        },
      },
    ).then((response) => {
      if (response.status === 200 || response.status === 201) {
        const { data } = response;

        return {
          patients: data.patients,
          count: data.count,
          totalCount: data.total_count,
        };
      }
      throw (response.data.error);
    }).catch((error) => {
      throw error;
    });
  }

  getPatient(patient) {
    return axios.get(`/api/patients/${patient}`, {
      headers: {
        Authorization: this._sessionToken,
      },
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw (response.data.error);
    }).catch((error) => {
      throw error;
    });
  }

  addPatient({
    firstName,
    lastName,
    address,
    phone,
    birthday,
    sex,
    medicalInsurance,
    documentType,
    documentNumber,
  }) {
    return axios.post('/api/patients', {
      patient: {
        firstName,
        lastName,
        address,
        phone,
        birthday,
        sex,
        medicalInsurance,
        documentType,
        documentNumber,
      },
    }, {
      headers: {
        Authorization: this._sessionToken,
      },
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw (response.data.error);
    }).catch((error) => {
      throw error;
    });
  }

  updatePatient(originalPatient, {
    firstName,
    lastName,
    address,
    phone,
    birthday,
    sex,
    medicalInsurance,
    documentType,
    documentNumber,
    refrigerator,
    electricity,
    pet,
    apartmentType,
    heatingType,
    waterType,
  }) {
    const demographicData = (apartmentType !== null && heatingType !== null && waterType !== null) ?
      {
        refrigerator,
        electricity,
        pet,
        apartmentType,
        heatingType,
        waterType,
      } : undefined;
    return axios.post(`/api/patients/${originalPatient}`, {
      patient: {
        firstName,
        lastName,
        address,
        phone,
        birthday,
        sex,
        medicalInsurance,
        documentType,
        documentNumber,
      },
      demographicData,
    }, {
      headers: {
        Authorization: this._sessionToken,
      },
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw (response.data.error);
    }).catch((error) => {
      throw error;
    });
  }

  deletePatient(originalPatient) {
    return axios.delete(`/api/patients/${originalPatient}`, {
      headers: {
        Authorization: this._sessionToken,
      },
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw (response.data.error);
    }).catch((error) => {
      throw error;
    });
  }
}

// The singleton variable
export const patientsRequest = new PatientsRequest();
