import axios from 'axios';
import _ from 'lodash';

export default class AnalyticsRequest {
  init(token = null) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;

    return this;
  }

  getDemographicDataAnalytics() {
    return axios.get('/api/patients/analytics', {
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

  getHealthControlsAnalytics(patient, type) {
    return axios.get(`/api/patients/${patient}/health-controls/${type}`, {
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
export const analyticsRequest = new AnalyticsRequest();
