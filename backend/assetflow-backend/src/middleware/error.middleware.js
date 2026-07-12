function errorMiddleware(err, req, res, next) {
  // eslint-disable-line no-unused-vars
  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  // In production you might hide internal errors.
  return res.status(status).json({
    message,
    ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {})
  });
}

module.exports = { errorMiddleware };

