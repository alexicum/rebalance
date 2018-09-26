/**
 * reThrowError - throw new error with message appended to err.message
 * @param {Error} err - prev error
 * @param {string} message - message to append
 */
const reThrowError = (err, message) => {
  throw new Error(`${message}. ${err.message}`);
};

/**
 * setFormError - add/update error to state for specified form field. Example:
 * {
 *   uiState: {
 *     errors: [
 *       { field: name, message: 'Error' }
 *     ]
 *   }
 * }
 * @param {Object} = {
 *   field {String}: field name,
 *   message {String}: error message
 * }
 * @returns {function} function, that should be used as param to this.setState();
 */
const setFormError = ({ field = null, message }) => (state /* , props */) => {
  const error = { field, message };
  const { errors, ...restUiState } = state.uiState;
  const newErrors = errors.filter(err => err.field !== field);
  newErrors.push(error);
  return {
    uiState: {
      ...restUiState,
      errors: newErrors,
    },
  };
};

/**
 * getFormError - get error message from state for specified form field
 * @param {Object} = {
 *   state {Object}: component state,
 *   field {String}: field name
 * }
 * @returns {string} found error message or null
 */
const getFormError = ({ state, field = null }) => {
  const { errors } = state.uiState;
  if (!errors || errors.length === 0) {
    return null;
  }
  const error = errors.find(err => err.field === field);
  return error && error.message;
};

/**
 * clearFormError - clear error message from state for specified form field
 * @param {Object} options = {
 *   field {String}: field name
 * }
 * @returns {function} function, that should be used as param to this.setState();
 */
const clearFormError = options => (state /* , props */) => {
  const field = (options && options.field) || null;
  const { errors, ...restUiState } = state.uiState;
  const newErrors = field === null ? [] : errors.filter(err => err.field !== field);
  return {
    uiState: {
      ...restUiState,
      errors: newErrors,
    },
  };
};

export default {
  reThrowError, setFormError, getFormError, clearFormError,
};
