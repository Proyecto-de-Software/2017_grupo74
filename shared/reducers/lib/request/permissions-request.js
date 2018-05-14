import axios from 'axios';
import _ from 'lodash';

export default class PermissionsRequest {
  init(token = null) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;

    return this;
  }

  getPermissions(pageNumber = 1) {
    return axios.get('/api/permissions', {
      params: {
        pageNumber,
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
}

// The singleton variable
export const permissionsRequest = new PermissionsRequest();