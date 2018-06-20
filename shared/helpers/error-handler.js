import _ from 'lodash';

export function errorHandler(error) {
  if (error && _.isString(error)) {
    return error;
  }

  if (error.response && _.isString(error.response)) {
    return error.response;
  }

  if (error.response.data && _.isString(error.response.data)) {
    return error.response.data;
  }

  if (error.response.data.error && _.isString(error.response.data.error)) {
    return error.response.data.error;
  }

  return 'No se puede mostrar información sobre el error actual';
}
