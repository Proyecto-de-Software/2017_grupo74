export default {
  originalPatient: {
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    birthday: null,
    sex: null,
    demographicData: null,
    medicalInsurance: null,
    documentType: null,
    documentNumber: 0,
    deleted: null,
  },
  totalCount: 0,
  count: 0,
  patients: null,
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  fields: {
    firstName: '',
    firstNameHasError: false,
    firstNameErrorMsg: '',
    lastName: '',
    lastNameHasError: false,
    lastNameErrorMsg: '',
    address: '',
    addressHasError: false,
    addressErrorMsg: '',
    phone: '',
    phoneNHasError: false,
    phoneErrorMsg: '',
    birthday: '',
    birthdayHasError: false,
    birthdayErrorMsg: '',
    sex: '',
    sexHasError: false,
    sexErrorMsg: '',
    demographicData: null,
    demographicDataHasError: false,
    demographicDataErrorMsg: '',
    medicalInsurance: null,
    medicalInsuranceHasError: false,
    medicalInsuranceErrorMsg: '',
    documentType: null,
    documentTypeHasError: false,
    documentTypeErrorMsg: '',
    documentNumber: 0,
    documentNumberHasError: false,
    documentNumberErrorMsg: '',
    deleted: null,
    deletedHasError: false,
    deletedErrorMsg: '',
  },
};
