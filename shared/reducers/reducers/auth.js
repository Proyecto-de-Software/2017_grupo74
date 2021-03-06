import InitialState from 'reducers/states/auth-state';
import fieldValidation from 'reducers/lib/field-validation/auth';
import formValidation from 'reducers/lib/form-validation/auth';
import {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGIN,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  ON_AUTH_FORM_FIELD_CHANGE,

  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,

  SET_STATE,
} from 'reducers/constants';

/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function (state = InitialState, action) {
  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case SESSION_TOKEN_REQUEST:
    case AUTHENTICATE_REQUEST:
    case LOGOUT_REQUEST:
    case LOGIN_REQUEST:
    {
      const nextState = {
        ...state,
        isFetching: true,
        error: null,
      };

      return nextState;
    }

    /**
       * ### Logout state
       * The logged in user logs out
       * Clear the form's error and all the fields
       */
    case LOGOUT_SUCCESS:
    {
      return InitialState;
    }

    /**
       * ### Loggin in state
       * The user isn't logged in, and needs to
       * login, register or reset password
       *
       * Set the form state and clear any errors
       */
    case LOGIN:
    {
      return formValidation({
        ...state,
        error: null,
      });
    }

    /**
       * ### Auth form field change
       *
       * Set the form's field with the value
       * Clear the forms error
       * Pass the fieldValidation results to the
       * the formValidation
       */
    case ON_AUTH_FORM_FIELD_CHANGE:
    {
      const {
        field,
        value,
      } = action.payload;

      const nextState = {
        ...state,
        error: null,
        fields: {
          ...state.fields,
          [field]: value,
        },
      };

      return formValidation(fieldValidation(nextState, action), action);
    }
    /**
       * ### Requests end, good or bad
       * Set the fetching flag so the forms will be enabled
       */
    case SESSION_TOKEN_SUCCESS:
    case SESSION_TOKEN_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case LOGIN_SUCCESS:
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        authenticated: true,
      };

      /**
       *
       * The fetching is done, but save the error
       * for display to the user
       */
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
    case AUTHENTICATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        authenticated: false,
        error: action.payload,
      };

      /**
       * ### Hot Loading support
       *
       * Set all the field values from the payload
       */
    case SET_STATE:
    {
      const {
        auth,
      } = JSON.parse(action.payload);
      const {
        fields,
      } = auth;

      return {
        ...state,
        disabled: auth.disabled,
        error: auth.error,
        authenticated: auth.authenticated,
        isValid: auth.isValid,
        isFetching: auth.isFetching,
        fields: {
          ...fields,
          email: auth.email,
          emailHasError: auth.emailHasError,
          password: auth.password,
          passwordHasError: auth.passwordHasError,
        },
      };
    }

    case DELETE_TOKEN_REQUEST:
    case DELETE_TOKEN_SUCCESS:
      return state;

    default:
      return state;
  }
}
