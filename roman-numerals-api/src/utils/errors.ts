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
  }
};


export default errors;
