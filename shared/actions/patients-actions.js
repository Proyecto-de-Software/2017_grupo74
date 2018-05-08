import {
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAILURE,
} from '../constants';

import { patientsRequest } from '../lib/request/patients-request';
import { authToken } from '../lib/store/auth-token';

/**
 * ## retreiving profile actions
 */
export function getPatientsRequest() {
  return {
    type: GET_PATIENTS_REQUEST,
  };
}

export function getPatientsSuccess(patients) {
  return {
    type: GET_PATIENTS_SUCCESS,
    payload: patients,
  };
}

export function getPatientsFailure(error) {
  return {
    type: GET_PATIENTS_FAILURE,
    payload: error,
  };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getPatients(sessionToken) {
  return (dispatch) => {
    dispatch(getPatientsRequest());
    // store or get a sessionToken
    return authToken.getSessionToken(sessionToken)
      .then(token => patientsRequest.init(token).getPatients())
      .then((json) => {
        dispatch(getPatientsSuccess(json.patients));
      })
      .catch((error) => {
        dispatch(getPatientsFailure(error));
      });
  };
}
