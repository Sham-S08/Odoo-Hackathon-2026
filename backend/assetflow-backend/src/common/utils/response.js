function success(res, { statusCode = 200, message = 'Success', data = undefined } = {}) {
  return res.status(statusCode).json({ message, ...(data !== undefined ? { data } : {}) });
}

module.exports = { success };

