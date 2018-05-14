import axios from 'axios';
import _ from 'lodash';

export default class HealthControlsRequest {
  init(token = null) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;

    return this;
  }

  getHealthControls(pageNumber = 1) {
    return axios.get('/api/health-controls',
    {
      params: {
        pageNumber: pageNumber
      },
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

  getHealthControl(healthControl) {
    return axios.get(`/api/health-controls/${healthControl}`, {
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
export const healthControlsRequest = new HealthControlsRequest();