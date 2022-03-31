import type { Response } from 'express';

import errors from '../utils/errors';
import ErrorObject from '../interfaces/ErrorObject';

function createError(err: ErrorObject = errors.internal_error): ErrorObject {
  return {
    ...err,
    message: err.message
  };
}

function createResponse(res: Response, status = 500, code = 'INTERNAL_SERVER_ERROR', message = null, data = null): void {
  res
    .set({
      'Content-Language': res.req.headers['accept-language'],
      'Content-Type': 'application/json; charset=utf-8'
    })
    .status(status)
    .json({
      code,
      message,
      results: data
    });
}

export { createResponse, createError };
