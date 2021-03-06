import axios from 'axios';
import _ from 'lodash';

export default class ProfileRequest {
  init(token = null) {
    this._sessionToken = _.isNull(token)
      ? null
      : token;

    return this;
  }

  getProfile() {
    return axios.get('/api/auth/me', {
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

  updateProfile({
    username, email, firstName, lastName, password,
  }) {
    const user = {
      username,
      email,
      firstName,
      lastName,
    };

    if (password) { user.password = password; }

    return axios.post('/api/auth/me', {
      user,
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
}

// The singleton variable
export const profileRequest = new ProfileRequest();
