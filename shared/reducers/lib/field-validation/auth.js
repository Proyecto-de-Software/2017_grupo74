/**
 * # field-validation.js
 *
 * Define the validation rules for various fields such as email, username,
 * and passwords.  If the rules are not passed, the appropriate
 * message is displayed to the user
 *
 */

/**
 * ## Imports
 *
 * validate and underscore
 *
 */
import validate from 'validate.js';
import _ from 'underscore';

/**
 * ## Email validation setup
 * Used for validation of emails
 */
const emailConstraints = {
  from: {
    email: true,
  },
};

/**
 * ## password validation rule
 * read the message... ;)
 */
const passwordPattern = '(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])';
const passwordConstraints = {
  password: {
    presence: true,
    length: {
      minimum: 2,
      message: 'must be at least 2 characters',
    },
  },
};

/**
 * ## Field Validation
 * @param {Object} state Redux state
 * @param {Object} action type & payload
 */
export default function (state, action) {
  const { field, value } = action.payload;

  switch (field) {
    /**
       * ### email validation
       * set the form field error
       */
    case ('email'):
    {
      const validEmail = _.isUndefined(validate({
        from: value,
      }, emailConstraints));

      if (validEmail) {
        return {
          ...state,
          fields: {
            ...state.fields,
            emailHasError: false,
            emailErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          emailHasError: true,
          emailErrorMsg: 'El email debe ser de la forma `example@domain`',
        },
      };
    }

    /**
       * ### password validation
       * set the form field error
       */
    case ('password'):
    {
      const validPassword = _.isUndefined(validate({
        password: value,
      }, passwordConstraints));

      if (validPassword) {
        return {
          ...state,
          fields: {
            ...state.fields,
            passwordHasError: false,
            passwordErrorMsg: '',
          },
        };
      }

      return {
        ...state,
        fields: {
          ...state.fields,
          passwordHasError: true,
          passwordErrorMsg: 'La contraseña tiene carácteres inválidos',
        },
      };
    }

    /**
       * ### showPassword
       * toggle the display of the password
       */
    case ('showPassword'):
      return {
        ...state,
        showPassword: value,
      };

    default:
      return state;
  }
}
