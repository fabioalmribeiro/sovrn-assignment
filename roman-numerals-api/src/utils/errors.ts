const errors = {
  // 500
  internal_error: {
    status: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Oops! Something went wrong.'
  },
  // 404
  not_found: {
    status: 404,
    code: 'NOT_FOUND',
    message: 'Not Found'
  },
  // 400
  not_valid: {
    status: 400,
    code: 'NOT_VALID',
    message: 'Not Valid'
  }
};


export default errors;
