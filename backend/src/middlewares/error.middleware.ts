import type { ErrorRequestHandler } from 'express';
import ApiError from '../utils/ApiError.js';

const errorMiddleware: ErrorRequestHandler = (error, req, res, _next) => {
  // Default values for unexpected errors
  let status = 500;
  let message = 'Internal server error';
  let errors: unknown[] = [];

  // Handle our known application errors
  if (error instanceof ApiError) {
    status = error.status;
    message = error.message;
    errors = error.errors;
  }

  // Log the error
  req.log.error(
    {
      err: error,
      status,
      method: req.method,
      url: req.originalUrl,
    },
    message,
  );

  // Don't send stack traces to the client
  res.status(status).json({
    success: false,
    status,
    message,
    errors,
  });
};

export default errorMiddleware;
