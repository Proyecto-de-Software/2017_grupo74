'use strict'

import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
} from '../constants';

 import BackendFactory from '../lib/backend-factory';
 import {
   authToken
 } from '../lib/auth-token';

/**
 * ## retreiving profile actions
 */
export function getProfileRequest() {
  return {
    type: GET_PROFILE_REQUEST
  };
}

export function getProfileSuccess(user) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: user
  };
}

export function getProfileFailure(user) {
  return {
    type: GET_PROFILE_FAILURE,
    payload: user
  };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getProfile(sessionToken) {
  return dispatch => {
    dispatch(getProfileRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then((token) => {
        return BackendFactory(token).getProfile();
      })
      .then((json) => {
        dispatch(getProfileSuccess(json.user));
      })
      .catch((error) => {
        dispatch(getProfileFailure(error));
      });
  };
}