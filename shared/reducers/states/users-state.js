export default {
  originalUser: {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    active: null,
    createdAt: null,
    updatedAt: null,
    roles: null,
  },
  users: null,
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  fields: {
    username: '',
    usernameHasError: false,
    usernameErrorMsg: '',
    email: '',
    emailHasError: false,
    emailErrorMsg: '',
    firstName: '',
    firstNameHasError: false,
    firstNameErrorMsg: '',
    lastName: '',
    lastNameHasError: false,
    lastNameErrorMsg: '',
  },
};
